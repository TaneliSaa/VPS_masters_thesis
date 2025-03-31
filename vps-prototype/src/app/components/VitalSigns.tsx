/* This is vital sign monitor component. This is displayed in the simulation page when the patient collapse event happens. */
"use client"

import { useEffect, useState } from "react";
import ECGLine from "./ECGLine";

interface VitalSignProps {
    isVisible: boolean
    isRevived: boolean
}


const VitalSigns: React.FC<VitalSignProps> = ({ isVisible, isRevived }) => {
    if (!isVisible) return null;

    //States
    const [heartRate, setHeartRate] = useState(0);
    const [bloodPressure1, setBloodPressure1] = useState(0);
    const [bloodPressure2, setBloodPressure2] = useState(0);
    const [respiration, setRespiration] = useState(0);

    //Random number generator which takes min and max number and randomize a number between them
    function randomNumberGenerator(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    //Effect to display state numbers in the vital signs monitor
    useEffect(() => {
        if (!isRevived) return;
        //Randomize the numbers and change them every 2 seconds
        const interval = setInterval(() => {
            setHeartRate(randomNumberGenerator(79, 84));
            setBloodPressure1(randomNumberGenerator(118, 124));
            setBloodPressure2(randomNumberGenerator(76, 82));
            setRespiration(randomNumberGenerator(17, 20));
        }, 2000)

        return () => clearInterval(interval);
    }, [isRevived])

    return (
        <div className="absolute top-24 left-1/6 w-[22rem] p-4 bg-black text-green-400 font-mono rounded-lg border border-green-700 z-40">
            <h2 className="text-lg font-bold mb-3 text-green-300">Vital Signs Monitor</h2>

            <div className="grid grid-cols-2 gap-y-2 text-sm">
                <div>Heart Rate:</div>
                <div className={`font-semibold ${isRevived ? "text-green-400" : "text-red-500"}`}>
                    {heartRate} bpm
                </div>

                <div>Blood Pressure:</div>
                <div className={`font-semibold ${isRevived ? "text-green-400" : "text-red-500"}`}>
                    {bloodPressure1} / {bloodPressure2} mmHg
                </div>

                <div>Respiration:</div>
                <div className={`font-semibold ${isRevived ? "text-green-400" : "text-red-500"}`}>
                    {respiration} /min
                </div>
            </div>

            <div className="mt-4 border-t border-green-700 pt-2">
                <p className="text-green-300 text-xs mb-1">ECG</p>
                <ECGLine rhythm={isRevived ? "heartbeat" : "flatline"} />
            </div>
        </div>
    );
}

export default VitalSigns;