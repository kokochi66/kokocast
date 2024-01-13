package com.kokochi.kokocastserver.controller.user.model;

import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.validation.annotation.Validated;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserAuthRequest {
    @Size(max = 30)
    private String nickname;
    @Size(max = 50)
    private String password;
}
