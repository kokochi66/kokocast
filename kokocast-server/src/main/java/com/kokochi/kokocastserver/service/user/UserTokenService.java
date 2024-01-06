package com.kokochi.kokocastserver.service.user;

import com.kokochi.kokocastserver.domain.user.User;
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

    @Value("${jwt.kokochi.secret}")
    private String secretKey;

    public String generateToken(User user) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime expire = LocalDateTime.now().plusHours(6);
        Date nowDate = Date.from(now.atZone(ZoneId.systemDefault()).toInstant());
        Date expireDate = Date.from(expire.atZone(ZoneId.systemDefault()).toInstant());
        Key key = new SecretKeySpec(secretKey.getBytes(), 0, secretKey.length(), "HmacSHA512");

        return Jwts.builder()
                .setSubject(user.getUserId()) // 사용자 ID나 다른 식별자를 Subject로 설정
                .setIssuedAt(nowDate)
                .setExpiration(expireDate)
                .signWith(key)
                .compact();
    }
}
