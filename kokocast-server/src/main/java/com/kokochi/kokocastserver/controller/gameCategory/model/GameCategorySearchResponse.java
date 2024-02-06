package com.kokochi.kokocastserver.controller.gameCategory.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GameCategorySearchResponse {

    private List<GameCategoryResponse> searchCategoryList;
}
