package com.kokochi.kokocastserver.controller.channel;

import com.kokochi.kokocastserver.controller.channel.model.ChannelSettingRequest;
import com.kokochi.kokocastserver.controller.channel.model.ChannelSettingResponse;
import com.kokochi.kokocastserver.controller.user.model.UserAuthResponse;
import com.kokochi.kokocastserver.domain.user.*;
import com.kokochi.kokocastserver.exception.ErrorCode;
import com.kokochi.kokocastserver.exception.KokoException;
import com.kokochi.kokocastserver.service.file.FileService;
import com.kokochi.kokocastserver.service.user.ChannelService;
import com.kokochi.kokocastserver.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/channel")
@RequiredArgsConstructor
public class ChannelController {

    private final UserService userService;
    private final FileService fileService;

    @Value("${kokocast.properties.real-time-server-url")
    private String rtmpServerUrl;

    @GetMapping(value = "/setting")
    public ResponseEntity<ChannelSettingResponse> getChannelSetting(
            Authentication auth
    ) {
        UserDetailsKokochi userDetails = (UserDetailsKokochi) auth.getPrincipal();
        User user = userService.getUserById(userDetails.getUsername());
        UserNicknameRegistry userNicknameRegistry = userService.getUserNicknameRegistry(user.getNickname());

        if (user.getChannel() == null) {
            user.setChannel(Channel.builder()
                    .channelStreamKey(UUID.randomUUID().toString())
                    .streamingTitle("")
                    .channelDescription("")
                    .build());
            userService.upsertUser(user);
        }
        return ResponseEntity
                .status(200)
                .body(generateResponse(user, userNicknameRegistry));
    }


    // 닉네임 변경
    @PostMapping(value = "/nickname")
    public ResponseEntity<ChannelSettingResponse> setNickname(
            Authentication auth,
            @RequestBody ChannelSettingRequest request
    ) {
        UserDetailsKokochi userDetails = (UserDetailsKokochi) auth.getPrincipal();
        User user = userService.getUserById(userDetails.getUsername());
        userService.validateChangeNickname(user);
        userService.changeUserNickname(user, request.getNickname());

        return ResponseEntity
                .status(200)
                .body(ChannelSettingResponse.builder()
                        .nickname(user.getNickname())
                        .build());
    }

    // 채널 설명 변경
    @PostMapping(value = "/channel-description")
    public ResponseEntity<ChannelSettingResponse> setChannelDescription(
            Authentication auth,
            @RequestBody ChannelSettingRequest request
    ) {
        UserDetailsKokochi userDetails = (UserDetailsKokochi) auth.getPrincipal();
        User user = userService.getUserById(userDetails.getUsername());
        user.getChannel().setChannelDescription(request.getChannelDescription());
        userService.upsertUser(user);

        return ResponseEntity
                .status(200)
                .body(ChannelSettingResponse.builder()
                        .channelDescription(user.getChannel().getChannelDescription())
                        .build());
    }

    // 채널 제목 변경
    @PostMapping(value = "/streaming-title")
    public ResponseEntity<ChannelSettingResponse> setStreamingTitle(
            Authentication auth,
            @RequestBody ChannelSettingRequest request
    ) {
        UserDetailsKokochi userDetails = (UserDetailsKokochi) auth.getPrincipal();
        User user = userService.getUserById(userDetails.getUsername());
        user.getChannel().setStreamingTitle(request.getStreamingTitle());
        userService.upsertUser(user);

        return ResponseEntity
                .status(200)
                .body(ChannelSettingResponse.builder()
                        .channelDescription(user.getChannel().getStreamingTitle())
                        .build());
    }

    // 플레이 중 인 게임 변경
    @PostMapping(value = "/playing-game")
    public ResponseEntity<ChannelSettingResponse> setPlayingGame(
            Authentication auth,
            @RequestBody ChannelSettingRequest request
    ) {
        UserDetailsKokochi userDetails = (UserDetailsKokochi) auth.getPrincipal();
        User user = userService.getUserById(userDetails.getUsername());
        user.getChannel().setPlayingGameCategory(request.getStreamingGameCategory());
        userService.upsertUser(user);

        return ResponseEntity
                .status(200)
                .body(ChannelSettingResponse.builder()
                        .streamingGameCategory(user.getChannel().getPlayingGameCategory())
                        .build());
    }

    // 방송 카테고리 추가
    @PutMapping(value = "/streaming-category")
    public ResponseEntity<ChannelSettingResponse> addStreamingCategory(
            Authentication auth,
            @RequestBody ChannelSettingRequest request
    ) {
        UserDetailsKokochi userDetails = (UserDetailsKokochi) auth.getPrincipal();
        User user = userService.getUserById(userDetails.getUsername());
        List<String> streamingCategory = user.getChannel().getStreamingCategory();
        streamingCategory.add(request.getStreamingCategory());
        userService.upsertUser(user);

        return ResponseEntity
                .status(200)
                .body(ChannelSettingResponse.builder()
                        .streamingCategory(user.getChannel().getStreamingCategory())
                        .build());
    }

