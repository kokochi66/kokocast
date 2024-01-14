package com.kokochi.kokocastserver.domain.user;

import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserNicknameElasticRepository extends ElasticsearchRepository<UserNicknameElastic, String> {

    // 단순 키워드 검색을 위한 메소드
    @Query("{\"wildcard\": {\"nickname\": \"?0*\"}}")
    List<UserNicknameElastic> findByPartialNickname(String nickname);


    UserNicknameElastic findByUserId(String userId);

}
