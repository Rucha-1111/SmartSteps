package com.quiz.quiz_app.dto;

import java.util.Map;

public class QuizRequest {
    private Map<String, Integer> subjects;
    private int totalTime;

    public Map<String, Integer> getSubjects() {
        return subjects;
    }

    public void setSubjects(Map<String, Integer> subjects) {
        this.subjects = subjects;
    }

    public int getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(int totalTime) {
        this.totalTime = totalTime;
    }
}
