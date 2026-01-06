import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../components/Button";

const Quiz = () => {
    const { state } = useLocation(); // contains { questions, totalTime }
    const navigate = useNavigate();

    const { questions, totalTime } = state || {};

    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(totalTime ? totalTime * 60 : 0); // seconds
    const [isCalculating, setIsCalculating] = useState(false);

    // countdown timer
    useEffect(() => {
        if (!state || isCalculating) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setIsCalculating(true);
                    setTimeout(() => {
                        navigate("/results", { state: { questions, answers } });
                    }, 2000);
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [state, questions, answers, navigate, isCalculating]);

    if (!state) {
        navigate("/"); // fallback if user somehow landed here without data
        return null;
    }

    const handleAnswer = (questionId, option) => {
        setAnswers((prev) => ({ ...prev, [questionId]: option }));
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            navigate("/results", { state: { questions, answers } });
        }
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    const q = questions[currentIndex];

    if (isCalculating) {
        return (
            <div className="p-6 flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold mb-4">Calculating Results...</h1>
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Quiz</h1>
            <p className="mb-2 font-semibold">Time Left: {formatTime(timeLeft)}</p>
            <p className="mb-2 font-medium">
                Question {currentIndex + 1} / {questions.length}
            </p>
            <p className="mb-4 text-lg">{q.question}</p>

            <div className="flex flex-col gap-2 mb-4">
                {q.options.map((opt, i) => (
                    <Button
                        key={i}
                        label={opt}
                        onClick={() => handleAnswer(q.id, opt)}
                        className={
                            answers[q.id] === opt ? "bg-emerald-500 text-white" : "bg-pink-300 text-emerald-900"
                        }
                    />
                ))}
            </div>

            <Button
                label={currentIndex < questions.length - 1 ? "Next" : "Finish"}
                onClick={handleNext}
                className="bg-blue-600 text-white px-6 py-3"
            />
        </div>
    );
};

export default Quiz;
