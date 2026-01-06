package com.quiz.quiz_app.service;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.quiz.quiz_app.model.Question;

@Service
public class QuizService {
    private final ObjectMapper mapper = new ObjectMapper();

    public List<Question> generateQuiz(Map<String, Integer> subjects) {
        List<Question> finalQuestions = new ArrayList<>();

        for (String subject : subjects.keySet()) {
            int count = subjects.get(subject);

            List<Question> questions = loadQuestions(subject);
            Collections.shuffle(questions);

            finalQuestions.addAll(
                    questions.stream().limit(count).toList());
        }

        Collections.shuffle(finalQuestions); // shuffle combined quiz
        return finalQuestions;
    }

    private List<Question> loadQuestions(String subject) {
        try {
            String fileName = "questions/" + subject + ".json";
            InputStream is = getClass()
                    .getClassLoader()
                    .getResourceAsStream(fileName);

            return mapper.readValue(is, new TypeReference<List<Question>>() {
            });
        } catch (IOException e) {
            throw new RuntimeException("Error loading questions for " + subject, e);
        }
    }
}
