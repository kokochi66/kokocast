package com.kokochi.kokocastserver.domain.gameCategory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameCategoryElasticRepository extends ElasticsearchRepository<GameCategoryElastic, String> {

    // 단순 키워드 검색을 위한 메소드
    @Query("{\"match\": {\"categoryName\": \"?0\"}}")
    List<GameCategoryElastic> findByCategoryName(String categoryName);


    // ElasticSearch에서 사용하는 쿼리 (~~가 포함되는 모든 단어를 검색하기) 검색 최대 10개까지만
    @Query("{\"query_string\": {\"query\": \"*?0*\", \"fields\": [\"categoryName\"]}}")
    Page<GameCategoryElastic> findByCategoryNameContaining(String categoryName, Pageable pageable);


    // deleteByCategoryName 메소드 추가
    void deleteByCategoryName(String categoryName);
}
