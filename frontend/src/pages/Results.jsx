import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Results = () => {
    const { state } = useLocation(); // contains { score, total, details }
    const navigate = useNavigate();

    if (!state) {
        navigate("/"); // fallback if no data
        return null;
    }

    const { score, total, details } = state;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Quiz Results</h1>

            <p className="mb-4 text-xl">
                You scored {score} / {total}
            </p>

            <div className="flex flex-col gap-4">
                {details.map((d) => (
                    <div key={d.id} className="border p-3 rounded-lg">
                        <p className="font-semibold">{d.question}</p>
                        <p>Your answer: {d.userAnswer || "Not answered"}</p>
                        <p>Correct answer: {d.correctAnswer}</p>
                        <p className={d.userAnswer === d.correctAnswer ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                            {d.userAnswer === d.correctAnswer ? "Correct" : "Incorrect"}
                        </p>
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
