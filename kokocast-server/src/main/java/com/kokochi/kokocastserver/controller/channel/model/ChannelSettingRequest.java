package com.kokochi.kokocastserver.controller.channel.model;

import com.kokochi.kokocastserver.domain.gameCategory.GameCategory;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChannelSettingRequest {
    @Size(max = 30)
    private String nickname;
    @Size(max = 2000)
    private String channelDescription;                  // 채널 소개
    @Size(max = 100)
    private String streamingTitle;                      // 방송 제목
    @Size(max = 100)
    private GameCategory streamingGameCategory;         // 방송중인 게임
    @Size(max = 10)
    private List<@Size(max = 50) String> streamingCategory;             // 방송 카테고리

}
