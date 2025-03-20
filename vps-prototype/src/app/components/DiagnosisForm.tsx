import { useState } from "react";



const DiagnosisForm = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    if (!isOpen) return null;



    return (

        <div className="fixed top-20 right-[20rem] w-96 p-4 bg-white border rounded-lg shadow-lg z-40 text-black">
            <h2 className="text-lg font-bold">Diagnosis</h2>

            <form className="mt-4">
                <label className="block text-sm font-medium">
                    Enter your diagnosis:
                    <input
                        type="text"
                        className="w-full p-2 mt-1 border rounded-lg"
                        placeholder="Type diagnosis here..."
                        name="diagnose text-area"
                    />
                </label>
                <div className="mt-3 flex justify-between">
                    <button
                        type="submit"
                        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Submit
                    </button>

                    <button
                        onClick={onClose}
                        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Close
                    </button>


                </div>

            </form>


        </div>
    );
};

export default DiagnosisForm;
