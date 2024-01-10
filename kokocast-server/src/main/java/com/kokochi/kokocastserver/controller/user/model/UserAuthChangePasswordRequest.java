package com.kokochi.kokocastserver.controller.user.model;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserAuthChangePasswordRequest {
    private String changePasswordEncoded;
    private String password;
}
