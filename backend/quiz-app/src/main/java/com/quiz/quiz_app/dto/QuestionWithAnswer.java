package com.quiz.quiz_app.dto;

// A small helper to send back the question + the correct answer ONLY at the end
public record QuestionWithAnswer(
    int id,
    String question,
    String userAnswer,
    String correctAnswer
) {}
