"use client"

import { useEffect, useState } from "react";

interface LogEntry {
    type: string;
    message: string;
    timestamp: string;
}


const ActivityLogSummary: React.FC = () => {

    //States
    const [log,setLog] = useState<LogEntry[]>([]);


    useEffect(() => {
        const storedLog = localStorage.getItem("activityLog");
        if (storedLog) {
            setLog(JSON.parse(storedLog));
        }

    },[]);


    return(

        <div className="mt-6 max-h-[400px] overflow-auto border p-4 rounded-lg bg-white shadow text-sm">
            <h2 className="text-lg font-bold mb-2">Activity Summary</h2>
            <ul className="space-y-2">
                {log.map((entry, index) => (
                    <li key={index} className="border-b py-1">
                        <span className="font-semibold">{entry.type}</span>: {entry.message}
                        <span className="text-gray-500 text-xs"> ({new Date(entry.timestamp + " UTC").toLocaleTimeString("fi-FI", { timeZone: "Europe/Helsinki", hour12: false })})</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ActivityLogSummary;