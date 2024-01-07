package com.kokochi.kokocastserver.service;

import com.kokochi.kokocastserver.domain.user.User;
import com.kokochi.kokocastserver.domain.user.UserNicknameRegistryRepository;
import com.kokochi.kokocastserver.domain.user.UserRepository;
import com.kokochi.kokocastserver.service.user.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.util.Pair;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserServiceTest {


    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserNicknameRegistryRepository userNicknameRegistryRepository;


    // 회원가입 테스트
    @Test
    void register() {
        String nickname = "kokochi";
        String password = "1234";
        User registeredUser = userService.register(nickname, password).getFirst();

        User findUser = userRepository.findById(registeredUser.getUserId()).orElse(null);

        assertEquals(registeredUser.getUserId(), findUser.getUserId());
        userRepository.deleteById(registeredUser.getUserId());
    }

    // 로그인 테스트
    @Test
    void login() {
        String nickname = "kokochi";
        String password = "1234";
        User registeredUser = userService.register(nickname, password).getFirst();

        Pair<User, String> login = userService.login(nickname, password);

        assertEquals(login.getFirst().getNickname(), nickname);
        userRepository.deleteById(registeredUser.getUserId());
    }

//    @Test
//    void delete() {
//        userRepository.deleteAll();
//        userNicknameRegistryRepository.deleteAll();
//    }
}