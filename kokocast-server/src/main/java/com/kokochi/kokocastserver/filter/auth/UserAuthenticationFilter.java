package com.kokochi.kokocastserver.filter.auth;

import com.kokochi.kokocastserver.domain.user.User;
import com.kokochi.kokocastserver.domain.user.UserDetailsKokochi;
import com.kokochi.kokocastserver.service.user.UserService;
import com.kokochi.kokocastserver.service.user.UserTokenService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class UserAuthenticationFilter extends OncePerRequestFilter {

    private final UserService userService; // 사용자 정보를 조회하는 서비스
    private final UserTokenService userTokenService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();

        // "user/**" 또는 "test/**" 경로에 대한 요청인 경우 필터 로직을 건너뜁니다.
        if (path.startsWith("/user/") || path.startsWith("/test/")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = extractToken(request);
        if (token != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // 토큰 검증 및 사용자 정보 조회 로직

            Claims claims = userTokenService.decodeToken(token);
            String userId = claims.getSubject();
            User user = userService.getUserById(userId);

            List<GrantedAuthority> authorityList = new ArrayList<>();
            authorityList.add(new SimpleGrantedAuthority("ROLE_USER"));

            UserDetails userDetails = new UserDetailsKokochi(user.getUserId(), user.getPassword(),
                    authorityList, claims.getExpiration());
            if (userDetails != null) {
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }

            //
            response.setHeader("Authorization", "Bearer " + userTokenService.generateToken(user));
        }

        filterChain.doFilter(request, response);
    }

    private String extractToken(HttpServletRequest request) {
//         요청 헤더에서 토큰 추출 로직
        return request.getHeader("Authorization").replaceAll("Bearer ", "");
    }
}
