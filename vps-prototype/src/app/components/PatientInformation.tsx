"use client"

const PatientInformation = ({isOpen,onClose} : {isOpen: boolean; onClose: () => void}) => {
    if (!isOpen) return null;



    return(

        <div className="fixed top-20 right-[20rem] w-80 p-4 bg-white border rounded-lg shadow-lg z-40 text-black">
            <h2 className="text-lg font-bold">Patient Information</h2>
            <p><strong>Name:</strong>Patient Saarinen</p>
            <p><strong>Sex:</strong>Male</p>
            <p><strong>Age:</strong>69</p>
            <p><strong>Medical History:</strong> Smoker, Heavy drinker, Obese, Diabetes, Hemorrhoids </p>
            <p><strong>Current Medications:</strong> Aspirin, Metformin</p>

            <button
                onClick={onClose}
                className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
                Close
            </button>
        </div>
    );
};

export default PatientInformation;