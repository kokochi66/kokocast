package com.kokochi.kokocastserver.controller.user.model;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserAuthFindPasswordResponse {
    private String nickname;
    private String changePasswordEncoded;
}
