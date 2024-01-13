package com.kokochi.kokocastserver.controller.channel;

import com.kokochi.kokocastserver.controller.channel.model.ChannelSettingRequest;
import com.kokochi.kokocastserver.controller.channel.model.ChannelSettingResponse;
import com.kokochi.kokocastserver.controller.user.model.UserAuthResponse;
import com.kokochi.kokocastserver.domain.user.*;
import com.kokochi.kokocastserver.service.user.ChannelService;
import com.kokochi.kokocastserver.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.util.Pair;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/channel")
@RequiredArgsConstructor
public class ChannelController {

    private final ChannelService channelService;
    private final UserService userService;

    @Value("${kokocast.properties.real-time-server-url")
    private String rtmpServerUrl;

    @GetMapping(value = "/setting")
    public ResponseEntity<ChannelSettingResponse> getChannelSetting(
            Authentication auth
    ) {
        UserDetailsKokochi userDetails = (UserDetailsKokochi) auth.getPrincipal();
        UserNicknameRegistry userNicknameRegistry = userService.getUserNicknameRegistry(userDetails.getUsername());
        User user = userService.getUserById(userNicknameRegistry.getUserId());

        if (user.getChannel() == null) {
            channelService.saveChannelSetting(user.getUserId(), Channel.builder()
                    .channelStreamKey("")
                    .streamingTitle("")
                    .channelDescription("")
                    .build());
        }
        return ResponseEntity
                .status(200)
                .body(generateResponse(user, userNicknameRegistry));
    }


    @PostMapping(value = "/setting")
    public ResponseEntity<ChannelSettingResponse> setChannelSetting(
            Authentication auth,
            @RequestBody ChannelSettingRequest request
            ) {
        UserDetailsKokochi userDetails = (UserDetailsKokochi) auth.getPrincipal();
        UserNicknameRegistry userNicknameRegistry = userService.getUserNicknameRegistry(userDetails.getUsername());
        User user = userService.getUserById(userNicknameRegistry.getUserId());
        return ResponseEntity
                .status(200)
                .body(generateResponse(user, userNicknameRegistry));
    }

    private ChannelSettingResponse generateResponse(
            User user,
            UserNicknameRegistry userNicknameRegistry
    ) {
        return ChannelSettingResponse.builder()
                .nickname(user.getNickname())
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
