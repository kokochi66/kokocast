package com.kokochi.kokocastserver.controller.gameCategory;

import com.kokochi.kokocastserver.domain.gameCategory.GameCategory;
import com.kokochi.kokocastserver.domain.gameCategory.GameCategoryElastic;
import com.kokochi.kokocastserver.domain.gameCategory.GameCategoryElasticRepository;
import com.kokochi.kokocastserver.domain.gameCategory.GameCategoryRepository;
import com.kokochi.kokocastserver.service.gameCategory.GameCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

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

    // elasticSearch 서버를 새로 만들었을 때, MongoDB에 있는 데이터와 elasticSearch 안에 있는 데이터를 싱크시켜주기 위한 test api
    @GetMapping(value = "/sync")
    public List<GameCategory> syncGameCategory() {
        List<GameCategory> savedGameCategories = new ArrayList<>();
        List<GameCategory> gameCategories = gameCategoryRepository.findAll();
        try {
            for (GameCategory gameCategory : gameCategories) {
                List<GameCategoryElastic> byCategoryName = gameCategoryElasticRepository.findByCategoryName(gameCategory.getCategoryName());
                if (CollectionUtils.isEmpty(byCategoryName)) {
                    gameCategoryElasticRepository.save(GameCategoryElastic.builder()
                            .id(UUID.randomUUID().toString())
                            .categoryName(gameCategory.getCategoryName())
                            .build());
                    savedGameCategories.add(gameCategory);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return savedGameCategories;
    }
}
