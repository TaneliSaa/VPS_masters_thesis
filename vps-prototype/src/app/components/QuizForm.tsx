/* This is the quiz form component which is displayed in the feedback page. */
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
        text: "What happens in sudden cardiac arrest?",
        options: [
            { label: "A", text: "Heart beats very slowly" },
            { label: "B", text: "Heart pumps too much blood" },
            { label: "C", text: "Heart stops beating" },
            { label: "D", text: "Heart skips heartbeat" },

        ],
        correct: "C"
    },
    {
        id: 2,
        text: "What is the difference between heart attack and sudden cardiac arrest?",
        options: [
            { label: "A", text: "In heart attack the heart stops beating and in sudden cardiac arrest it beats very slowly" },
            { label: "B", text: "They are the same" },
            { label: "C", text: "Heart attack is follow up to the sudden cardiac arrest" },
            { label: "D", text: "Cardiac arrest is an electrical problem and heart attack is a circulation problem" },

        ],
        correct: "D"
    },
    {
        id: 3,
        text: "Why is CPR important?",
        options: [
            { label: "A", text: "It is the only way to restart heart" },
            { label: "B", text: "Keeping the blood flow active increases the survival rate of the patient" },
            { label: "C", text: "It increases the survival rate by 20%" },
            { label: "D", text: "It is not important" },

        ],
        correct: "B"
    },
    {
        id: 4,
        text: "What is the primary cause of a heart attack?",
        options: [
            { label: "A", text: "Blockage in coronary arteries" },
            { label: "B", text: "Heart pumps too much blood" },
            { label: "C", text: "Getting scared" },
            { label: "D", text: "Heart skips too many heart beats" },

        ],
        correct: "A"
    },
    {
        id: 5,
        text: "When should you use a defibrillator during cardiac arrest?",
        options: [
            { label: "A", text: "After 30 chest compressions" },
            { label: "B", text: "After 60 chest compressions" },
            { label: "C", text: "After performing CPR for 5 minutes" },
            { label: "D", text: "As soon as it is available" },

        ],
        correct: "D"
    },
    {
        id: 6,
        text: "Which one of these options has highest potential to increase heart attack?",
        options: [
            { label: "A", text: "High blood pressure" },
            { label: "B", text: "Age" },
            { label: "C", text: "Diabetes" },
            { label: "D", text: "Smoking" },

        ],
        correct: "A"
    },
    {
        id: 7,
        text: "How many chest compressions should be given per minute during CPR?",
        options: [
            { label: "A", text: "60-80" },
            { label: "B", text: "80-100" },
            { label: "C", text: "100-120" },
            { label: "D", text: "120-140" },

        ],
        correct: "C"
    },
    {
        id: 8,
        text: "Which blood test results might suggest a heart attack?",
        options: [
            { label: "A", text: "High insulin" },
            { label: "B", text: "Elevated troponin levels" },
            { label: "C", text: "Low white blood cells" },
            { label: "D", text: "Low red blood cells" },

        ],
        correct: "B"
    },
    {
        id: 9,
        text: "What is a major warning sign of sudden cardiac arrest?",
        options: [
            { label: "A", text: "Lost feeling of a limb" },
            { label: "B", text: "Chest pain" },
            { label: "C", text: "Nausea" },
            { label: "D", text: "Sudden collapse and unresponsiveness" },

        ],
        correct: "D"
    },
    {
        id: 10,
        text: "Which part of the heart is most often affected during a heart attack?",
        options: [
            { label: "A", text: "Pulmonary valve" },
            { label: "B", text: "Right atrium" },
            { label: "C", text: "Aorta" },
            { label: "D", text: "Left ventricle" },

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
                        onClick={() => router.push("/pages/reflection")}
                    >
                        Continue
                    </button>
                </div>
            )}
        </div>
    )
}

export default QuizForm;