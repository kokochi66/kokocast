package com.kokochi.kokocastserver.advice;

import com.kokochi.kokocastserver.exception.KokoException;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class KokoExceptionHandler {

    @ExceptionHandler(KokoException.class)
    public ResponseEntity<?> handleCustomException(KokoException e) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST) // 상황에 맞는 HTTP 상태 코드 설정
                .body(new ErrorResponse(e.getErrorCode().getCode(), e.getMessage(), e.getErrorCode().getParams()));
    }

    // ErrorResponse는 클라이언트에 전달될 응답 형식을 정의합니다.
    @Getter
    @Setter
    @AllArgsConstructor
    static class ErrorResponse {
        private String errorCode;
        private String message;
        private Map<String, String> params;
    }
}
