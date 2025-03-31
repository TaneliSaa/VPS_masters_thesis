/* Component for the activity log displayed in the simulation page. */
"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

//Interface for the log
interface LogEntry {
    type: string;
    message: string;
    timestamp: string;
}

const ActivityLog: React.FC<{ simulationId: number | null }> = ({ simulationId }) => {
    //States
    const { user } = useAuth();
    const [log, setLog] = useState<LogEntry[]>([]);
    const [inputLogs, setInputLogs] = useState<Record<string, string>>({});

    //Format the timestamp correctly to MySQL "YYYY-MM-DD hh:mm:ss"
    const formatTimestampForMySQL = () => {
        const now = new Date();
        return now.toISOString().slice(0, 19).replace("T", " ");
    };

    // Load activity logs from the localstorage
    useEffect(() => {
        const savedLogs = localStorage.getItem("activityLog");
        if (savedLogs) {
            setLog(JSON.parse(savedLogs));
        }
    }, []);

    //Save activity logs to the localstorage every time there is changes to them
    useEffect(() => {
        localStorage.setItem("activityLog", JSON.stringify(log));
    }, [log]);

    //Log entry adder
    const addLogEntry = async (type: string, message: string) => {
        //If user or user.id is missing, return error message (for debugging purposes)
        if (!user || !user.id || !simulationId) {
            console.warn("User ID is missing, skipping log entry.")
            return;
        }
        //Entry parameters which are inserted to the database
        const newEntry: LogEntry = {
            type,
            message,
            timestamp: formatTimestampForMySQL(),

        };

        //Append existing log with new entries
        setLog((prevLog) => {
            const updatedLog = [...prevLog, newEntry];
            //Save them to the localstorage
            localStorage.setItem("activityLog", JSON.stringify(updatedLog));
            return updatedLog;
        });

        //Debugging console log to see if logs are send forward
        console.log("Sending log entry: ", { user_id: user.id, simulation_id: simulationId, ...newEntry });

        //Fetch api/log
        await fetch("/api/log", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: user.id,
                simulation_id: simulationId,
                ...newEntry
            }),
        });
    };

    useEffect(() => {
        //Check if user is loaded(Debugging purposes)
        if (!user) {
            console.warn("User or simulation id not loaded yet, skipping event listener setup.");
            return;
        }
        //Click handler which adds button click to log
        const handleClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement;

            if (target.tagName === "BUTTON") {
                const buttonText = target.innerText.toLowerCase();
                //Submit text area text to the log after button called submit is pressed
                if (buttonText.includes("submit")) {
                    //Debugging console log
                    console.log("Submit button clicked! Logging stored text input.");
                    //Log user inputs and check if they have values. 
                    if (Object.keys(inputLogs).length > 0) {
                        for (const field in inputLogs) {
                            if (inputLogs[field]) {
                                addLogEntry("Text Input", `Typed in ${field}: "${inputLogs[field]}"`);
                            }
                        }
                        //Clear after processing is done to prevent dublicate logging.
                        setInputLogs({});
                    }
                } else {
                    //Log button clicks
                    addLogEntry("Button Click", `Clicked button: ${target.innerText}`);
                }
            }
        };

        //Input handler
        const handleInput = (event: Event) => {
            //Target inputs and text areas
            const target = event.target as HTMLInputElement | HTMLTextAreaElement;
            if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
                //Get target name, if not named, name it as unknown
                const fieldName = target.getAttribute("name") || "unknown";
                //Update log and keep the current values and update field name
                setInputLogs((prev) => ({
                    ...prev,
                    [fieldName]: target.value,
                }));
                //Console log for debugging
                console.log("Storing text input:", { fieldName, value: target.value });
            }
        };

        document.addEventListener("click", handleClick);
        document.addEventListener("input", handleInput);
        return () => {
            document.removeEventListener("click", handleClick);
            document.removeEventListener("input", handleInput);
        }


    }, [user, inputLogs]);

    //IF user or user_id is missing display loading activity log message in the website (debugging purposes)
    if (!user || !user.id || !simulationId) {
        return <p className="text-gray-500 p-4">Loading activity log...</p>;
    }

    return (
        <div className="absolute top-23 left-4 w-64 max-h-80 overflow-auto border p-3 rounded-lg bg-white shadow-lg">
            <h2 className="text-lg font-semibold">Activity Log</h2>
            <ul className="mt-2 space-y-2">
                {log
                    .slice()
                    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                    .map((entry, index) => (
                        <li key={index} className="border-b py-1">
                            <span className="font-semibold">{entry.type}</span>: {entry.message}
                            <span className="text-gray-500 text-sm"> ({new Date(entry.timestamp + " UTC").toLocaleTimeString("fi-FI", { timeZone: "Europe/Helsinki", hour12: false })})</span>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default ActivityLog;