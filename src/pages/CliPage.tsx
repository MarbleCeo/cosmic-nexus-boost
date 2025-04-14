
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Terminal as TerminalIcon, Send, Clock, Copy, BookOpen } from "lucide-react";

interface LogEntry {
  id: number;
  text: string;
  type: "input" | "output" | "error" | "success";
  timestamp?: string;
}

const CliPage = () => {
  const [command, setCommand] = useState("");
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: 1, text: " ██████╗ ██████╗ ███████╗███╗   ███╗██╗ ██████╗    ███╗   ██╗███████╗██╗  ██╗██╗   ██╗███████╗\n██╔════╝██╔═══██╗██╔════╝████╗ ████║██║██╔════╝    ████╗  ██║██╔════╝╚██╗██╔╝██║   ██║██╔════╝\n██║     ██║   ██║███████╗██╔████╔██║██║██║         ██╔██╗ ██║█████╗   ╚███╔╝ ██║   ██║███████╗\n██║     ██║   ██║╚════██║██║╚██╔╝██║██║██║         ██║╚██╗██║██╔══╝   ██╔██╗ ██║   ██║╚════██║\n╚██████╗╚██████╔╝███████║██║ ╚═╝ ██║██║╚██████╗    ██║ ╚████║███████╗██╔╝ ██╗╚██████╔╝███████║\n ╚═════╝ ╚═════╝ ╚══════╝╚═╝     ╚═╝╚═╝ ╚═════╝    ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝", type: "output" },
    { id: 2, text: "Welcome to Cosmic Nexus CLI v0.9.2-alpha", type: "output" },
    { id: 3, text: "Type 'help' to see available commands", type: "output" },
  ]);
  
  const [commandHistory, setCommandHistory] = useState<string[]>([
    "help",
    "status",
    "node list",
    "docker stats",
    "balance"
  ]);

  const getCurrentTimestamp = () => {
    const now = new Date();
    return now.toLocaleTimeString();
  };

  const executeCommand = () => {
    if (!command.trim()) return;
    
    // Add the command to history
    setCommandHistory([command, ...commandHistory].slice(0, 20));
    
    // Add the command to the logs
    const newLogId = logs.length > 0 ? Math.max(...logs.map(log => log.id)) + 1 : 1;
    const timestamp = getCurrentTimestamp();
    
    setLogs([...logs, { 
      id: newLogId, 
      text: command,
      type: "input",
      timestamp
    }]);
    
    // Process command and generate response
    let response: LogEntry | null = null;
    
    if (command === "help") {
      response = {
        id: newLogId + 1,
        text: "Available commands:\n\nBLOCKCHAIN COMMANDS:\n  status - Check blockchain status\n  block <height> - Get block details\n  tx <hash> - Get transaction details\n\nACCOUNT COMMANDS:\n  balance - Check wallet balance\n  transfer <amount> <recipient> - Transfer tokens\n  stake <amount> - Stake tokens\n\nNODE COMMANDS:\n  node list - List active nodes\n  node info <id> - Get node details\n  node register - Register new validator\n\nDOCKER COMMANDS:\n  docker stats - Show Docker VMIA statistics\n  docker list - List all containers\n  docker deploy <image> - Deploy new container\n\nSYSTEM COMMANDS:\n  version - Show version information\n  clear - Clear console\n  exit - Exit CLI",
        type: "output",
        timestamp
      };
    } else if (command === "status") {
      response = {
        id: newLogId + 1,
        text: "✅ Blockchain Status: Online\n⚡ Consensus: POHPOS Active\n📊 Current TPS: 2,483\n🧮 Block Height: 5,432,109\n⏱ Block Time: 400ms\n🖥 Active Validators: 612\n🐳 VMIA Nodes: 1,253\n💾 Storage Size: 8.2 TB\n🔄 Last Updated: Just now",
        type: "success",
        timestamp
      };
    } else if (command === "balance") {
      response = {
        id: newLogId + 1,
        text: "💰 Account: admin.cosmic\n📈 Balance: 23,541.89 CNX\n📉 Staked: 10,000 CNX\n🔄 Rewards pending: 152.77 CNX\n\nToken values:\n1 CNX = 12.45 USDT\n1 CNX = 0.00042 BTC\n1 CNX = 0.0078 ETH",
        type: "output",
        timestamp
      };
    } else if (command === "node list") {
      response = {
        id: newLogId + 1,
        text: "Active Validators:\n\nID     | Name               | Type | Stake (CNX) | Uptime\n-------|--------------------| -----|------------|--------\nval-1  | validator1.cosmic  | POS  | 250,000    | 99.98%\nval-4  | validator4.cosmic  | POH  | 180,000    | 100.00%\nval-7  | validator7.cosmic  | POH  | 320,000    | 99.92%\nval-9  | validator9.cosmic  | POS  | 140,000    | 99.87%\nval-12 | validator12.cosmic | POS  | 210,000    | 99.95%\n\n...and 607 more validators (use 'node list --all' to see full list)",
        type: "output",
        timestamp
      };
    } else if (command === "docker stats") {
      response = {
        id: newLogId + 1,
        text: "🐳 VMIA Docker Statistics:\n\n📊 Active Containers: 1,253\n⚡ Total Compute: 9.8 PFLOPS\n🧮 Operations: 7.2M ops/sec\n💾 Storage: 12.4 PB\n🔄 Network: 342 Gbps\n\nContainer Types:\n- AI Processing: 430 (34.3%)\n- Smart Contract Execution: 308 (24.6%)\n- Data Validation: 254 (20.3%)\n- Storage Nodes: 182 (14.5%)\n- Networking: 79 (6.3%)\n\n💰 Rewards distributed (24h): 18,345 CNX",
        type: "output",
        timestamp
      };
    } else if (command === "version") {
      response = {
        id: newLogId + 1,
        text: "Cosmic Nexus v0.9.2-alpha\nPOHPOS Consensus Engine v1.2.3\nVMIA Docker Integration v0.8.5\nAdmin Dashboard v0.7.1\nCLI Interface v0.9.0",
        type: "output",
        timestamp
      };
    } else if (command === "clear") {
      setLogs([
        { id: 1, text: "Cosmic Nexus CLI v0.9.2-alpha", type: "output" },
        { id: 2, text: "Type 'help' to see available commands", type: "output" }
      ]);
      setCommand("");
      return;
    } else if (command.startsWith("block ")) {
      const blockHeight = command.split(" ")[1];
      response = {
        id: newLogId + 1,
        text: `Block #${blockHeight}\n\nHash: 0x7f92ab5b3f5c4e79a45e7b82aec9c5617bd9a9c7e8b4e2d5a6b8c9d0e1f2a3b4\nTimestamp: ${new Date().toISOString()}\nTransactions: 1267\nSize: 1.2 MB\nProposer: validator4.cosmic\nConsensus: POH\nSignatures: 582/612\n\nUse 'tx list ${blockHeight}' to view transactions in this block`,
        type: "output",
        timestamp
      };
    } else if (command.startsWith("node info ")) {
      const nodeId = command.split(" ")[2];
      response = {
        id: newLogId + 1,
        text: `Node Information for ${nodeId}\n\nName: validator${nodeId}.cosmic\nStatus: Online\nType: POH\nStake: 180,000 CNX\nUptime: 100.00%\nBlocks Produced: 987\nVersion: v0.9.2-alpha\nIP: 10.0.X.X (hidden)\nRegion: us-east\nJoined: 2023-12-15`,
        type: "output",
        timestamp
      };
    } else {
      response = {
        id: newLogId + 1,
        text: `Error: Unknown command '${command}'. Type 'help' for available commands.`,
        type: "error",
        timestamp
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
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Command Line Interface</h1>
            <p className="text-muted-foreground">
              Interact directly with the Cosmic Nexus blockchain
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" className="gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Documentation</span>
            </Button>
            <Button variant="outline" className="gap-2">
              <Copy className="h-4 w-4" />
              <span>Copy Output</span>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card className="md:col-span-3">
            <CardHeader>
              <div className="flex items-center">
                <TerminalIcon className="mr-2 h-4 w-4 text-primary" />
                <CardTitle>Terminal</CardTitle>
              </div>
              <CardDescription>Cosmic Nexus CLI v0.9.2-alpha</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-[600px] rounded-md bg-black/95 font-mono text-xs text-green-400 p-3 overflow-y-auto">
                  {logs.map((log) => (
                    <div key={log.id} className="mb-1.5">
                      {log.type === "input" ? (
                        <div>
                          <span className="text-muted-foreground text-xs mr-1">[{log.timestamp}]</span>
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
                          {log.timestamp && <span className="text-muted-foreground text-xs mr-1">[{log.timestamp}]</span>}
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

          <Card>
            <CardHeader>
              <CardTitle>Command History</CardTitle>
              <CardDescription>Recently used commands</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <Clock className="h-3 w-3" />
                      </TableHead>
                      <TableHead>Command</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {commandHistory.map((cmd, idx) => (
                      <TableRow key={idx} className="cursor-pointer hover:bg-muted" onClick={() => setCommand(cmd)}>
                        <TableCell>
                          <Badge variant="outline" className="h-5 w-5 p-0 flex items-center justify-center">
                            {idx + 1}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-xs">{cmd}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CliPage;
