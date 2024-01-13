package com.kokochi.kokocastserver.domain.gameCategory;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "kkc_game_category")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GameCategory {
    @Id
    private String categoryId;
    @TextIndexed
    private String categoryName;
    private LocalDateTime regDate;
}
