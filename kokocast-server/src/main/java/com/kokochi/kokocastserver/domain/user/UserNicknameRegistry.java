package com.kokochi.kokocastserver.domain.user;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

// 닉네임 고유성을 관리하기 위한 테이블입니다.
@Document(collection = "kkc_user_nickname_registry")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserNicknameRegistry {

    @Id
    private String nickname;
    private String userId;
    private LocalDateTime regDate;
}