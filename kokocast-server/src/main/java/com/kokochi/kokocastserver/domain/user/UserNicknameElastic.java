package com.kokochi.kokocastserver.domain.user;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.*;

@Document(indexName = "user_nickname_index")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserNicknameElastic {

    @Id
    private String id;
    @Field(type = FieldType.Text, analyzer = "standard")
    private String nickname;

    private String userId;
}
