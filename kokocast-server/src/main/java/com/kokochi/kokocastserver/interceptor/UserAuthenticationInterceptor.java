package com.kokochi.kokocastserver.interceptor;

import com.kokochi.kokocastserver.domain.user.User;
import com.kokochi.kokocastserver.service.user.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.handler.WebRequestHandlerInterceptorAdapter;

@Component
public class UserAuthenticationInterceptor implements HandlerInterceptor {

    @Autowired
    private UserService userService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // 쿠키에서 사용자 정보 추출
        Cookie[] cookies = request.getCookies();
        String userToken = null;
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("userCookie".equals(cookie.getName())) {
                    userToken = cookie.getValue();
                    break;
                }
            }
        }

        // 사용자 인증
        if (userToken != null) {
            User authenticatedUser = null;
            if (authenticatedUser != null) {
                // 사용자 객체를 요청 속성에 추가
                request.setAttribute("authenticatedUser", authenticatedUser);
            }
        }

        return true; // 계속해서 다음 인터셉터나 컨트롤러로 진행
    }
}
