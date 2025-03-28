"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";


interface Option {
    label: string;
    text: string;
}

interface Question {
    id: number;
    text: string;
    options: Option[];
    correct: string;
}

//List of questions for the quiz
const quizQuestions: Question[] = [

    {
        id: 1,
        text: "How many CPR do you must perform before using defibrillator?",
        options: [
            { label: "A", text: "10" },
            { label: "B", text: "15" },
            { label: "C", text: "60" },
            { label: "D", text: "30" },

        ],
        correct: "D"
    },
];


const QuizForm: React.FC = () => {

    //States
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const router = useRouter();

    //Handle radiobutton changes
    const handleChange = (questionId: number, selected: string) => {
        if (!submitted) {
            setAnswers((prev) => ({ ...prev, [questionId]: selected }));
        }
    };

    //Submit handler
    const handleSubmit = () => {
        let total = 0;
        //Score calculator
        quizQuestions.forEach((q) => {
            if (answers[q.id] === q.correct) total += 1;
        });
        setScore(total);
        setSubmitted(true);
    }

    return (
        <div className="p-6 bg-white rounded shadow space-y-4 max-w-3xl mx-auto">
            <h2 className="text-xl font-bold">Final Quiz</h2>

            {quizQuestions.map((q) => {
                const userAnswer = answers[q.id];
                
                return (
                    /* Number and question text */
                    <div key={q.id} className="mb-4">
                        <p className="font-semibold mb-2">
                            {q.id}. {q.text}
                        </p>
                        {/* Question options */}
                        {q.options.map((opt) => {
                            //User answer and correct answer
                            const isUserAnswer = userAnswer === opt.label;
                            const isCorrectAnswer = q.correct === opt.label;

                            let labelClass = "";
                            //If answer is correct, mark it green, if the answer is incorrect mark it red and mark the correct answer green
                            if (submitted) {
                                if (isUserAnswer && isCorrectAnswer) {
                                    labelClass = "text-green-600 font-semibold";
                                } else if (isUserAnswer && !isCorrectAnswer) {
                                    labelClass = "text-red-600 font-semibold"
                                } else if (!isUserAnswer && isCorrectAnswer) {
                                    labelClass = "text-green-600"
                                }
                            }

                            return (
                                //Radio buttons
                                <label key={opt.label} className="block mb-1">
                                    <input
                                        type="radio"
                                        name={`question-${q.id}`}
                                        value={opt.label}
                                        checked={isUserAnswer}
                                        onChange={() => handleChange(q.id, opt.label)}
                                        disabled={submitted}
                                    >
                                    </input>
                                    <span className={`ml-2 ${labelClass}`}>
                                        {opt.label}. {opt.text}
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                );
            })}

            <button
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleSubmit}
                disabled={submitted}
            >
                Submit Quiz
            </button>

            {submitted && (
                <div>
                    <p className="mt-4 text-lg font-semibold text-green-600">
                        {score} out of {quizQuestions.length}
                    </p>
                    <button
                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={() => router.push("/pages/selfref")}
                    >
                        Continue
                    </button>
                </div>
            )}
        </div>
    )
}

export default QuizForm;