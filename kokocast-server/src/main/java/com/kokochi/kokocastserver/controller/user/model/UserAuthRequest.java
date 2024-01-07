package com.kokochi.kokocastserver.controller.user.model;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserAuthRequest {

    private String nickname;
    private String password;
}
