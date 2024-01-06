package com.kokochi.kokocastserver.service.user;

import com.kokochi.kokocastserver.domain.user.User;
import com.kokochi.kokocastserver.domain.user.UserNicknameRegistry;
import com.kokochi.kokocastserver.domain.user.UserNicknameRegistryRepository;
import com.kokochi.kokocastserver.domain.user.UserRepository;
import com.kokochi.kokocastserver.exception.ErrorCode;
import com.kokochi.kokocastserver.exception.KokoException;
import com.mongodb.DuplicateKeyException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserNicknameRegistryRepository userNicknameRegistryRepository;
    @Autowired
    private UserTokenService userTokenService;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    /**
     * 회원가입
     * @param nickname 사용자 닉네임
     * @param password 사용자 비밀번호
     * @return 생성된 사용자 객체를 반환합니다.
     */
    @Transactional
    public User register(String nickname, String password) {
        String userId = UUID.randomUUID().toString();
        LocalDateTime now = LocalDateTime.now();
        // 닉네임이 고유한 데이터인지를 먼저 확인해줍니다.

        try {
            userNicknameRegistryRepository.save(UserNicknameRegistry.builder()
                    .nickname(nickname)
                    .userId(userId)
                    .regDate(now)
                    .build());
        } catch (DuplicateKeyException e) {
            throw new KokoException(ErrorCode.ALREADY_EXISTS_NICKNAME)
                    .addParams("nickname", nickname);
        }
        User user = User.builder()
                .userId(userId)
                .nickname(nickname)
                .password(passwordEncoder.encode(password))
                .followUserIds(Collections.emptyList())
                .regDate(now)
                .build();
        upsertUser(user);
        return user;
    }

    /**
     * 로그인
     * @param userId 사용자 id
     * @param password 사용자 비밀번호
     * @return 로그인 사용자 정보와 로그인 토큰을 생성하여 반환합니다.
     */
    public Pair<User, String> login(String userId, String password) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(password, user.getPassword())) {
                String token = userTokenService.generateToken(user); // 인증 토큰 생성
                return Pair.of(user, token);
            }
        }
        throw new KokoException(ErrorCode.NOT_EXISTS_USER)
                .addParams("userId", userId);
    }

    public void deleteUser(String userId) {
        userRepository.deleteById(userId);
    }


    public User auth(String userToken) {
        return null;
    }

    public void upsertUser(User user) {
        user.setModDate(LocalDateTime.now());
        userRepository.save(user);
    }

    public User getYourEntity(String id) {
        return userRepository.findById(id).orElse(null);
    }

    public List<User> getUserList() {
        return userRepository.findAll();
    }

    public void delete(String id) {
        userRepository.deleteById(id);
    }
}
