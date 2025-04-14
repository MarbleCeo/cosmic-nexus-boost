
import { StatusCard } from "./StatusCard";
import { Activity, Clock, CpuIcon, Database, Server, Users } from "lucide-react";
import { useNetworkStats } from "@/hooks/useBlockchainData";

export function BlockchainStats() {
  const { data: stats, isLoading, error } = useNetworkStats();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array(6).fill(0).map((_, i) => (
          <div key={i} className="h-32 rounded-lg bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatusCard
          title="Error"
          value="Failed to load stats"
          icon={<Activity className="h-4 w-4 text-destructive" />}
          description="Please try again later"
          className="border-l-4 border-destructive col-span-full"
        />
      </div>
    );
  }

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
        value={stats.blockHeight.toLocaleString()}
        icon={<Database className="h-4 w-4" />}
        description={`Last block: ${stats.blockTime}ms`}
        trend={{ value: 12.3, isPositive: true }}
      />
      <StatusCard
        title="Block Time"
        value={`${stats.blockTime}ms`}
        icon={<Clock className="h-4 w-4" />}
        description="Avg. over last 100 blocks"
        trend={{ value: 5.2, isPositive: true }}
      />
      <StatusCard
        title="Active Validators"
        value={stats.activeValidators.toLocaleString()}
        icon={<Server className="h-4 w-4" />}
        description="98.7% uptime"
        trend={{ value: 3.1, isPositive: true }}
      />
      <StatusCard
        title="VMIA Docker Nodes"
        value={stats.vmiaNodes.toLocaleString()}
        icon={<CpuIcon className="h-4 w-4" />}
        description="Contributing compute power"
        trend={{ value: 15.8, isPositive: true }}
      />
      <StatusCard
        title="Total Users"
        value={stats.totalUsers.toLocaleString()}
        icon={<Users className="h-4 w-4" />}
        description="Unique wallet addresses"
        trend={{ value: 7.2, isPositive: true }}
      />
    </div>
  );
}
