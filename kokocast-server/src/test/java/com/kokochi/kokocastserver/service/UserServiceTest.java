package com.kokochi.kokocastserver.service;

import com.kokochi.kokocastserver.domain.user.User;
import com.kokochi.kokocastserver.domain.user.UserNicknameRegistry;
import com.kokochi.kokocastserver.domain.user.UserNicknameRegistryRepository;
import com.kokochi.kokocastserver.domain.user.UserRepository;
import com.kokochi.kokocastserver.service.user.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.util.Pair;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserNicknameRegistryRepository userNicknameRegistryRepository;

    @Mock
    private BCryptPasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    // 회원가입 테스트
    @Test
    void register() {
        String nickname = "kokochi";
        String password = "1234";
        User user = new User();
        user.setUserId("testUserId");
        user.setNickname(nickname);

        when(userNicknameRegistryRepository.save(any())).thenReturn(new UserNicknameRegistry());
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(user);

        User registeredUser = userService.register(nickname, password);

        assertEquals(nickname, registeredUser.getNickname());
        verify(userRepository, times(1)).save(any(User.class));
    }

    // 로그인 테스트
    @Test
    void login() {
        String userId = "testUserId";
        String password = "1234";
        User user = new User();
        user.setUserId(userId);
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(anyString(), anyString())).thenReturn(true);

        Pair<User, String> result = userService.login(userId, password);

        assertNotNull(result);
        assertEquals(userId, result.getFirst().getUserId());
        // 추가적인 토큰 검증 로직이 필요하다면 여기에 추가
    }
}