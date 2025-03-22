function LogEntry({
    time,
    type,
    message,
  }: { time: string; type: "SUCCESS" | "INFO" | "WARNING" | "ERROR"; message: string }) {
    const getTypeColor = () => {
      switch (type) {
        case "SUCCESS":
          return "bg-green-500"
        case "INFO":
          return "bg-primary"
        case "WARNING":
          return "bg-yellow-500"
        case "ERROR":
          return "bg-red-500"
        default:
          return "bg-primary"
      }
    }
  
    const getTypeTextColor = () => {
      switch (type) {
        case "SUCCESS":
          return "text-green-500"
        case "INFO":
          return "text-primary"
        case "WARNING":
          return "text-yellow-500"
        case "ERROR":
          return "text-red-500"
        default:
          return "text-primary"
      }
    }
  
    const getBgColor = () => {
      switch (type) {
        case "SUCCESS":
          return "bg-green-500/10"
        case "INFO":
          return "bg-primary/10"
        case "WARNING":
          return "bg-yellow-500/10"
        case "ERROR":
          return "bg-red-500/10"
        default:
          return "bg-primary/10"
      }
    }
  
    return (
      <div className={`rounded-lg ${getBgColor()} overflow-hidden flex`}>
        <div className={`${getTypeColor()} w-1`}></div>
        <div className="p-3 w-full">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-card-foreground/60 font-mono">{time}</span>
            <span className={`text-xs font-bold ${getTypeTextColor()}`}>{type}</span>
          </div>
          <p className="text-sm text-card-foreground">{message}</p>
        </div>
      </div>
    )
  }