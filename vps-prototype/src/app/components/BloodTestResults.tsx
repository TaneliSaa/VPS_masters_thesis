"use client";

const BloodTestResults = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed top-20 right-[20rem] w-[25rem] max-h-[70vh] p-4 bg-white border rounded-lg shadow-lg z-40 overflow-y-auto text-black">
            <h2 className="text-lg font-bold mb-3">Blood Test Results</h2>

            
            {/* Complete blood test table to hint a heart attack (made to be as realistic as possible from the information took from internet) */}
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-3 py-2 text-left">Test Name</th>
                        <th className="border border-gray-300 px-3 py-2 text-left">Result</th>
                        <th className="border border-gray-300 px-3 py-2 text-left">Reference Range</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Complete Blood Count (CBC) */}
                    <tr className="bg-gray-100">
                        <td className="border border-gray-300 px-3 py-2 font-semibold" colSpan={3}>Complete Blood Count (CBC)</td>
                    </tr>
                    <tr>
                        <td className="border border-gray-300 px-3 py-2">White Blood Cells (WBC)</td>
                        <td className="border border-gray-300 px-3 py-2">7.2 x10⁹/L</td>
                        <td className="border border-gray-300 px-3 py-2">4.0 - 11.0 x10⁹/L</td>
                    </tr>
                    <tr>
                        <td className="border border-gray-300 px-3 py-2">Red Blood Cells (RBC)</td>
                        <td className="border border-gray-300 px-3 py-2">4.8 x10¹²/L</td>
                        <td className="border border-gray-300 px-3 py-2">4.2 - 5.9 x10¹²/L</td>
                    </tr>
                    <tr>
                        <td className="border border-gray-300 px-3 py-2">Hemoglobin (Hgb)</td>
                        <td className="border border-gray-300 px-3 py-2">14.2 g/dL</td>
                        <td className="border border-gray-300 px-3 py-2">13.0 - 17.0 g/dL</td>
                    </tr>
                    <tr>
                        <td className="border border-gray-300 px-3 py-2">Hematocrit (Hct)</td>
                        <td className="border border-gray-300 px-3 py-2">41%</td>
                        <td className="border border-gray-300 px-3 py-2">37% - 50%</td>
                    </tr>

                    {/* Electrolytes & Kidney Function */}
                    <tr className="bg-gray-100">
                        <td className="border border-gray-300 px-3 py-2 font-semibold" colSpan={3}>Electrolytes & Kidney Function</td>
                    </tr>
                    <tr>
                        <td className="border border-gray-300 px-3 py-2">Sodium (Na⁺)</td>
                        <td className="border border-gray-300 px-3 py-2">139 mmol/L</td>
                        <td className="border border-gray-300 px-3 py-2">135 - 145 mmol/L</td>
                    </tr>
                    <tr>
                        <td className="border border-gray-300 px-3 py-2">Potassium (K⁺)</td>
                        <td className="border border-gray-300 px-3 py-2">4.3 mmol/L</td>
                        <td className="border border-gray-300 px-3 py-2">3.5 - 5.1 mmol/L</td>
                    </tr>
                    <tr>
                        <td className="border border-gray-300 px-3 py-2">Creatinine</td>
                        <td className="border border-gray-300 px-3 py-2">0.9 mg/dL</td>
                        <td className="border border-gray-300 px-3 py-2">0.6 - 1.3 mg/dL</td>
                    </tr>

                    {/* Cardiac Markers (Key for Heart Attack) */}
                    <tr className="bg-gray-100">
                        <td className="border border-gray-300 px-3 py-2 font-semibold" colSpan={3}>Cardiac Markers</td>
                    </tr>
                    <tr>
                        <td className="border border-gray-300 px-3 py-2">Troponin I</td>
                        <td className="border border-gray-300 px-3 py-2">1.5 ng/mL</td>
                        <td className="border border-gray-300 px-3 py-2">&lt; 0.04 ng/mL</td>
                    </tr>
                    <tr>
                        <td className="border border-gray-300 px-3 py-2">CK-MB</td>
                        <td className="border border-gray-300 px-3 py-2">25 ng/mL</td>
                        <td className="border border-gray-300 px-3 py-2">&lt; 5 ng/mL</td>
                    </tr>
                    <tr>
                        <td className="border border-gray-300 px-3 py-2">Myoglobin</td>
                        <td className="border border-gray-300 px-3 py-2">150 ng/mL</td>
                        <td className="border border-gray-300 px-3 py-2">25 - 72 ng/mL</td>
                    </tr>
                </tbody>
            </table>

            <button
                onClick={onClose}
                className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md w-full"
            >
                Close
            </button>
        </div>
    );
};

export default BloodTestResults;
