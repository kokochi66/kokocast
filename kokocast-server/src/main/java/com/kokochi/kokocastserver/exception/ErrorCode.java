package com.kokochi.kokocastserver.exception;

import java.util.HashMap;
import java.util.Map;

public enum ErrorCode {
    ALREADY_EXISTS_NICKNAME("USER-00001", "이미 사용중인 닉네임 입니다."),
    NOT_EXISTS_USER("USER-00002", "없는 사용자 입니다."),
    NOT_EQUAL_PASSWORD("USER_00003", "잘못된 비밀번호 입니다."),
    ALREADY_USED_PASSWORD("USER_00004", "기존 비밀번호와 동일한 비밀번호 입니다."),
    ;
    // ... 기타 에러코드

    private final String code;
    private final String message;
    private final Map<String, String> params;

    ErrorCode(String code, String message) {
        this.code = code;
        this.message = message;
        this.params = new HashMap<>();
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    public Map<String, String> getParams() {
        return params;
    }
}
