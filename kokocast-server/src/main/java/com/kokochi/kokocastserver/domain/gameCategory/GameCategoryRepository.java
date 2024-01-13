package com.kokochi.kokocastserver.domain.gameCategory;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface GameCategoryRepository extends MongoRepository<GameCategory, String> {
}
