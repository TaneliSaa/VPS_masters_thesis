"use client";

import { useEffect, useState } from "react";

interface LogEntry {
  type: string;
  message: string;
  timestamp: string;
}

const ActivityLogSummary: React.FC = () => {
  const [log, setLog] = useState<LogEntry[]>([]);

  useEffect(() => {
    const savedLogs = localStorage.getItem("activityLog");
    if (savedLogs) {
      setLog(JSON.parse(savedLogs));
    }
  }, []);

  //Filter log types
  const cprCount = log.filter(entry => entry.message.toLowerCase().includes("cpr")).length;
  const defibCount = log.filter(entry => entry.message.toLowerCase().includes("defibrillator")).length;
  const questionCount = log.filter(entry => entry.type === "Text Question").length;

  //Time spent (first and last log entries. Change this later to simulation start)
  const endTime = log.length ? new Date(log[log.length - 1].timestamp) : null;
  const startTime = log.length ? new Date(log[0].timestamp) : null;
  const minutes = startTime && endTime
  ? Math.floor((endTime.getTime() - startTime.getTime()) / 60000) : 0;
  const seconds = startTime && endTime
    ? Math.floor(((endTime.getTime() - startTime.getTime()) / 1000) % 60): 0;

  //Outcome based on defib + CPR counts (for now its 2 and 1, BUT REMEMBER TO CHANGE THIS WHEN THE PROTOTYPE IS READY!)
  const survived = cprCount >= 2 && defibCount >= 1;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white border shadow rounded text-black">
      <h2 className="text-2xl font-bold mb-4">Simulation Summary</h2>

      <ul className="space-y-2 text-md">
        <li><strong>Simulation ID:</strong></li>
        <li><strong>User:</strong></li>
        <li><strong>Initial diagnosis:</strong></li>
        <li><strong>CPR compressions given:</strong> {cprCount}</li>
        <li><strong>Defibrillator uses:</strong> {defibCount}</li>
        <li><strong>Questions asked:</strong> {questionCount}</li>
        <li><strong>Total information revealed:</strong> out of 4</li>
        <li><strong>Total time spent:</strong> {minutes} minute and {seconds} seconds</li>
        <li><strong>Patient outcome:</strong> {survived ? "Patient survived" : "Patient did not survive"}</li>
      </ul>
    </div>
  );
};

export default ActivityLogSummary;
