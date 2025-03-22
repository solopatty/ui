export interface LogEntry {
  time: string;
  type: "SUCCESS" | "INFO" | "WARNING" | "ERROR";
  message: string;
}

const mockLogs: LogEntry[] = [
  {
    time: "2024-03-20 10:00:00",
    type: "INFO",
    message: "Intent sent to matching engine",
  },
  {
    time: "2024-03-20 10:00:05",
    type: "SUCCESS",
    message: "Token deposited successfully",
  },
  {
    time: "2024-03-20 10:00:10",
    type: "INFO",
    message: "New balance state received",
  },
  {
    time: "2024-03-20 10:00:15",
    type: "WARNING",
    message: "No match found in current pool",
  },
  {
    time: "2024-03-20 10:00:20",
    type: "SUCCESS",
    message: "Successfully swapped 1 BNB for 237.777 CAKE",
  },
  {
    time: "2024-03-20 10:00:25",
    type: "INFO",
    message: "Ready to withdraw funds",
  },
  {
    time: "2024-03-20 10:00:30",
    type: "ERROR",
    message: "Transaction failed: Insufficient gas",
  },
  {
    time: "2024-03-20 10:00:35",
    type: "SUCCESS",
    message: "Transaction retried successfully",
  },
];

export const matchingEngine = {
  fetchTEELogs: async (): Promise<LogEntry[]> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockLogs;
  },
};
