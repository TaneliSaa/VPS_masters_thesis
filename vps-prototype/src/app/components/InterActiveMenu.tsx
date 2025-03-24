"use client";
import { useEffect, useState } from "react";
import PatientInformation from "./PatientInformation";
import TakeTest from "./TakeTest";
import DiagnosisForm from "./DiagnosisForm";
import BloodTestResults from "./BloodTestResults";

const InterActiveMenu = ({
    isDiagnosisOpen,
    setIsDiagnosisOpen,
    onSubmitDiagnosis,
    selectedTool,
    setSelectedTool
}: {
    isDiagnosisOpen: boolean;
    setIsDiagnosisOpen: (val: boolean) => void;
    onSubmitDiagnosis: () => void;
    selectedTool: "CPR" | "defibrillator" | null;
    setSelectedTool: (tool: "CPR" | "defibrillator" | null) => void;
}) => {

    //States
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const [isPatientInformationOpen, setIsPatientInformationOpen] = useState(false);
    const [selectedTest, setSelectedTest] = useState<string | null>(null);
    const [isBloodTestOpen, setIsBloodTestOpen] = useState(false);

    //Dropdown menu system for take test and medical tool menus
    const toggleTab = (tab: string) => {
        setActiveTab(activeTab === tab ? null : tab);
    };

    //Change the mouse to look like CPR or defibrillator
    useEffect(() => {

        if (selectedTool === "CPR") {
            document.body.style.cursor = "url('/CPR-hands.png'), auto";
        } else if (selectedTool === "defibrillator") {
            document.body.style.cursor = "url('/defibrillator.png'), auto";
        } else {
            document.body.style.cursor = "default";
        }
    }, [selectedTool])




    return (
        <div className="fixed right-0 top-16 w-64 h-full bg-gray-800 text-white p-4 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Interactive Menu</h2>


            {/* Patient information*/}
            <button
                className="w-full text-left py-2 px-3 bg-gray-700 hover:bg-gray-600 rounded-md mb-2"
                onClick={() => {

                    setIsPatientInformationOpen(!isPatientInformationOpen);
                    setSelectedTest(null);
                    setIsDiagnosisOpen(false);
                    setIsBloodTestOpen(false);
                }}
            >
                Patient Information
            </button>

            {/* Take test*/}

            <button
                className="w-full text-left py-2 px-3 bg-gray-700 hover:bg-gray-600 rounded-md mb-2"
                onClick={() => {
                    toggleTab("patientInfo");
                    setIsPatientInformationOpen(false);
                    setIsDiagnosisOpen(false);
                    setIsBloodTestOpen(false);

                }}
            >
                Take Test
            </button>

            {activeTab === "patientInfo" && (

                <div className="p-3 bg-gray-700 rounded-md ">
                    <button
                        className="w-full text-left py-2 px-3 bg-gray-700 hover:bg-gray-600 rounded-md mt-2"
                        onClick={() => {
                            setIsBloodTestOpen(!isBloodTestOpen);

                        }}
                    >
                        Blood Test
                    </button>

                    <button
                        className="w-full text-left py-2 px-3 bg-gray-700 hover:bg-gray-600 rounded-md mt-2"
                        onClick={() => {
                            setSelectedTest("EKG");
                            setIsPatientInformationOpen(false);
                            setIsDiagnosisOpen(false);
                            setIsBloodTestOpen(false);
                        }}
                    >
                        EKG

                    </button>

                    <button
                        className="w-full text-left py-2 px-3 bg-gray-700 hover:bg-gray-600 rounded-md mt-2"
                        onClick={() => {
                            setSelectedTest("Heart MRI");
                            setIsPatientInformationOpen(false);
                            setIsDiagnosisOpen(false);
                            setIsBloodTestOpen(false);
                        }}
                    >
                        Heart MRI

                    </button>
                </div>
            )}

            {/* Diagnosis */}
            <button
                className="w-full text-left py-2 px-3 bg-gray-700 hover:bg-gray-600 rounded-md mb-2"
                onClick={() => {
                    setIsDiagnosisOpen(!isDiagnosisOpen);
                    setIsPatientInformationOpen(false);
                    setSelectedTest(null);
                    setIsBloodTestOpen(false);
                }}
            >
                Diagnose
            </button>

            {/* Medical tools */}
            <button
                className="w-full text-left py-2 px-3 bg-gray-700 hover:bg-gray-600 rounded-md"
                onClick={() => toggleTab("medicalTools")}
            >
                Medical Tools
            </button>

            {activeTab === "medicalTools" && (
                <div className="p-3 bg-gray-700 rounded-md">
                    <button
                        className={`w-full text-left py-2 px-3 rounded-md mt-2 ${selectedTool === "CPR" ? "bg-green-600" : "bg-gray-700 hover:bg-gray-600"}`}
                        onClick={() => setSelectedTool(selectedTool === "CPR" ? null : "CPR")}
                    >
                        CPR
                    </button>

                    <button
                        className={`w-full text-left py-2 px-3 rounded-md mt-2 ${selectedTool === "defibrillator" ? "bg-green-600" : "bg-gray-700 hover:bg-gray-600"}`}
                        onClick={() => setSelectedTool(selectedTool === "defibrillator" ? null : "defibrillator")}
                    >
                        Defibrillator
                    </button>
                </div>
            )}

            {/* Here are the imported components */}
            <PatientInformation
                isOpen={isPatientInformationOpen}
                onClose={() => setIsPatientInformationOpen(false)}
            />

            <TakeTest
                testType={selectedTest}
                isOpen={!!selectedTest}
                onClose={() => setSelectedTest(null)}
            />

            <DiagnosisForm
                isOpen={isDiagnosisOpen}
                onClose={() => setIsDiagnosisOpen(false)}
                onSubmitDiagnosis={onSubmitDiagnosis}
            />

            <BloodTestResults
                isOpen={isBloodTestOpen}
                onClose={() => setIsBloodTestOpen(false)}

            />

        </div>
    );
};

export default InterActiveMenu;
