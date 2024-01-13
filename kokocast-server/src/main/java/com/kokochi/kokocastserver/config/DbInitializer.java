package com.kokochi.kokocastserver.config;

import com.kokochi.kokocastserver.domain.gameCategory.GameCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.index.TextIndexDefinition;
import org.springframework.stereotype.Component;

@Component
public class DbInitializer implements CommandLineRunner {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public void run(String... args) throws Exception {
        // 텍스트 인덱스 생성
        if (!mongoTemplate.collectionExists(GameCategory.class)) {
            mongoTemplate.createCollection(GameCategory.class);
        }
        mongoTemplate.indexOps(GameCategory.class).ensureIndex(new TextIndexDefinition.TextIndexDefinitionBuilder()
                .onField("categoryName")
                .build());
    }

}
