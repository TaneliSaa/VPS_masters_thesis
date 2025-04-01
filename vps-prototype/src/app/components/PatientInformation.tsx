/* This is the patient information component which is a part of the interactive menu component which is displayed in the simulation page. */


const PatientInformation = ({
    isOpen,
    onClose,
    data,
}: {
    isOpen: boolean;
    onClose: () => void;
    data: { [key: string]: string };
}) => {


    if (!isOpen) return null;



    return (

        <div className="fixed top-20 right-[20rem] w-80 p-4 bg-white border rounded-lg shadow-lg z-40 text-black">
            <h2 className="text-lg font-bold">Patient Information</h2>
            <ul className="text-md space-y-1">
                <li>
                    <strong>Name:</strong> Patient Saarinen
                </li>
                <li>
                    <strong>Sex:</strong> Male
                </li>
                <li>
                    <strong>Age:</strong> {data.age ?? <span className="text-gray-500 italic">Not yet asked</span>}
                </li>
                <li>
                    <strong>Medical History:</strong> {data.history ?? <span className="text-gray-500 italic">Not yet asked</span>}
                </li>
                <li>
                    <strong>Current Medications:</strong> {data.medications ?? <span className="text-gray-500 italic">Not yet asked</span>}
                </li>
                <li>
                    <strong>Symptoms:</strong> {data.symptoms ?? <span className="text-gray-500 italic">Not yet asked</span>}
                </li>
                <li>
                    <strong>Lifestyle:</strong> {data.lifestyle ?? <span className="text-gray-500 italic">Not yet asked</span>}
                </li>
            </ul>

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