package com.kokochi.kokocastserver.service.user;

import com.kokochi.kokocastserver.domain.user.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Base64;
import java.util.Date;

@Service
public class UserTokenService {

    @Value("${jwt.kokochi.secret:defaultSecretKey}")
    private String secretKey;

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
                .setExpiration(Date.from(now.plusHours(2).atZone(ZoneId.systemDefault()).toInstant()))
                .signWith(new SecretKeySpec(secretKey.getBytes(), 0, secretKey.length(), "HmacSHA512"))
                .compact();
    }

    /**
     * JWT 인증토큰 복호화
     * @param token 복호화 할 토큰
     * @return 복호화한 토큰 정보 반환
     */
    public Claims decodeToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(secretKey.getBytes()))
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
