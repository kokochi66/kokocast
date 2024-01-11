package com.kokochi.kokocastserver.service.user;

import com.kokochi.kokocastserver.domain.user.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@Service
public class UserTokenService {

    @Value("${jwt.kokochi.user-cookie-jwt-key:defaultSecretKey}")
    private String loginUserCookieJwtKey;

    @Value("${jwt.kokochi.user-password-change-key:defaultSecretKey}")
    private String changePasswordJwtKey;

    /**
     * JWT 인증토큰 생성
     * @param user 사용자 정보
     * @return 인증 토큰 반환
     */
    public String generateToken(User user) {
        LocalDateTime now = LocalDateTime.now();
        return Jwts.builder()
                .setSubject(user.getUserId()) // 사용자 ID나 다른 식별자를 Subject로 설정
                .setIssuedAt(Date.from(now.atZone(ZoneId.systemDefault()).toInstant()))
                .setExpiration(Date.from(now.plusHours(48).atZone(ZoneId.systemDefault()).toInstant()))
                .signWith(new SecretKeySpec(loginUserCookieJwtKey.getBytes(), 0, loginUserCookieJwtKey.length(), "HmacSHA512"))
                .compact();
    }

    /**
     * JWT 인증토큰 복호화
     * @param token 복호화 할 토큰
     * @return 복호화한 토큰 정보 반환
     */
    public Claims decodeToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(loginUserCookieJwtKey.getBytes()))
                .build()
                .parseClaimsJws(token)
                .getBody();
    }


    /**
     * JWT 비밀번호 변경 토큰 생성
     * @param user 사용자 정보
     * @return 인증 토큰 반환
     */
    public String generateChangePasswordToken(User user) {
        LocalDateTime now = LocalDateTime.now();
        return Jwts.builder()
                .setSubject(user.getUserId()) // 사용자 ID나 다른 식별자를 Subject로 설정
                .setIssuedAt(Date.from(now.atZone(ZoneId.systemDefault()).toInstant()))
                .setExpiration(Date.from(now.plusMinutes(5).atZone(ZoneId.systemDefault()).toInstant()))
                .signWith(new SecretKeySpec(changePasswordJwtKey.getBytes(), 0, changePasswordJwtKey.length(), "HmacSHA512"))
                .compact();
    }

    /**
     * JWT 비밀번호 변경 토큰 복호화
     * @param token 복호화 할 토큰
     * @return 복호화한 토큰 정보 반환
     */
    public Claims decodeChangePasswordToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(changePasswordJwtKey.getBytes()))
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
