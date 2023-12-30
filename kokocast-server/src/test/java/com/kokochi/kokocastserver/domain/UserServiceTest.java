package com.kokochi.kokocastserver.domain;

import com.kokochi.kokocastserver.domain.user.User;
import com.kokochi.kokocastserver.domain.user.UserRepository;
import com.kokochi.kokocastserver.domain.user.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Test

    public void testSaveUser() {
        User user = new User(); // User 객체 생성 및 필요한 설정
        user.setId("123");
        // ... 다른 필드 설정

        userService.saveUser(user);

        verify(userRepository, times(1)).save(user);
    }

    @Test
    public void testGetUserById() {
        String id = "123";
        User user = new User();
        user.setId(id);
        // ... 다른 필드 설정

        when(userRepository.findById(id)).thenReturn(java.util.Optional.of(user));

        User found = userService.getYourEntity(id);

        verify(userRepository, times(1)).findById(id);
        assertEquals(id, found.getId());
    }
}
