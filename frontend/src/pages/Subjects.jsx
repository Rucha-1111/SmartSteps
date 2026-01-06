import { useState } from "react";
import { startQuiz } from "../api/QuizAPI";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const subjectsList = [
    "AI",
    "Algorithms",
    "API",
    "C",
    "CPP",
    "Databases",
    "DataStructures",
    "Docker",
    "HTTP",
    "Java",
    "JavaScript",
    "Microservices",
    "NLP",
    "Nodejs",
    "Programming",
    "Python",
    "React",
    "SpringBoot",
    "TimeAndSpaceComplexity",
    "OperatingSystems",
];

const Subjects = () => {
    const navigate = useNavigate();

    // stores selected subjects and their question counts
    // example: { Java: 10, Python: 15 }
    const [selectedSubjects, setSelectedSubjects] = useState({});

    // total quiz time (minutes)
    const [totalTime, setTotalTime] = useState(60);

    // toggle subject selection
    const toggleSubject = (subject) => {
        setSelectedSubjects((prev) => {
            if (prev[subject]) {
                // remove subject if already selected
                const copy = { ...prev };
                delete copy[subject];
                return copy;
            } else {
                // add subject with default question count
                return { ...prev, [subject]: 5 };
            }
        });
    };

    // change question count for a subject
    const updateQuestionCount = (subject, value) => {
        setSelectedSubjects((prev) => ({
            ...prev,
            [subject]: Math.min(100, Math.max(1, value)),
        }));
    };

    // start quiz
    const handleStartQuiz = async () => {
        if (Object.keys(selectedSubjects).length === 0) {
            alert("Select at least one subject");
            return;
        }

        const quizConfig = {
            subjects: selectedSubjects,
            totalTime,
        };

        try {
            const quizData = await startQuiz(quizConfig); // call your API
            // quizData contains { questions: [...], subjects: {...}, totalTime: X }
            navigate("/quiz", { state: quizData }); // pass data to Quiz page
        } catch (err) {
            console.error(err);
            alert("Failed to start quiz. Check backend.");
        }
    };


    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Choose Subjects</h1>

            {/* SUBJECT BUTTONS */}
            <div className="flex flex-wrap gap-3 mb-8">
                {subjectsList.map((subject) => (
                    <Button
                        key={subject}
                        label={subject}
                        onClick={() => toggleSubject(subject)}
                        className={
                            selectedSubjects[subject]
                                ? "bg-emerald-500 text-white"
                                : "bg-pink-300 text-emerald-900"
                        }
                    />
                ))}
            </div>

            {/* QUESTION COUNT PER SUBJECT */}
            {Object.keys(selectedSubjects).length > 0 && (
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">
                        Questions per subject
                    </h2>

                    {Object.entries(selectedSubjects).map(([subject, count]) => (
                        <div key={subject} className="mb-2">
                            <label className="mr-3 font-medium">{subject}:</label>
                            <input
                                type="number"
                                min={1}
                                max={100}
                                value={count}
                                className="border px-2 py-1 w-24"
                                onChange={(e) =>
                                    updateQuestionCount(subject, Number(e.target.value))
                                }
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* TOTAL TIME */}
            <div className="mb-6">
                <label className="font-semibold mr-3">
                    Total Quiz Time (minutes):
                </label>
                <input
                    type="number"
                    min={1}
                    value={totalTime}
                    className="border px-2 py-1 w-24"
                    onChange={(e) => setTotalTime(Number(e.target.value))}
                />
            </div>

            {/* START QUIZ */}
            <Button
                label="Start Quiz"
                onClick={handleStartQuiz}
                className="bg-blue-600 text-white px-6 py-3"
            />
        </div>
    );
};

export default Subjects;
