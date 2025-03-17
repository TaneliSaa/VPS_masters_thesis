import React from "react";

interface TestMenuProps {
    onSelectTest: (test: string) => void;
}

const TestMenu: React.FC<TestMenuProps> = ({ onSelectTest }) => {
    const tests = ["Blood Test", "EKG", "Heart MRI"];

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md w-64">
            <h2 className="text-lg font-semibold mb-3">Select a Test</h2>
            <div className="flex flex-col gap-2">
                {tests.map((test) => (
                    <button
                        key={test}
                        onClick={() => onSelectTest(test)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    >
                        {test}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TestMenu;
