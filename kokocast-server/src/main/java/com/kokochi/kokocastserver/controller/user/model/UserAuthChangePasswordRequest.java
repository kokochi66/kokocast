package com.kokochi.kokocastserver.controller.user.model;

import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserAuthChangePasswordRequest {
    @Size(max = 500)
    private String changePasswordEncoded;
    @Size(max = 50, message = "길이 에러")
    private String password;
}
