interface LogEntry {
    type: string;
    message: string;
    timestamp: string;
}

interface ActivityLogProps {
    log: LogEntry[];
}

const ActivityLog: React.FC<ActivityLogProps> = ({ log }) => {

    return (
        <div className="absolute top-4 left-4 w-64 max-h-80 overflow-auto border p-3 rounded-lg bg-white shadow-lg">
            <h2 className="text-lg font-semibold">Activity Log</h2>
            <ul className="mt-2 space-y-2">
                {log.map((entry, index) => (
                    <li key={index} className="border-b py-1">
                        <span className="font-semibold">{entry.type}</span>: {entry.message}
                        <span className="text-gray-500 text-sm"> ({entry.timestamp})</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActivityLog;
