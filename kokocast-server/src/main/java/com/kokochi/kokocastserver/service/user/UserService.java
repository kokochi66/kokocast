package com.kokochi.kokocastserver.service.user;

import com.kokochi.kokocastserver.domain.user.*;
import com.kokochi.kokocastserver.exception.ErrorCode;
import com.kokochi.kokocastserver.exception.KokoException;
import com.mongodb.MongoWriteException;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.util.Pair;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final MongoTemplate mongoTemplate;
    private final UserRepository userRepository;
    private final UserNicknameRegistryRepository userNicknameRegistryRepository;
    private final UserNicknameElasticService userNicknameElasticService;
    private final UserTokenService userTokenService;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    /**
     * 회원가입
     * @param nickname 사용자 닉네임
     * @param password 사용자 비밀번호
     * @return 생성된 사용자 정보와 로그인 토큰을 생성하여 반환합니다.
     */
    @Transactional
    public Pair<User, String> register(String nickname, String password) {
        String userId = UUID.randomUUID().toString();
        LocalDateTime now = LocalDateTime.now();
        // 닉네임이 고유한 데이터인지를 먼저 확인해줍니다.

        try {
            mongoTemplate.insert(UserNicknameRegistry.builder()
                    .nickname(nickname)
                    .userId(userId)
                    .modDate(now)
                    .regDate(now)
                    .build(), "kkc_user_nickname_registry");
        } catch (DuplicateKeyException e) {
            throw new KokoException(ErrorCode.ALREADY_EXISTS_NICKNAME)
                    .addParams("nickname", nickname);
        }
        User user = User.builder()
                .userId(userId)
                .nickname(nickname)
                .password(passwordEncode(password))
                .followUserIds(Collections.emptyList())
                .regDate(now)
                .build();
        upsertUser(user);

        String elasticId = UUID.randomUUID().toString();
        userNicknameElasticService.saveUserNickname(UserNicknameElastic.builder()
                        .id(elasticId)
                        .nickname(nickname)
                        .userId(userId)
                .build());
        return Pair.of(user, userTokenService.generateToken(user));
    }

    /**
     * 로그인
     * @param nickname 사용자 닉네임
     * @param password 사용자 비밀번호
     * @return 로그인 사용자 정보와 로그인 토큰을 생성하여 반환합니다.
     */
    public Pair<User, String> login(String nickname, String password) {
        User user = getUserByNickname(nickname);
        if (!passwordMatch(user, password)) {
            throw new KokoException(ErrorCode.NOT_EQUAL_PASSWORD)
                    .addParams("userId", user.getUserId());
        }
        String token = userTokenService.generateToken(user); // 인증 토큰 생성
        return Pair.of(user, token);
    }


    /**
     * 닉네임 변경
     * @param user 사용자
     * @param changeNickname 변경하려는 닉네임
     * @return 변경된 닉네임 유저를 반환합니다.
     */
    @Transactional
    public void changeUserNickname(User user, String changeNickname) {
        LocalDateTime now = LocalDateTime.now();

        try {
            mongoTemplate.insert(UserNicknameRegistry.builder()
                    .nickname(changeNickname)
                    .userId(user.getUserId())
                    .modDate(now)
                    .regDate(now)
                    .build(), "kkc_user_nickname_registry");
        } catch (DuplicateKeyException e) {
            throw new KokoException(ErrorCode.ALREADY_EXISTS_NICKNAME)
                    .addParams("nickname", user.getNickname());
        }

        userNicknameRegistryRepository.deleteById(user.getNickname());
        user.setNickname(changeNickname);
        upsertUser(user);
    }

    /**
     * 닉네임 변경 validation 체크
     * @param user 사용자
     * @return 변경된 닉네임 유저를 반환합니다.
     */
    public void validateChangeNickname(User user) {
        LocalDateTime now = LocalDateTime.now();
        Optional<UserNicknameRegistry> optionalUserNicknameRegistry = userNicknameRegistryRepository.findById(user.getNickname());
        if (optionalUserNicknameRegistry.isEmpty()) {
            throw new KokoException(ErrorCode.NOT_EXISTS_USER)
                    .addParams("nickname", user.getNickname());
        }
        UserNicknameRegistry userNicknameRegistry = optionalUserNicknameRegistry.get();

        // 닉네임 변경한 지 3개월 이상 지났어야 변경이 가능합니다.

        LocalDateTime expiredDate = userNicknameRegistry.getModDate().plusSeconds(20);
        if (now.isBefore(expiredDate)) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            throw new KokoException(ErrorCode.NICKNAME_UPDATE_RESTRICTED)
                    .addParams("expired", expiredDate.format(formatter));
        }
    }


    public String passwordEncode(String password) {
        return passwordEncoder.encode(password);
    }

    public Boolean passwordMatch(User user, String password) {
        return passwordEncoder.matches(password, user.getPassword());
    }

    public void upsertUser(User user) {
        user.setModDate(LocalDateTime.now());
        userRepository.save(user);
    }

    public User getUserById(String userId) {
        return userRepository.findById(userId).orElseThrow(
                () -> new KokoException(ErrorCode.NOT_EXISTS_USER)
                        .addParams("userId", userId));
    }

    public UserNicknameRegistry getUserNicknameRegistry(String nickname) {
        return userNicknameRegistryRepository.findById(nickname)
                .orElseThrow(() -> new KokoException(ErrorCode.NOT_EXISTS_USER)
                        .addParams("nickname", nickname));
    }

    public User getUserByNickname(String nickname) {
        UserNicknameRegistry userNickname = getUserNicknameRegistry(nickname);
        return getUserById(userNickname.getUserId());
    }

    public List<User> getUserList() {
        return userRepository.findAll();
    }
}
