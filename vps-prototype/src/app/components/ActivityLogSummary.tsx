"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

interface LogEntry {
  type: string;
  message: string;
  timestamp: string;
}

const ActivityLogSummary: React.FC<{ simulationId: number; cprCount: number; defibCount: number; requiredFields: string[]; revealedCount: number; startTime: string | null; endTime: string | null }> = ({ simulationId, cprCount, defibCount, requiredFields, revealedCount, startTime, endTime }) => {
  const [log, setLog] = useState<LogEntry[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const savedLogs = localStorage.getItem("activityLog");
    if (savedLogs) {
      setLog(JSON.parse(savedLogs));
    }
  }, []);

  //Filter log types
  const questionCount = log.filter(entry => entry.message.includes("Typed in Question area:")).length;

  //Time spent (simulation start and end and formated to minutes and seconds)
  const start = startTime ? new Date(startTime) : null;
  const end = endTime ? new Date(endTime) : null;
  const minutes = start && end
    ? Math.floor((end.getTime() - start.getTime()) / 60000) : 0;
  const seconds = start && end
    ? Math.floor(((end.getTime() - start.getTime()) / 1000) % 60) : 0;

  //Outcome based on defib + CPR counts (for now its 2 and 1, BUT REMEMBER TO CHANGE THIS WHEN THE PROTOTYPE IS READY!)
  const survived = cprCount >= 2 && defibCount >= 1;

  //Find the diagnosis from the logs
  const diagnosisEntry = log.find(entry => entry.message.toLowerCase().includes("diagnose text-area"));
  //Filter everything except the diagnosis
  const diagnosisFiltered = diagnosisEntry ? diagnosisEntry.message.match(/"([^"]+)"/)?.[1] ?? "" : "";

  return (
    <div className="p-6 max-w-xl mx-auto bg-white border shadow rounded text-black">
      <h2 className="text-2xl font-bold mb-4">Simulation Summary</h2>

      <ul className="space-y-2 text-md">
        <li><strong>Simulation ID:</strong> {simulationId}</li>
        <li><strong>User:</strong> {user?.username}</li>
        <li><strong>Initial diagnosis:</strong> {diagnosisFiltered}</li>
        <li><strong>CPR compressions given:</strong> {cprCount}</li>
        <li><strong>Defibrillator uses:</strong> {defibCount}</li>
        <li><strong>Questions asked:</strong> {questionCount}</li>
        <li><strong>Total information revealed:</strong> {revealedCount} out of {requiredFields.length}</li>
        <li><strong>Total time spent:</strong> {minutes} minute and {seconds} seconds</li>
        <li><strong>Patient outcome:</strong> {survived ? "Patient survived" : "Patient did not survive"}</li>
      </ul>
    </div>
  );
};

export default ActivityLogSummary;
