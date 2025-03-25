"use client"

import ECGLine from "./ECGLine";

interface VitalSignProps {
    isVisible: boolean
    isRevived: boolean
}


const VitalSigns: React.FC<VitalSignProps> = ({ isVisible, isRevived }) => {
    if (!isVisible) return;

    return (
        <div className="absolute top-24 left-1/6 w-[22rem] p-4 bg-black text-green-400 font-mono rounded-lg border border-green-700 z-40">
            <h2 className="text-lg font-bold mb-3 text-green-300">Vital Signs Monitor</h2>

            <div className="grid grid-cols-2 gap-y-2 text-sm">
                <div>Heart Rate:</div>
                <div className={`font-semibold ${isRevived ? "text-green-400" : "text-red-500"}`}>
                    {isRevived? "82 bpm" : "0 bpm" }
                </div>

                <div>Blood Pressure:</div>
                <div className={`font-semibold ${isRevived ? "text-green-400" : "text-red-500"}`}>
                    {isRevived? "120 / 78" : "-- / -- mmHg"}
                    </div>

                <div>Respiration:</div>
                <div className={`font-semibold ${isRevived ? "text-green-400" : "text-red-500"}`}>
                    {isRevived? "18 /min" : "0 /min"}
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