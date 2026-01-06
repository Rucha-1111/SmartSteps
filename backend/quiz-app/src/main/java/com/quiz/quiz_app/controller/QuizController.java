package com.quiz.quiz_app.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quiz.quiz_app.dto.QuizRequest;
import com.quiz.quiz_app.model.Question;
import com.quiz.quiz_app.service.QuizService;

@RestController
@RequestMapping("/api/quiz")
@CrossOrigin(origins = "http://localhost:5173") // React dev server

public class QuizController {
    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @PostMapping("/start")
    public Map<String, Object> startQuiz(@RequestBody QuizRequest request) {

        List<Question> questions = quizService.generateQuiz(request.getSubjects());

        // remove answers before sending if needed
        List<Map<String, Object>> quizWithoutAnswer = questions.stream().map(q -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", q.getId());
            map.put("question", q.getQuestion());
            map.put("options", q.getOptions());
            return map;
        }).toList();

        Map<String, Object> response = new HashMap<>();
        response.put("questions", quizWithoutAnswer);
        response.put("totalTime", request.getTotalTime());

        return response;
    }
}
