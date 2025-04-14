
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Cpu, MemoryStick, HardDrive, Activity } from "lucide-react";

interface DockerNodeProps {
  id: string;
  name: string;
  status: "online" | "offline" | "idle";
  cpu: number;
  memory: number;
  storage: number;
  rewards: string;
  uptime: string;
}

const dockerNodes: DockerNodeProps[] = [
  {
    id: "node-1",
    name: "VMIA-Node-Alpha",
    status: "online",
    cpu: 78,
    memory: 62,
    storage: 43,
    rewards: "12.45 CNX",
    uptime: "99.8%"
  },
  {
    id: "node-2",
    name: "VMIA-Node-Beta",
    status: "online",
    cpu: 92,
    memory: 85,
    storage: 76,
    rewards: "15.72 CNX",
    uptime: "100%"
  },
  {
    id: "node-3",
    name: "VMIA-Node-Gamma",
    status: "idle",
    cpu: 23,
    memory: 37,
    storage: 52,
    rewards: "4.18 CNX",
    uptime: "97.3%"
  },
];

export function DockerNodes() {
  const getStatusBadge = (status: "online" | "offline" | "idle") => {
    switch (status) {
      case "online":
        return (
          <Badge variant="outline" className="bg-status-online/10 text-status-online border-status-online/20">
            Online
          </Badge>
        );
      case "offline":
        return (
          <Badge variant="outline" className="bg-status-offline/10 text-status-offline border-status-offline/20">
            Offline
          </Badge>
        );
      case "idle":
        return (
          <Badge variant="outline" className="bg-status-idle/10 text-status-idle border-status-idle/20">
            Idle
          </Badge>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>VMIA Docker Nodes</CardTitle>
        <CardDescription>Docker nodes contributing compute power to the network</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {dockerNodes.map((node) => (
            <div key={node.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">{node.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Activity className="h-3 w-3" /> 
                    Uptime: {node.uptime} • Rewards: {node.rewards}
                  </div>
                </div>
                {getStatusBadge(node.status)}
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center text-xs">
                    <Cpu className="mr-1 h-3 w-3" /> CPU: {node.cpu}%
                  </div>
                  <Progress value={node.cpu} className="h-1" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-xs">
                    <MemoryStick className="mr-1 h-3 w-3" /> RAM: {node.memory}%
                  </div>
                  <Progress value={node.memory} className="h-1" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-xs">
                    <HardDrive className="mr-1 h-3 w-3" /> Storage: {node.storage}%
                  </div>
                  <Progress value={node.storage} className="h-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
