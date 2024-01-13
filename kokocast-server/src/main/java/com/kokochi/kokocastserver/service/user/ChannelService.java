package com.kokochi.kokocastserver.service.user;

import com.kokochi.kokocastserver.domain.user.Channel;
import com.kokochi.kokocastserver.domain.user.User;
import com.kokochi.kokocastserver.domain.user.UserRepository;
import com.kokochi.kokocastserver.exception.ErrorCode;
import com.kokochi.kokocastserver.exception.KokoException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChannelService {

    private final UserService userService;

    public User createChannel(User user) {
        if (user.getChannel() != null) {
            throw new KokoException(ErrorCode.ALREADY_EXISTS_CHANNEL)
                    .addParams("userId", user.getUserId());
        }

        return channelSetting(user.getUserId(), Channel.builder()
                        .channelStreamKey("")
                        .channelTitle("")
                        .channelDescription("")
                .build());
    }

    public User channelSetting(String userId, Channel channel) {
        User user = userService.getUserById(userId);
        user.setChannel(channel);
        userService.upsertUser(user);
        return user;
    }

}