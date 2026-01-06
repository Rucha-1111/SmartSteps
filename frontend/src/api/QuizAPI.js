export const startQuiz = async (quizConfig) => {
    const response = await fetch("http://localhost:8080/api/quiz/start", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(quizConfig),
    });

    return response.json();
};

export const submitQuiz = async (submission) => {
    const response = await fetch("http://localhost:8080/api/quiz/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(submission),
    });

    return response.json();
};
