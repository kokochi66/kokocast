package com.kokochi.kokocastserver.service.user;

import com.kokochi.kokocastserver.domain.user.Channel;
import com.kokochi.kokocastserver.domain.user.User;
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

}