package com.kokochi.kokocastserver.domain.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void register(String nickname) {
        User user = User.builder()
                .id(UUID.randomUUID().toString())
                .nickname(nickname)
                .regDate(LocalDateTime.now())
                .build();
        saveUser(user);
    }


    public void saveUser(User user) {
        user.setModDate(LocalDateTime.now());
        userRepository.save(user);
    }

    public User getYourEntity(String id) {
        return userRepository.findById(id).orElse(null);
    }

    public void delete(String id) {
        userRepository.deleteById(id);
    }
}
