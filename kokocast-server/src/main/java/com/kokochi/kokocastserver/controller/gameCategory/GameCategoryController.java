package com.kokochi.kokocastserver.controller.gameCategory;

import com.kokochi.kokocastserver.controller.channel.model.ChannelSettingRequest;
import com.kokochi.kokocastserver.controller.channel.model.ChannelSettingResponse;
import com.kokochi.kokocastserver.controller.gameCategory.model.GameCategoryResponse;
import com.kokochi.kokocastserver.controller.gameCategory.model.GameCategorySearchResponse;
import com.kokochi.kokocastserver.domain.gameCategory.GameCategory;
import com.kokochi.kokocastserver.domain.gameCategory.GameCategoryElasticRepository;
import com.kokochi.kokocastserver.exception.ErrorCode;
import com.kokochi.kokocastserver.exception.KokoException;
import com.kokochi.kokocastserver.service.gameCategory.GameCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/api/game-category")
public class GameCategoryController {

    @Autowired
    private GameCategoryService gameCategoryService;

    @GetMapping("/search")
    public ResponseEntity<GameCategorySearchResponse> searchGameCategory(
            Authentication auth,
            @RequestParam(value = "searchText") String searchText
    ) {
        // 검색 길이 제한
        if (searchText.length() > 100) {
            throw new KokoException(ErrorCode.SEARCH_TEXT_OVER_MAX_LENGTH)
                    .addParams("length", Integer.toString(searchText.length()));
        }

        return ResponseEntity
                .status(200)
                .body(GameCategorySearchResponse.builder()
                        .searchCategoryList(gameCategoryService.searchByCategoryName(searchText).stream()
                                .map(GameCategoryResponse::new).collect(Collectors.toList()))
                        .build());
    }

}
