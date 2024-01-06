package com.kokochi.kokocastserver.controller;

import com.kokochi.kokocastserver.domain.user.User;
import com.kokochi.kokocastserver.service.user.UserService;
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
    public List<User> saveUser(
            @RequestParam("nickname") String nickname
    ) {
        userService.register(nickname, "1");
        return userList();
    }

    @GetMapping("/delete")
    public List<User> delete(
            @RequestParam("id") String id
    ) {
        userService.delete(id);
        return userList();
    }

    @GetMapping("/list")
    public List<User> userList() {
        return userService.getUserList();
    }
}
