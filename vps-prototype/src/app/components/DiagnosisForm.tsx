import { useState } from "react";



const DiagnosisForm: React.FC = () => {
    

    

    return (
        <div className='p-4 border rounded-lg shadow-lg max-w-md mx-auto'>
            <textarea
                className="border p-2 w-full rounded"
                placeholder="Enter diagnosis..."
                name="Diagnose text area"
            />
            <button
                
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
                submit
            </button>
        </div>
    );
};

export default DiagnosisForm;
