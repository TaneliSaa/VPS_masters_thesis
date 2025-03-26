"use client";

import { useEffect, useState } from "react";

interface PatientDialogueProps {
    message: string;
    showContinue?: boolean;
    onContinue: () => void;
    onRevealInfo: (key: string, value: string) => void;
    isVisible?: boolean;
    hasCollapsed?: boolean;
}

const PatientDialogue: React.FC<PatientDialogueProps> = ({
    message,
    showContinue = false,
    onContinue,
    onRevealInfo,
    isVisible = true,
    hasCollapsed = false

}) => {
    //States
    const [input, setInput] = useState("");
    const [response, setResponse] = useState<string | null>(null);


    //Key words for the patient information
    const keywordMatches: { [key: string]: string[] } = {
        symptoms: ["symptoms", "whatareyoursymptoms", "howdoyoufeel"],
        age: ["age", "howoldareyou"],
        history: ["medicalhistory", "doyouhaveanyconditions", "healthissues", "diseases"],
        medications: ["medications", "whatmedicationsdoyoutake", "currentmedications", "pills"],
        lifestyle: ["doyousmoke", "doyoudrink", "areyousmoker", "eatinghabits", "alcohol,tellmeaboutyourlifestyle", "lifestyle"]

    }

    //Responses which patient gives when asked questions with keyword matches
    const responses: { [key: string]: { text: string; infoKey?: string; infoValue?: string } } = {
        symptoms: {
            text: "I have had chest pains, breathing problems, and I also feel like throwing up.",
            infoKey: "symptoms",
            infoValue: "chest pain, shortness of breath, nausea"
        },
        age: {
            text: "I am 69-years old",
            infoKey: "age",
            infoValue: "69-years old"
        },
        history: {
            text: "I have type 2 diabetes and very high blood pressure",
            infoKey: "history",
            infoValue: "Diabetes type 2, high blood pressure"
        },
        medications: {
            text: "I take metformin tablets for my diabetes and carvedilol for my blood pressure",
            infoKey: "medications",
            infoValue: "Metformin, carvedilol(beta blockers)"
        },
        lifestyle: {
            text: "I smoke regularly and drink alcohol everyday. I also eat a lot of junk food.",
            infoKey: "lifestyle",
            infoValue: "Smoker, heavy drinker, bad eating habits"
        }


    }

    //Ask handler
    const handleAsk = () => {
        //Filter for the text area input
        const normalized = input.toLowerCase().replace(/[.,?!]/g, "").replace(/\s+/g, "");
        let matched = false;

        //for loop to check keywords from text area inputs
        for (const key in keywordMatches) {
            if (keywordMatches[key].some(phrase => normalized.includes(phrase))) {
                const { text, infoKey, infoValue } = responses[key];
                setResponse(text);
                if (infoKey && infoValue) {
                    onRevealInfo(infoKey, infoValue);
                }
                matched = true;
                break;
            }
        }
        //If questions dont have any keywords, give this answer.
        if (!matched) {
            setResponse("I am not sure what you mean, doc.")
        }
        //Clear the text area after submit
        setInput("");
    };

    //Effect to clear the patient answers when collapse event happens
    useEffect(() => {
        setResponse(null);
    }, [message])

    return (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-[28rem] z-50">

            <div className="p-4 border rounded-lg shadow-lg bg-white text-black mb-4">
                <h2 className="text-lg font-bold mb-2">Patient</h2>
                <p>{hasCollapsed ? message : response ?? message}</p>

                {showContinue && onContinue && (
                    <button
                        onClick={onContinue}
                        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Continue
                    </button>
                )}
            </div>

            <div className="h-40">

                {isVisible && (
                    <div className="p-4 border rounded-lg shadow bg-white text-black">
                        <h3 className="text-md font-semibold mb-2">Ask a question</h3>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your question here..."
                            className="w-full p-2 border rounded mb-2 text-sm"
                            rows={3}
                            name="Question area"
                        />
                        <button
                            onClick={handleAsk}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                            Submit Question
                        </button>
                    </div>

                )}

            </div>


        </div>
    );
};

export default PatientDialogue;
