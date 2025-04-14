
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Terminal as TerminalIcon, Send } from "lucide-react";

interface LogEntry {
  id: number;
  text: string;
  type: "input" | "output" | "error" | "success";
}

export function CliTerminal() {
  const [command, setCommand] = useState("");
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: 1, text: "Welcome to Cosmic Nexus CLI", type: "output" },
    { id: 2, text: "Type 'help' to see available commands", type: "output" },
  ]);

  const executeCommand = () => {
    if (!command.trim()) return;
    
    // Add the command to the logs
    const newLogId = logs.length > 0 ? Math.max(...logs.map(log => log.id)) + 1 : 1;
    setLogs([...logs, { id: newLogId, text: command, type: "input" }]);
    
    // Process command and generate response
    let response: LogEntry | null = null;
    
    if (command === "help") {
      response = {
        id: newLogId + 1,
        text: "Available commands:\nstatus - Check blockchain status\nbalance - Check wallet balance\nnode list - List active nodes\ndocker stats - Show Docker VMIA statistics\nversion - Show version information",
        type: "output"
      };
    } else if (command === "status") {
      response = {
        id: newLogId + 1,
        text: "✅ Blockchain Status: Online\n⚡ Consensus: POHPOS Active\n📊 Current TPS: 2,483\n🧮 Block Height: 5,432,109\n⏱ Block Time: 400ms\n🖥 Active Validators: 612",
        type: "success"
      };
    } else if (command === "balance") {
      response = {
        id: newLogId + 1,
        text: "💰 Account: admin.cosmic\n📈 Balance: 23,541.89 CNX\n📉 Staked: 10,000 CNX\n🔄 Rewards pending: 152.77 CNX",
        type: "output"
      };
    } else if (command === "node list") {
      response = {
        id: newLogId + 1,
        text: "Active Nodes:\n🟢 validator1.cosmic: POS\n🟢 validator4.cosmic: POH\n🟢 validator7.cosmic: POH\n🟢 validator9.cosmic: POS\n🟢 validator12.cosmic: POS\n... and 607 more validators",
        type: "output"
      };
    } else if (command === "docker stats") {
      response = {
        id: newLogId + 1,
        text: "🐳 VMIA Docker Statistics:\n📊 Active Containers: 1,253\n⚡ Total Compute: 9.8 PFLOPS\n🧮 Operations: 7.2M ops/sec\n💰 Rewards distributed (24h): 18,345 CNX",
        type: "output"
      };
    } else if (command === "version") {
      response = {
        id: newLogId + 1,
        text: "Cosmic Nexus v0.9.2-alpha\nPOHPOS Consensus Engine v1.2.3\nVMIA Docker Integration v0.8.5\nAdmin Dashboard v0.7.1",
        type: "output"
      };
    } else {
      response = {
        id: newLogId + 1,
        text: `Error: Unknown command '${command}'. Type 'help' for available commands.`,
        type: "error"
      };
    }
    
    if (response) {
      setLogs(logs => [...logs, response!]);
    }
    
    setCommand("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand();
    }
  };

  return (
    <Card className="col-span-1">
      <CardHeader>
        <div className="flex items-center">
          <TerminalIcon className="mr-2 h-4 w-4 text-primary" />
          <CardTitle>CLI Terminal</CardTitle>
        </div>
        <CardDescription>Interact with the Cosmic Nexus blockchain</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[220px] space-y-4">
          <div className="h-44 rounded-md bg-black/90 font-mono text-xs text-green-400 p-2 overflow-y-auto">
            {logs.map((log) => (
              <div key={log.id} className="mb-1">
                {log.type === "input" ? (
                  <div>
                    <span className="text-secondary mr-1">$</span>
                    <span>{log.text}</span>
                  </div>
                ) : (
                  <div className={`whitespace-pre-line ${
                    log.type === "error" 
                      ? "text-destructive" 
                      : log.type === "success" 
                        ? "text-status-online" 
                        : "text-nebula-200"
                  }`}>
                    {log.text}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Enter command..."
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              className="font-mono text-sm"
            />
            <Button size="icon" onClick={executeCommand}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
