package com.kokochi.kokocastserver.domain.user;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "kkc_user")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    private String userId;
    private String nickname;
    private String password;
    private String profileImgUrl;
    private List<String> followUserIds;
    private Channel channel;
    private LocalDateTime modDate;
    private LocalDateTime regDate;
}
