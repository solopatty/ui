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
    <div className="max-w-md w-full space-y-4">
      <div className="bg-gradient-to-br from-[#F6411B]/5 to-blue-500/5 rounded-3xl p-5 shadow-lg border border-[#F6411B]/20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[#F6411B] text-lg font-bold">Transaction Logs</h2>
          <button 
            className="px-3 py-1.5 bg-gradient-to-r from-[#F6411B]/10 to-blue-500/10 hover:from-[#F6411B]/20 hover:to-blue-500/20 text-[#F6411B] rounded-xl transition-all flex items-center gap-2 text-sm border border-[#F6411B]/20 hover:border-blue-500/20"
            onClick={() => {
              setLoading(true);
              matchingEngine.fetchTEELogs().then(setLogs).finally(() => setLoading(false));
            }}
          >
            <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            {!loading && 'Refresh'}
          </button>
        </div>
        <div className="h-[400px] overflow-y-auto">
          {!loading && (
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
      </div>
    </div>
  );
}
  