package com.quiz.quiz_app.dto;

import java.util.List;

public record QuizResultResponse(
    int score,
    int total,
    List<QuestionWithAnswer> details
) {}
