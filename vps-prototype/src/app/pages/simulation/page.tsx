'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import ActivityLog from '@/app/components/ActivityLog';
import InterActiveMenu from '@/app/components/InterActiveMenu';
import PatientDialogue from '@/app/components/PatientDialogue';
import VitalSigns from '@/app/components/VitalSigns';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';




export default function Page() {
    //States 
    const [dialogue, setDialogue] = useState("Hey doc.");
    const [showContinue, setShowContinue] = useState(false);
    const [isDiagnosisOpen, setIsDiagnosisOpen] = useState(false);
    const [hasCollapsed, setHasCollapsed] = useState(false);
    const [timeLeft, setTimeLeft] = useState(8 * 60);
    const [timerActive, setTimerActive] = useState(false);
    const [cprCount, setCprCount] = useState(0);
    const [lastCprTime, setLastCprTime] = useState<number | null>(null);
    const [selectedTool, setSelectedTool] = useState<"CPR" | "defibrillator" | null>(null);
    const [defibrillatorsCount, setDefibrillatorsCount] = useState(0);
    const [lastDefibrillatorsTime, setLastDefibrillatorsTime] = useState<number | null>(null);
    const [cprReady, setCprReady] = useState(true);
    const [defiBrillatorsReady, setDefibrillatorsReady] = useState(false);
    const [isRevived, setIsRevived] = useState(false);
    const router = useRouter();
    const [patientInfo, setPatientInfo] = useState<{ [key: string]: string }>({});
    const [simulationId, setSimulationId] = useState<number | null>(null);
    const { user } = useAuth();



    // Diagnosis submit handler
    const handleDiagnosisSubmit = () => {
        setDialogue("Doc... I don't feel so good... ARRRGGHHH!");
        setShowContinue(true);
        setIsDiagnosisOpen(false);
    }

    //After diagnosis is given, continue button handler
    const handleContinue = () => {
        setShowContinue(false);
        setDialogue("Ughhh...");
        setHasCollapsed(true);
        setTimerActive(true);
    }

    //Formatting time for the 8 minute timer counter
    const formatTime = (seconds: number) => {
        const min = Math.floor(seconds / 60).toString().padStart(2, "0")
        const sec = (seconds % 60).toString().padStart(2, "0");
        return `${min} : ${sec}`;
    };

    //Effect for the timer which reloads the timer every 1s and display that change in the website
    useEffect(() => {
        if (!timerActive) return;
        const interval = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [timerActive]);

    //Effect for defibrillator cue (CHANGE cprCount LATER TO 30 WHEN THE PROTOTYPE IS DONE!)
    useEffect(() => {
        if (cprCount % 2 === 0 && cprCount > 0) {
            setDefibrillatorsReady(true);
        } else {
            setDefibrillatorsReady(false);
        }

    }, [cprCount])

    //Effect for the patient revive (CHANGE THE cprCount and defibrillatorsCount to 30 and 2 WHEN THE PROTOTYPE IS DONE!)
    useEffect(() => {
        if (!isRevived && cprCount >= 2 && defibrillatorsCount >= 1) {
            setIsRevived(true);
            setTimerActive(false);
            //Debugging console log
            console.log("Patient has revived!");
            setSelectedTool(null);
        }

    }, [cprCount, defibrillatorsCount, isRevived])

    //Effect for the simulation start
    useEffect(() => {
        const startSimulation = async () => {
            const res = await fetch("/api/start-simulation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id: user?.id }),
            });

            const data = await res.json();
            //Debugging console log
            console.log("DATA: ", data.simulation_id)
            setSimulationId(data.simulation_id);
        };

        if (user?.id) {
            startSimulation();
        }
    }, [user]);


    //CPR click handler
    const handleCPRClick = () => {
        const now = Date.now();
        if (!lastCprTime || now - lastCprTime >= 1500) {
            setCprCount((prev) => prev + 1);
            setLastCprTime(now);
            setCprReady(false);
            console.log("CPR given! Total: ", cprCount + 1);
            setTimeout(() => {
                setCprReady(true)
            }, 1500);

        } else {
            console.log("Too soon! Spam click prevention.");
        }
    };

    //Defibrillators click handler
    const handleDefibrillatorsClick = () => {
        const now = Date.now();
        if (!lastDefibrillatorsTime || now - lastDefibrillatorsTime >= 2000) {
            setDefibrillatorsCount((prev) => prev + 1);
            setLastDefibrillatorsTime(now);
            console.log("Defibrillators given! Total: ", defibrillatorsCount + 1);
            setDefibrillatorsReady(false);
        } else {
            console.log("Too soon! Spam click prevention.");
        }
    };

    //Info handler for the patient information
    const handleRevealInfo = (key: string, value: string) => {
        setPatientInfo((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    return (
        <div>

            {/*Interactive menu*/}
            <div className='w-64 bg-gray-800 text-white h-full shadow-md'>
                <InterActiveMenu
                    isDiagnosisOpen={isDiagnosisOpen}
                    setIsDiagnosisOpen={setIsDiagnosisOpen}
                    onSubmitDiagnosis={handleDiagnosisSubmit}
                    selectedTool={selectedTool}
                    setSelectedTool={setSelectedTool}
                    patientInfo={patientInfo}
                />
            </div>

            {/*Timer*/}
            {timerActive && (
                <div className='fixed top-15 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xl font-bold px-6 py-2 rounded-lg shadow-lg z-50'>
                    {formatTime(timeLeft)}
                </div>
            )}

            {/*Image of the patient */}
            <div className="p-4 border rounded-lg shadow-lg max-w-md mx-auto">
                <Image
                    src={hasCollapsed ? "/Patient-laying.jpg" : "/Patient-sitting.jpg"}
                    alt='Picture of the patient sitting'
                    width="500"
                    height="500"
                    onClick={() => {
                        if (selectedTool === "CPR" && hasCollapsed) {
                            handleCPRClick();
                        } else if (selectedTool === "defibrillator" && hasCollapsed) {
                            handleDefibrillatorsClick();
                        }
                    }}
                >
                </Image>
            </div>



            {/*Patient dialogue bar*/}

            <div className="flex flex-col items-center absolute bottom-15 left-1/2 transform -translate-x-1/2 z-50">

                {/*Compression counter*/}
                {selectedTool === "CPR" && hasCollapsed && (
                    <div className={`mt-2 text-center font-mono text-lg ${cprReady ? "text-green-500" : "text-red-500"} transition-colors duration-300`}>
                        Compressions: {cprCount}
                    </div>
                )}

                {/*Defibrillators counter*/}
                {selectedTool === "defibrillator" && hasCollapsed && (
                    <div className={`mt-2 text-center font-mono text-lg ${defiBrillatorsReady ? "text-green-500" : "text-red-500"} transition-colors duration-100`}>
                        Defibrillators shocked: {defibrillatorsCount}
                    </div>
                )}
                <PatientDialogue
                    message={dialogue}
                    showContinue={showContinue}
                    onContinue={handleContinue}
                    onRevealInfo={handleRevealInfo}
                    isVisible={!hasCollapsed}
                    hasCollapsed={hasCollapsed}
                />

                {isRevived && (
                    <div className='mt-8 text-center'>
                        <button
                            onClick={() => router.push("/pages/feedback")}
                            className='px-6 py-3 bg-blue-600 text-white rounded-lg text-lg shadow-md'
                        >
                            End Simulation
                        </button>

                    </div>
                )}

            </div>

            {/*Activity log*/}
            <div>
                {simulationId && (
                    <ActivityLog simulationId={simulationId} />
                )}
            </div>

            {/*Vital signs*/}
            <div>
                <VitalSigns isVisible={hasCollapsed} isRevived={isRevived} />
            </div>



        </div>
    )

}