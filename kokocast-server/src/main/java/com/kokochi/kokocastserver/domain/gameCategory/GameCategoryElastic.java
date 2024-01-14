package com.kokochi.kokocastserver.domain.gameCategory;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.data.mongodb.core.index.TextIndexed;

@Document(indexName = "game_category_name")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GameCategoryElastic {
    @Id
    private String id;
    @Field(type = FieldType.Text, analyzer = "standard")
    private String categoryName;
}
