package com.kokochi.kokocastserver.domain.channel;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "kkc_channel")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Channel {
    @Id
    private String userId;
    private String channelStreamKey;
    private String channelTitle;
    private String channelDescription;
    private List<String> channelCategory;
    private String channelPlayGame;
}
