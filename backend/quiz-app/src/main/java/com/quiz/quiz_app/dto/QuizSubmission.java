package com.quiz.quiz_app.dto;

import java.util.Map;

public class QuizSubmission {
    private Map<String, Integer> subjects;
    private Map<Integer, String> answers;

    public Map<String, Integer> getSubjects() {
        return subjects;
    }

    public void setSubjects(Map<String, Integer> subjects) {
        this.subjects = subjects;
    }

    public Map<Integer, String> getAnswers() {
        return answers;
    }

    public void setAnswers(Map<Integer, String> answers) {
        this.answers = answers;
    }
}
