"use client"

interface PatientDialogueProps {
    message: string;
    showContinue?: boolean;
    onContinue: () => void;
}

const PatientDialogue: React.FC<PatientDialogueProps> = ({
    message,
    showContinue = false,
    onContinue,
}) => {
    return (
        <div className="absolute bottom-75 left-1/2 transform -translate-x-1/2 p-4 border rounded-lg shadow-lg max-w-md bg-white text-black">
            <h2 className="text-lg font-bold mb-2">Patient</h2>
            <p>{message}</p>


            {showContinue && onContinue && (
                <button
                    onClick={onContinue}
                    className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    continue
                </button>
            )}
        </div>
    );
};

export default PatientDialogue;