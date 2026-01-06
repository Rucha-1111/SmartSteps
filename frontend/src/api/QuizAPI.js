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
