package com.kokochi.kokocastserver.domain.user;

import com.kokochi.kokocastserver.domain.channel.Channel;
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
    private LocalDateTime modDate;
    private LocalDateTime regDate;
}
