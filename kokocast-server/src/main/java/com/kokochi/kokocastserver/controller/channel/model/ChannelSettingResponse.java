package com.kokochi.kokocastserver.controller.channel.model;

import com.kokochi.kokocastserver.domain.gameCategory.GameCategory;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChannelSettingResponse {

    private String nickname;                            // 닉네임
    private LocalDateTime lastChangedNicknameDate;      // 마지막으로 닉네임을 변경한 일자
    private String channelDescription;                  // 채널 소개

    private String streamKey;                           // 방송 암호 키
    private String streamServerUrl;                     // 방송 송출 서버 url
    private String streamingTitle;                      // 방송 제목
    private GameCategory streamingGameCategory;         // 방송중인 게임
    private List<String> streamingCategory;             // 방송 카테고리

}
