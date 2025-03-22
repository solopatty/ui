"use client"
import React from 'react'
import { useEffect, useState } from 'react';
import LogEntry from './LogEntry';
import { matchingEngine } from '@/lib/matching-engine';
import type { LogEntry as LogEntryType } from '@/lib/matching-engine';
import { RefreshCcw } from 'lucide-react';

export const LogBar = () => {
  const [logs, setLogs] = useState<LogEntryType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const logsData = await matchingEngine.fetchTEELogs();
        setLogs(logsData);
      } catch (error) {
        console.error('[LogViewer] Error fetching logs:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLogs();
    
    // simulate periodic log updates (every 10 seconds)
    const intervalId = setInterval(() => {
      console.log('[LogViewer] Fetching new logs from blockchain...');
      fetchLogs();
    }, 10000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="space-y-2 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Transaction Logs</h2>
        <button 
          className="px-3 py-1.5 bg-input hover:bg-input/80 text-white rounded-lg transition-colors flex items-center gap-2 text-sm"
          onClick={() => {
            setLoading(true);
            matchingEngine.fetchTEELogs().then(setLogs).finally(() => setLoading(false));
          }}
        >
          <RefreshCcw className="w-4 h-4" />
          Refresh
        </button>
      </div>
      {loading ? (
        <div className="text-center py-4">Loading logs...</div>
      ) : (
        <div className="space-y-2">
          {logs.map((log, index) => (
            <LogEntry
              key={index}
              time={log.time}
              type={log.type}
              message={log.message}
            />
          ))}
        </div>
      )}
    </div>
  );
}
  