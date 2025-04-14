
import DashboardLayout from "@/components/layout/DashboardLayout";
import { BlockchainStats } from "@/components/dashboard/BlockchainStats";
import { NetworkActivity } from "@/components/dashboard/NetworkActivity";
import { RecentBlocks } from "@/components/dashboard/RecentBlocks";
import { DockerNodes } from "@/components/dashboard/DockerNodes";
import { DexOverview } from "@/components/dashboard/DexOverview";
import { CliTerminal } from "@/components/dashboard/CliTerminal";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Cosmic Nexus Blockchain - Admin Control Center
          </p>
        </div>

        <BlockchainStats />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <NetworkActivity />
          <DexOverview />
          <CliTerminal />
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <RecentBlocks />
          <DockerNodes />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
