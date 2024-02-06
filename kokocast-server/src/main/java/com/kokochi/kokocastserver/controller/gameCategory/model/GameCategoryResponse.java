package com.kokochi.kokocastserver.controller.gameCategory.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.kokochi.kokocastserver.domain.gameCategory.GameCategory;
import com.kokochi.kokocastserver.domain.gameCategory.GameCategoryElastic;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GameCategoryResponse {

    private String categoryId;
    private String categoryName;

    public GameCategoryResponse(GameCategory gameCategory) {
        this.categoryId = gameCategory.getCategoryId();
        this.categoryName = gameCategory.getCategoryName();
    }

    public GameCategoryResponse(GameCategoryElastic gameCategory) {
        this.categoryId = gameCategory.getId();
        this.categoryName = gameCategory.getCategoryName();
    }
}
