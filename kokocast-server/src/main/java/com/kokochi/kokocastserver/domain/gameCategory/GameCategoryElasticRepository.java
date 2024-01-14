package com.kokochi.kokocastserver.domain.gameCategory;

import com.kokochi.kokocastserver.domain.user.UserNicknameElastic;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameCategoryElasticRepository extends ElasticsearchRepository<GameCategoryElastic, String> {

    // 단순 키워드 검색을 위한 메소드
    @Query("{\"wildcard\": {\"categoryName\": \"?0*\"}}")
    List<GameCategoryElastic> findByCategoryName(String categoryName);

}
