
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CpuIcon, Database, HardDrive, Layers, Server } from "lucide-react";

export function VmiaClientStats() {
  // This would be replaced with actual data fetched from the Docker VMIA client
  const vmiaStats = {
    status: "active",
    uptime: "3 days, 7 hours",
    containers: 2,
    cpu: 72,
    memory: 45,
    storage: 28,
    rewardsToday: "12.45",
    rewardsTotal: "487.32",
    tasksCompleted: 1243,
    networkContribution: "2.1%"
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>VMIA Docker Client</CardTitle>
            <CardDescription>Your machine's contribution to the Cosmic Network</CardDescription>
          </div>
          <Badge className={vmiaStats.status === "active" ? "bg-status-online" : "bg-status-offline"}>
            {vmiaStats.status === "active" ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1">
                <CpuIcon className="h-3.5 w-3.5" />
                CPU Usage
              </span>
              <span>{vmiaStats.cpu}%</span>
            </div>
            <Progress value={vmiaStats.cpu} />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1">
                <Database className="h-3.5 w-3.5" />
                Memory
              </span>
              <span>{vmiaStats.memory}%</span>
            </div>
            <Progress value={vmiaStats.memory} />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1">
                <HardDrive className="h-3.5 w-3.5" />
                Storage
              </span>
              <span>{vmiaStats.storage}%</span>
            </div>
            <Progress value={vmiaStats.storage} />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1">
                <Layers className="h-3.5 w-3.5" />
                Containers
              </span>
              <span>{vmiaStats.containers}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Server className="h-3 w-3" />
              <span>Uptime: {vmiaStats.uptime}</span>
            </div>
          </div>
        </div>
        
        <div className="pt-2 border-t">
          <h4 className="text-sm font-medium mb-2">Rewards</h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-md bg-muted p-2">
              <div className="text-xs text-muted-foreground">Today</div>
              <div className="font-semibold">{vmiaStats.rewardsToday} CNX</div>
            </div>
            <div className="rounded-md bg-muted p-2">
              <div className="text-xs text-muted-foreground">Total</div>
              <div className="font-semibold">{vmiaStats.rewardsTotal} CNX</div>
            </div>
          </div>
        </div>
        
        <div className="pt-2 border-t">
          <h4 className="text-sm font-medium mb-2">Contribution</h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-md bg-muted p-2">
              <div className="text-xs text-muted-foreground">Tasks Completed</div>
              <div className="font-semibold">{vmiaStats.tasksCompleted}</div>
            </div>
            <div className="rounded-md bg-muted p-2">
              <div className="text-xs text-muted-foreground">Network Share</div>
              <div className="font-semibold">{vmiaStats.networkContribution}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
