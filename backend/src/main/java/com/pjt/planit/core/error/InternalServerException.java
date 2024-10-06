package com.pjt.planit.core.error;

public class InternalServerException extends RuntimeException {
    public static final InternalServerException EXCEPTION = new InternalServerException();

    private InternalServerException() {
        super("An internal server error occurred");
    }
}
