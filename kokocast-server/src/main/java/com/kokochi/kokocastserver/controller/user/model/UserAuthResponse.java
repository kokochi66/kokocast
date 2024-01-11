package com.kokochi.kokocastserver.controller.user.model;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserAuthResponse {
    private String nickname;
    private LocalDateTime regDate;
    private String jwtAuthLoginToken;

}
