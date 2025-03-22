import React from "react";
import type { LogEntry as LogEntryType } from "@/lib/matching-engine";

interface LogEntryProps {
  time: string;
  type: string;
  message: string;
}

const LogEntry: React.FC<LogEntryProps> = ({ time, type, message }) => {
  const getTypeColor = () => {
    switch (type) {
      case "SUCCESS":
        return "text-emerald-500";
      case "INFO":
        return "text-blue-500";
      case "WARNING":
        return "text-amber-500";
      case "ERROR":
        return "text-red-500";
      default:
        return "text-blue-500";
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#F6411B]/5 to-green-500/5 rounded-xl p-3 border border-[#F6411B]/20 hover:border-green-500/20 transition-colors">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[#F6411B] text-sm font-medium">{time}</span>
        <span className={`${getTypeColor()} text-sm font-medium`}>{type}</span>
      </div>
      <p className="text-[#F6411B] text-sm">{message}</p>
    </div>
  );
};

export default LogEntry;
