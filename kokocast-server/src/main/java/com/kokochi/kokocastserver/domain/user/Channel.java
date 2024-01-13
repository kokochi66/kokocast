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
    private String channelStreamKey;                    // 스트림 키
    private String streamingTitle;                      // 방송 제목
    private List<String> streamingCategory;             // 방송 카테고리

    private GameCategory playingGameCategory;           // 플레이 중인 게임
    private String channelDescription;                  // 채널 소개
}
