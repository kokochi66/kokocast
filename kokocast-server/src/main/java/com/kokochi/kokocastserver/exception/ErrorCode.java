package com.kokochi.kokocastserver.exception;

import java.util.HashMap;
import java.util.Map;

public enum ErrorCode {
    ALREADY_EXISTS_NICKNAME("USER-00001", "이미 사용중인 닉네임 입니다."),
    NOT_EXISTS_USER("USER-00002", "없는 사용자 입니다."),
    NOT_EQUAL_PASSWORD("USER_00003", "잘못된 비밀번호 입니다."),
    ALREADY_USED_PASSWORD("USER_00004", "기존 비밀번호와 동일한 비밀번호 입니다."),
    NICKNAME_UPDATE_RESTRICTED("USER_00005", "닉네임은 마지막 변경일자로부터 3개월 후에 변경이 가능합니다."),
    PROFILE_IMAGE_UPDATE_RESTRICTED("USER_00006", "프로필 이미지는 마지막 변경일자로부터 3개월 후에 변경이 가능합니다."),


    ALREADY_EXISTS_CHANNEL("CHANNEL_00001", "이미 채널이 존재합니다."),

    ALREADY_EXISTS_CATEGORY("GAME_CATEGORY_00001", "동일한 카테고리가 이미 존재합니다."),
    ONLY_ENGLISH_CATEGORY_NAME("GAME_CATEGORY_00002", "카테고리 명은 영어만 사용이 가능합니다."),


    OVER_MAX_FILE_SIZE("FILE_00001", "파일 최대 용량을 초과하였습니다."),
    INVALID_FILE_CONTENT_TYPE("FILE_00002", "유효하지 않은 파일 형식입니다."),
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
