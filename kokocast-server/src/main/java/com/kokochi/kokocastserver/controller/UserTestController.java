package com.kokochi.kokocastserver.controller;

import com.kokochi.kokocastserver.domain.user.User;
import com.kokochi.kokocastserver.domain.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/test/user")
public class UserTestController {

    @Autowired
    private UserService userService;


    @GetMapping("/register")
    public Boolean saveUser(
            @RequestParam("nickname") String nickname
    ) {
        userService.register(nickname);
        return true;
    }

    @GetMapping("/delete")
    public Boolean delete(
            @RequestParam("id") String id
    ) {
        userService.delete(id);
        return true;
    }

    @GetMapping("/list")
    public List<User> userList() {
        return userService.getUserList();
    }
}
