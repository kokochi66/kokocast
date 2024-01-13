package com.kokochi.kokocastserver.service.gameCategory;

import com.kokochi.kokocastserver.domain.gameCategory.GameCategory;
import com.kokochi.kokocastserver.domain.gameCategory.GameCategoryRepository;
import com.kokochi.kokocastserver.exception.ErrorCode;
import com.kokochi.kokocastserver.exception.KokoException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.core.query.TextQuery;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class GameCategoryService {

    private final GameCategoryRepository gameCategoryRepository;
    private final MongoTemplate mongoTemplate;

    public Optional<GameCategory> getGameCategory(String categoryName) {
        return gameCategoryRepository.findById(categoryName);
    }

    public GameCategory insertGameCategory(String categoryName) {
        // 영문자만 확인하는 정규 표현식
        String regex = "^[A-Za-z]+$";
        if (!categoryName.matches(regex)) {
            throw new KokoException(ErrorCode.ONLY_ENGLISH_CATEGORY_NAME)
                    .addParams("categoryName", categoryName);
        }

        if (getGameCategory(categoryName).isPresent()) {
            throw new KokoException(ErrorCode.ALREADY_EXISTS_CATEGORY)
                    .addParams("categoryName", categoryName);
        }
        return gameCategoryRepository.save(GameCategory.builder()
                        .categoryId(UUID.randomUUID().toString())
                        .categoryName(categoryName)
                        .regDate(LocalDateTime.now())
                .build());
    }

    public List<GameCategory> searchByCategoryName(String searchTerm, Pageable pageable) {
//        TextCriteria criteria = TextCriteria.forDefaultLanguage().matching(searchTerm);
        Query query = new Query();
        query.addCriteria(Criteria.where("categoryName").regex("^" + searchTerm));
        return mongoTemplate.find(query, GameCategory.class);
    }
}
