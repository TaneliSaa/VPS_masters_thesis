/* This is the self-reflection component which is displayed in the self-reflection page. */
"use client"

import { useState } from "react";

const SelfReflectionForm = () => {

    //States
    const [reflection, setReflection] = useState("")
    const [submitted, setSubmitted] = useState(false);
    const [diagnosis, setDiagnosis] = useState("");
    const [diagnosisSubmitted, setDiagnosisSubmitted] = useState(false);
    const [isDiagnosisCorrect, setIsDiagnosisCorrect] = useState(false);

    //Final diagnosis
    const correctDiagnosis = "myocardial infarction";

    //Submit handler
    const handleSubmit = () => {
        if (!reflection.trim() || !diagnosis.trim()) return;

        const normalized = diagnosis.trim().toLowerCase();
        const correct = normalized === correctDiagnosis.toLocaleLowerCase();

        setIsDiagnosisCorrect(correct);
        setSubmitted(true);
        setDiagnosisSubmitted(true);
    }

    //Last summary of the submitted data and final diagnosis
    if (submitted) {
        return (
            <div className=" max-w-2xl mx-auto p-6 bg-green-50 border border-green-200 rounded shadow space-y-4 w-full">
                <div>
                    <h2 className="font-bold text-green-600"> Self-reflection submitted!</h2>
                    <p className="mt-2 italic break-words whitespace-pre-wrap">{reflection}</p>
                </div>

                <div>
                    <h2 className="font-bold mt-4"> Final diagnosis</h2>
                    <p className="mt-2 text-lg">
                        Your answer: <span className="font-semibold">{diagnosis}</span> {" "}
                        {isDiagnosisCorrect ? (
                            <span className="text-green-600 ml-2"> Correct!</span>
                        ) : (<span className="text-red-600 ml-2"> Incorrect!</span>)}
                    </p>
                    {!isDiagnosisCorrect && (
                        <p className="text-sm text-gray-600 mt-1">The correct answer was: <strong>{correctDiagnosis}</strong></p>
                    )}
                </div>
            </div>
        )
    }


    return (
        /* Self-reflection form */
        <div className="p-6 bg-white rounded shadow space-y-4">
            <h2 className="text-xl font-bold">Self-Reflection</h2>

            <textarea
                className="w-full p-3 border rounded"
                rows={4}
                placeholder="What went well during the simulation? Did you save the patient? Did you make correct diagnosis?"
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
            />

            <h2 className="text-xl font-bold mt-6">Final Diagnosis</h2>
            <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Submit your final diagnosis."
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}

            />

            <button
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleSubmit}
            >
                Submit
            </button>
        </div>
    )
}

export default SelfReflectionForm;

