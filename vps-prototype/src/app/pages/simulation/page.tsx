'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import TestMenu from '../../components/TestMenu';
import ActivityLog from '../../components/ActivityLog';
import DiagnosisForm from '../../components/DiagnosisForm';


interface LogEntry {
    type: string;
    message: string;
    timestamp: string;
}


export default function Page() {
    //States 
    
    const [isHidden, setIsHidden] = useState(true)

    const [log, setLog] = useState<LogEntry[]>([]);

     // Function to update logs
     const addLogEntry = (type: string, message: string) => {
        const newEntry = { type, message, timestamp: new Date().toLocaleTimeString() };
        setLog((prevLog) => [...prevLog, newEntry]); // Append new log entry
    };

    //Patient dialogue
    const patientSymptoms = "I have chest pain, shortness of breath, and nausea.";

    //Hiding and showing components
    const hiddenInputHandler = () => {
        setIsHidden(!isHidden);
    }

    const handleTestSelect = (test: string) => {
        console.log(`Selected test: ${test}`);
    }

    return (
        <div>

            {/*Image of the patient */}
            <div className="p-4 border rounded-lg shadow-lg max-w-md mx-auto">
                <Image
                    src="/Patient-sitting.jpg"
                    alt='Picture of the patient sitting'
                    width="500"
                    height="500"
                >
                </Image>
            </div>

            {/*Patient dialogue bar*/}
            <div className='p-4 border rounded-lg shadow-lg max-w-md mx-auto'>
                <h2 className="text-lg font-bold">Patient</h2>
                <p className="mt-2">Hey doctor! {patientSymptoms}</p>
                <button
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => { hiddenInputHandler() }}
                >
                    Continue
                </button>
            </div>


            <div>
                <TestMenu onSelectTest={handleTestSelect} />
            </div>

            <div>
                <ActivityLog log={log}/>
            </div>

            <div>
                <DiagnosisForm addLogEntry={addLogEntry} />
            </div>

        </div>
    )

}