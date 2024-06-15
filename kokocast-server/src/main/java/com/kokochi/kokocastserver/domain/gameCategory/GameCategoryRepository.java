package com.kokochi.kokocastserver.domain.gameCategory;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface GameCategoryRepository extends MongoRepository<GameCategory, String> {

    // categoryName으로 검색하기
    Optional<GameCategory> findByCategoryName(String categoryName);

    // 특정 단어 제거하기
    void deleteByCategoryName(String categoryName);
}
