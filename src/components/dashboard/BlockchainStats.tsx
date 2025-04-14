
import { StatusCard } from "./StatusCard";
import { Activity, Clock, CpuIcon, Database, Server, Users } from "lucide-react";

export function BlockchainStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <StatusCard
        title="Network Status"
        value="Online"
        icon={<Activity className="h-4 w-4 text-status-online" />}
        description="POHPOS Consensus Active"
        className="border-l-4 border-status-online"
      />
      <StatusCard
        title="Block Height"
        value="5,432,109"
        icon={<Database className="h-4 w-4" />}
        description="Last block: 3s ago"
        trend={{ value: 12.3, isPositive: true }}
      />
      <StatusCard
        title="Block Time"
        value="400ms"
        icon={<Clock className="h-4 w-4" />}
        description="Avg. over last 100 blocks"
        trend={{ value: 5.2, isPositive: true }}
      />
      <StatusCard
        title="Active Validators"
        value="612"
        icon={<Server className="h-4 w-4" />}
        description="98.7% uptime"
        trend={{ value: 3.1, isPositive: true }}
      />
      <StatusCard
        title="VMIA Docker Nodes"
        value="1,253"
        icon={<CpuIcon className="h-4 w-4" />}
        description="Contributing compute power"
        trend={{ value: 15.8, isPositive: true }}
      />
      <StatusCard
        title="Total Users"
        value="84,291"
        icon={<Users className="h-4 w-4" />}
        description="Unique wallet addresses"
        trend={{ value: 7.2, isPositive: true }}
      />
    </div>
  );
}
