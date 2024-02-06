package com.kokochi.kokocastserver.controller.gameCategory;

import com.kokochi.kokocastserver.domain.gameCategory.GameCategory;
import com.kokochi.kokocastserver.domain.gameCategory.GameCategoryElasticRepository;
import com.kokochi.kokocastserver.domain.gameCategory.GameCategoryRepository;
import com.kokochi.kokocastserver.service.gameCategory.GameCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/test/game-category")
@RequiredArgsConstructor
public class GameCategoryTestController {

    private final GameCategoryService gameCategoryService;
    private final GameCategoryRepository gameCategoryRepository;
    private final GameCategoryElasticRepository gameCategoryElasticRepository;


    @GetMapping(value = "/insert")
    public Boolean insertGameCategory(
            @RequestParam("categoryName") String categoryName
    ) {
        gameCategoryService.insertGameCategory(categoryName);
        return true;
    }

    @GetMapping(value = "/list")
    public List<GameCategory> listGameCategory() {
        return gameCategoryRepository.findAll();
    }

//    @GetMapping(value = "/search")
//    public List<GameCategory> searchGameCategory(
//            @RequestParam("search") String search,
//            @RequestParam("offset") Integer offset,
//            @RequestParam("size") Integer size
//    ) {
//        return gameCategoryService.searchByCategoryName(search, PageRequest.of(offset, size));
//    }


    @GetMapping(value = "/delete")
    public Boolean searchGameCategory() {
        gameCategoryRepository.deleteAll();
        return true;
    }
}
