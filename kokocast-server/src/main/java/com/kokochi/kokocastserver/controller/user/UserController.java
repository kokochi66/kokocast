package com.kokochi.kokocastserver.controller.user;

import com.kokochi.kokocastserver.controller.user.model.UserAuthRequest;
import com.kokochi.kokocastserver.controller.user.model.UserAuthResponse;
import com.kokochi.kokocastserver.domain.user.User;
import com.kokochi.kokocastserver.service.user.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@Slf4j
@RestController
@RequestMapping(value = "/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping(value = "/login")
    public ResponseEntity<UserAuthResponse> login(
            @RequestBody UserAuthRequest request
    ) {

        return generateAuthResponse(userService.login(request.getNickname(), request.getPassword()));
    }

    @PostMapping(value = "/register")
    public ResponseEntity<UserAuthResponse> register(
            @RequestBody UserAuthRequest request
    ) {
        return generateAuthResponse(userService.register(request.getNickname(), request.getPassword()));
    }

    private ResponseEntity<UserAuthResponse> generateAuthResponse(
            Pair<User, String> pair
    ) {
        User user = pair.getFirst();
        String token = pair.getSecond();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        return ResponseEntity
                .status(200)
                .headers(headers)
                .body(UserAuthResponse.builder()
                        .userId(user.getUserId())
                        .nickname(user.getNickname())
                        .regDate(user.getRegDate())
                        .build());
    }
}
