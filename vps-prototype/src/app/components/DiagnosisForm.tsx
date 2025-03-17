import { useState } from "react";

interface DiagnosisFormProps {
    addLogEntry: (type: string, message: string) => void;
}

const DiagnosisForm: React.FC<DiagnosisFormProps> = ({ addLogEntry }) => {
    const [diagnosis, setDiagnosis] = useState("");

    const handleSubmit = () => {
        if (diagnosis.trim() !== "") {
            addLogEntry("Diagnosis Submitted", `User diagnosed: "${diagnosis}"`);
            setDiagnosis(""); // Clear input after submission
        }
    };

    return (
        <div className='p-4 border rounded-lg shadow-lg max-w-md mx-auto'>
            <textarea
                className="border p-2 w-full rounded"
                placeholder="Enter diagnosis..."
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
            />
            <button
                onClick={handleSubmit}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
                Submit Diagnosis
            </button>
        </div>
    );
};

export default DiagnosisForm;
