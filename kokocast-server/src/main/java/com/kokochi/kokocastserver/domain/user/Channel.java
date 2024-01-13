package com.kokochi.kokocastserver.domain.user;

import com.kokochi.kokocastserver.domain.gameCategory.GameCategory;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Channel {
    private String channelStreamKey;
    private String channelTitle;
    private String channelDescription;
    private List<GameCategory> channelGameCategory;
    private GameCategory channelPlayGame;
}
