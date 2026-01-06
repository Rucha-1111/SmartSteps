package com.quiz.quiz_app.dto;

import java.util.List;

public record QuizResultResponse(
    int score,
    int total,
    List<QuestionWithAnswer> details
) {}

// A small helper to send back the question + the correct answer ONLY at the end
record QuestionWithAnswer(
    int id,
    String question,
    String userAnswer,
    String correctAnswer
) {}