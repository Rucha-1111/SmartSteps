import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Results = () => {
    const { state } = useLocation(); // contains { questions, answers }
    const navigate = useNavigate();

    if (!state) {
        navigate("/"); // fallback if no data
        return null;
    }

    const { questions, answers } = state;

    // calculate score
    let score = 0;
    questions.forEach((q) => {
        if (answers[q.id] === q.answer) score++;
    });

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Quiz Results</h1>

            <p className="mb-4 text-xl">
                You scored {score} / {questions.length}
            </p>

            <div className="flex flex-col gap-4">
                {questions.map((q) => (
                    <div key={q.id} className="border p-3 rounded-lg">
                        <p className="font-semibold">{q.question}</p>
                        <p>Your answer: {answers[q.id] || "Not answered"}</p>
                        <p>Correct answer: {q.answer}</p>
                    </div>
                ))}
            </div>

            <Button
                label="Back to Subjects"
                onClick={() => navigate("/")}
                className="bg-blue-600 text-white mt-6 px-6 py-3"
            />
        </div>
    );
};

export default Results;
