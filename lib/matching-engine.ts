export interface LogEntry {
  time: string;
  type: "SUCCESS" | "INFO" | "WARNING" | "ERROR";
  message: string;
}

class MatchingEngine {
  private logs: LogEntry[] = [];
  private subscribers: ((logs: LogEntry[]) => void)[] = [];

  private addLog(type: LogEntry["type"], message: string) {
    const time = new Date().toLocaleTimeString();
    const newLog = { time, type, message };
    console.log("[MatchingEngine] Adding new log:", newLog);
    this.logs = [newLog, ...this.logs]; // Create new array to trigger React update
    // Keep only last 50 logs
    if (this.logs.length > 50) {
      this.logs = this.logs.slice(0, 50);
    }
    // Notify all subscribers
    this.notifySubscribers();
  }

  private notifySubscribers() {
    console.log("[MatchingEngine] Notifying subscribers. Count:", this.subscribers.length);
    const currentLogs = [...this.logs]; // Create a copy of the logs array
    this.subscribers.forEach(callback => {
      console.log("[MatchingEngine] Calling subscriber with logs:", currentLogs);
      callback(currentLogs);
    });
  }

  subscribeToLogs(callback: (logs: LogEntry[]) => void) {
    console.log("[MatchingEngine] New subscriber added");
    this.subscribers.push(callback);
    // Immediately send current logs to new subscriber
    callback([...this.logs]);
    // Return unsubscribe function
    return () => {
      console.log("[MatchingEngine] Subscriber removed");
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  async fetchTEELogs(): Promise<LogEntry[]> {
    console.log("[MatchingEngine] Fetching logs:", this.logs);
    return [...this.logs]; // Return a copy of the logs array
  }

  // Mock functions for different stages
  async initiateDeposit(txHash: string) {
    this.addLog("INFO", `Transaction initiated: ${txHash}`);
    this.addLog("INFO", "Waiting for deposit confirmation...");
  }

  async depositConfirmed() {
    this.addLog("SUCCESS", "Deposit confirmed!");
    this.addLog("INFO", "Submitting intents to TEE...");
  }

  async intentsSubmitted() {
    this.addLog("SUCCESS", "Intents submitted successfully");
    this.addLog("INFO", "Waiting for matches...");
  }

  async matchesFound() {
    this.addLog("SUCCESS", "Matches found!");
    this.addLog("INFO", "Preparing to send tokens...");
  }

  async tokensSent() {
    this.addLog("SUCCESS", "Tokens sent successfully!");
    this.addLog("INFO", "Swap completed!");
  }

  async depositFailed(error: string) {
    this.addLog("ERROR", `Deposit failed: ${error}`);
  }

  async matchFailed(error: string) {
    this.addLog("ERROR", `Match failed: ${error}`);
  }
}

export const matchingEngine = new MatchingEngine();
