package com.kokochi.kokocastserver.controller.main;

import com.kokochi.kokocastserver.domain.user.UserDetailsKokochi;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/main")
public class MainController {

    @GetMapping("")
    public ResponseEntity<String> main(Authentication auth) {
        UserDetailsKokochi userDetails = (UserDetailsKokochi) auth.getPrincipal();
        return ResponseEntity
                .status(200)
                .body(userDetails.getUsername());
    }
}
