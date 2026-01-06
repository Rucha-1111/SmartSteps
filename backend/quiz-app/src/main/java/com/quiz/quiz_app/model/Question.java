package com.quiz.quiz_app.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Question {
    private int id;
    private String question;
    private List<String> options;

    @JsonProperty(value = "answer", access = JsonProperty.Access.WRITE_ONLY) // This ensures it matches your JSON file and React code
    private String answer;
    // getters and setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public List<String> getOptions() {
        return options;
    }

    public void setOptions(List<String> options) {
        this.options = options;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }
}
