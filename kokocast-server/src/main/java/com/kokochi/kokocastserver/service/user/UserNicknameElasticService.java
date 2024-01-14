package com.kokochi.kokocastserver.service.user;

import com.kokochi.kokocastserver.domain.user.UserNicknameElastic;
import com.kokochi.kokocastserver.domain.user.UserNicknameElasticRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserNicknameElasticService {
    private final UserNicknameElasticRepository userNicknameElasticRepository;

    // 데이터 삽입
    public UserNicknameElastic saveUserNickname(UserNicknameElastic userNickname) {
        return userNicknameElasticRepository.save(userNickname);
    }

    // 데이터 조회 (닉네임으로 조회)
    public Optional<UserNicknameElastic> findByNickname(String nickname) {
        return userNicknameElasticRepository.findById(nickname);
    }

    // 데이터 삭제
    public void deleteUserNickname(String nickname) {
        userNicknameElasticRepository.deleteById(nickname);
    }

    public List<UserNicknameElastic> searchUserNicknames(String nickname) {
        return userNicknameElasticRepository.findByPartialNickname(nickname);
    }
}
