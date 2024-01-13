package com.kokochi.kokocastserver.controller.user;

import com.kokochi.kokocastserver.controller.user.model.UserAuthChangePasswordRequest;
import com.kokochi.kokocastserver.controller.user.model.UserAuthFindPasswordResponse;
import com.kokochi.kokocastserver.controller.user.model.UserAuthRequest;
import com.kokochi.kokocastserver.controller.user.model.UserAuthResponse;
import com.kokochi.kokocastserver.domain.user.User;
import com.kokochi.kokocastserver.exception.ErrorCode;
import com.kokochi.kokocastserver.exception.KokoException;
import com.kokochi.kokocastserver.service.user.UserService;
import com.kokochi.kokocastserver.service.user.UserTokenService;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
@RequestMapping(value = "/user")
@RequiredArgsConstructor
public class UserAuthController {

    private final UserService userService;
    private final UserTokenService userTokenService;

    @PostMapping(value = "/login")
    public ResponseEntity<UserAuthResponse> login(
            @RequestBody UserAuthRequest request
    ) {
        log.info("/user/login");
        return generateAuthResponse(userService.login(request.getNickname(), request.getPassword()));
    }

    @PostMapping(value = "/register")
    public ResponseEntity<UserAuthResponse> register(
            @RequestBody UserAuthRequest request
    ) {
        log.info("/user/register");
        return generateAuthResponse(userService.register(request.getNickname(), request.getPassword()));
    }

    @PostMapping(value = "/find-password")
    public ResponseEntity<UserAuthFindPasswordResponse> findPassword(
            @RequestBody UserAuthRequest request
    ) {
        log.info("/user/find-password");
        // request의 nickname이 존재하는지 확인
        User user = userService.getUserByNickname(request.getNickname());
        String token = userTokenService.generateChangePasswordToken(user);
        return ResponseEntity
                .status(200)
                .body(UserAuthFindPasswordResponse.builder()
                        .nickname(user.getNickname())
                        .changePasswordEncoded(token)
                        .build());
    }

    @PostMapping(value = "/change-password")
    public ResponseEntity<Boolean> changePassword(
            @RequestBody UserAuthChangePasswordRequest request
    ) {
        // request의 nickname이 존재하는지만 확인해줌.
        log.info("/user/change-password");
        Claims claims = userTokenService.decodeChangePasswordToken(request.getChangePasswordEncoded());
        User user = userService.getUserById(claims.getSubject());

        if (userService.passwordMatch(user, request.getPassword())) {
            // 변경하려는 비밀번호랑 기존 비밀번호가 겹치면 오류
            throw new KokoException(ErrorCode.ALREADY_USED_PASSWORD);
        }

        user.setPassword(userService.passwordEncode(request.getPassword()));
        userService.upsertUser(user);
        return ResponseEntity
                .status(200)
                .body(true);
    }

    private ResponseEntity<UserAuthResponse> generateAuthResponse(
            Pair<User, String> pair
    ) {
        User user = pair.getFirst();
        String token = pair.getSecond();
        return ResponseEntity
                .status(200)
                .body(UserAuthResponse.builder()
                        .nickname(user.getNickname())
                        .regDate(user.getRegDate())
                        .jwtAuthLoginToken(token)
                        .build());
    }
}