    // 방송 카테고리 삭제
    @DeleteMapping(value = "/streaming-category")
    public ResponseEntity<ChannelSettingResponse> deleteStreamingCategory(
            Authentication auth,
            @RequestBody ChannelSettingRequest request
    ) {
        UserDetailsKokochi userDetails = (UserDetailsKokochi) auth.getPrincipal();
        User user = userService.getUserById(userDetails.getUsername());
        List<String> streamingCategory = user.getChannel().getStreamingCategory();
        streamingCategory.removeIf(s -> s.equals(request.getStreamingCategory()));
        userService.upsertUser(user);

        return ResponseEntity
                .status(200)
                .body(ChannelSettingResponse.builder()
                        .streamingCategory(user.getChannel().getStreamingCategory())
                        .build());
    }

    // 스트림 키 초기화
    @PostMapping(value = "/streaming-key")
    public ResponseEntity<ChannelSettingResponse> initStreamingKey(
            Authentication auth,
            @RequestBody ChannelSettingRequest request
    ) {
        UserDetailsKokochi userDetails = (UserDetailsKokochi) auth.getPrincipal();
        User user = userService.getUserById(userDetails.getUsername());
        user.getChannel().setChannelStreamKey(UUID.randomUUID().toString());
        userService.upsertUser(user);

        return ResponseEntity
                .status(200)
                .body(ChannelSettingResponse.builder()
                        .streamingCategory(user.getChannel().getStreamingCategory())
                        .build());
    }

    // 프로필 이미지 업로드
    @PostMapping(value = "/profile-image")
    public ResponseEntity<ChannelSettingResponse> uploadProfileImage(
            Authentication auth,
            @RequestParam("imageFile")MultipartFile imageFile
            ) {
        // 파일 용량 검증 (10MB 이하)
        if (imageFile.getSize() > 10_000_000) {
            throw new KokoException(ErrorCode.OVER_MAX_FILE_SIZE)
                    .addParams("fileSize", Long.toString(imageFile.getSize()));
        }

        // 파일 형식 검증 (JPEG, PNG)
        String contentType = imageFile.getContentType();
        if (!"image/jpeg".equals(contentType) && !"image/png".equals(contentType) && !"image/gif".equals(contentType)) {
            throw new KokoException(ErrorCode.INVALID_FILE_CONTENT_TYPE)
                    .addParams("contentType", contentType);
        }

        UserDetailsKokochi userDetails = (UserDetailsKokochi) auth.getPrincipal();
        User user = userService.getUserById(userDetails.getUsername());


        // 프로필 이미지는 마지막 변경으로부터 3개월 이후에 변경이 가능
        if (user.getLastProfileImgChangedDate() != null && user.getLastProfileImgChangedDate().plusMonths(3).isAfter(LocalDateTime.now())) {
            throw new KokoException(ErrorCode.PROFILE_IMAGE_UPDATE_RESTRICTED);
        }

        String filename = fileService.store(imageFile);
        user.setProfileImgUrl(filename);
        user.setLastProfileImgChangedDate(LocalDateTime.now());
        userService.upsertUser(user);
        return ResponseEntity
                .status(200)
                .body(ChannelSettingResponse.builder()
                        .profileImageUrl(user.getProfileImgUrl())
                        .build());
    }

    // 프로필 이미지 삭제
    @DeleteMapping(value = "/profile-image", consumes = {"multipart/form-data"})
    public ResponseEntity<ChannelSettingResponse> deleteProfileImage(
            Authentication auth,
            @RequestBody ChannelSettingRequest request
    ) {
        UserDetailsKokochi userDetails = (UserDetailsKokochi) auth.getPrincipal();
        User user = userService.getUserById(userDetails.getUsername());
        user.getChannel().setChannelStreamKey(UUID.randomUUID().toString());
        userService.upsertUser(user);

        return ResponseEntity
                .status(200)
                .body(ChannelSettingResponse.builder()
                        .streamingCategory(user.getChannel().getStreamingCategory())
                        .build());
    }

    private ChannelSettingResponse generateResponse(
            User user,
            UserNicknameRegistry userNicknameRegistry
    ) {
        return ChannelSettingResponse.builder()
                .nickname(user.getNickname())
                .profileImageUrl(user.getProfileImgUrl())
                .lastChangedNicknameDate(userNicknameRegistry.getModDate())
                .channelDescription(user.getChannel().getChannelDescription())
                .streamKey(user.getChannel().getChannelStreamKey())
                .streamServerUrl(rtmpServerUrl)
                .streamingTitle(user.getChannel().getStreamingTitle())
                .streamingCategory(user.getChannel().getStreamingCategory())
                .streamingGameCategory(user.getChannel().getPlayingGameCategory())
                .build();
    }

}
