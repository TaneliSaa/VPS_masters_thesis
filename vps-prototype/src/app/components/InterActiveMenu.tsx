"use client";
import { useState } from "react";

const InterActiveMenu = () => {
    const [activeTab, setActiveTab] = useState<string | null>(null);

    const toggleTab = (tab: string) => {
        setActiveTab(activeTab === tab ? null : tab);
    };

    return (
        <div className="fixed right-0 top-16 w-64 h-full bg-gray-800 text-white p-4 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Interactive Menu</h2>

            {/* Menu buttons */}
            <button 
                className="w-full text-left py-2 px-3 bg-gray-700 hover:bg-gray-600 rounded-md mb-2"
                onClick={() => toggleTab("test")}
            >
                Patient Information
            </button>
            {activeTab === "test" && (
                <div className="p-3 bg-gray-700 rounded-md">
                    <p>Patient information things here</p>
                </div>
            )}

            <button 
                className="w-full text-left py-2 px-3 bg-gray-700 hover:bg-gray-600 rounded-md mb-2"
                onClick={() => toggleTab("patientInfo")}
            >
                Take Test
            </button>
            {activeTab === "patientInfo" && (
                <div className="p-3 bg-gray-700 rounded-md">
                    <p>Blood test, MRI, etc.</p>
                </div>
            )}

            <button 
                className="w-full text-left py-2 px-3 bg-gray-700 hover:bg-gray-600 rounded-md mb-2"
                onClick={() => toggleTab("diagnose")}
            >
                Diagnose
            </button>
            {activeTab === "diagnose" && (
                <div className="p-3 bg-gray-700 rounded-md">
                    <p>Make the diagnose format to pop up under the patient picture.</p>
                </div>
            )}

            <button 
                className="w-full text-left py-2 px-3 bg-gray-700 hover:bg-gray-600 rounded-md"
                onClick={() => toggleTab("medicalTools")}
            >
                Medical Tools
            </button>
            {activeTab === "medicalTools" && (
                <div className="p-3 bg-gray-700 rounded-md">
                    <p>Defibilator and CPR options, this will implemented later on when the patient collapses. Make this invisible.</p>
                </div>
            )}
        </div>
    );
};

export default InterActiveMenu;
