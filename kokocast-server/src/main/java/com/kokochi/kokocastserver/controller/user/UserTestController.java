package com.kokochi.kokocastserver.controller.user;

import com.kokochi.kokocastserver.domain.user.*;
import com.kokochi.kokocastserver.service.user.UserNicknameElasticService;
import com.kokochi.kokocastserver.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/test/user")
@RequiredArgsConstructor
public class UserTestController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final UserNicknameElasticService userNicknameElasticService;
    private final UserNicknameElasticRepository userNicknameElasticRepository;
    private final UserNicknameRegistryRepository userNicknameRegistryRepository;

    @GetMapping("/insert")
    public List<User> saveUser(
            @RequestParam("nickname") String nickname,
            @RequestParam("password") String password
    ) {
        userService.register(nickname, password);
        return userList();
    }

    @GetMapping("/delete")
    public Boolean delete() {
        userRepository.deleteAll();
        userNicknameRegistryRepository.deleteAll();
        userNicknameElasticRepository.deleteAll();
        return true;
    }

    @GetMapping("/list")
    public List<User> userList() {
        return userService.getUserList();
    }

    @GetMapping("/search")
    public List<User> searchUserList(
            @RequestParam(value = "query") String query
    ) {
        List<UserNicknameElastic> userNicknameElastics = userNicknameElasticService.searchUserNicknames(query);
        return userNicknameElastics.stream()
                .map(e -> userService.getUserById(e.getUserId()))
                .collect(Collectors.toList());
    }
}
