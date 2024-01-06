package com.kokochi.kokocastserver.exception;

public class KokoException extends RuntimeException{

    private final ErrorCode errorCode;

    public KokoException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    public ErrorCode getErrorCode() {
        return errorCode;
    }

    public KokoException addParams(String key, String value) {
        errorCode.getParams().put(key, value);
        return this;
    }
}
