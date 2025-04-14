
import DashboardLayout from "@/components/layout/DashboardLayout";
import { RecentBlocks } from "@/components/dashboard/RecentBlocks";
import { NetworkActivity } from "@/components/dashboard/NetworkActivity";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const BlockchainPage = () => {
  // Mock transaction data
  const transactions = [
    { hash: "0xabc123...", from: "wallet5.cosmic", to: "wallet8.cosmic", amount: "12.5 CNX", time: "2m ago", status: "confirmed" },
    { hash: "0xdef456...", from: "wallet2.cosmic", to: "validator4.cosmic", amount: "50.0 CNX", time: "5m ago", status: "confirmed" },
    { hash: "0xghi789...", from: "wallet9.cosmic", to: "wallet1.cosmic", amount: "3.25 CNX", time: "8m ago", status: "confirmed" },
    { hash: "0xjkl012...", from: "validator7.cosmic", to: "wallet7.cosmic", amount: "21.7 CNX", time: "12m ago", status: "confirmed" },
    { hash: "0xmno345...", from: "wallet3.cosmic", to: "validator9.cosmic", amount: "100.0 CNX", time: "18m ago", status: "confirmed" },
  ];

  // Mock consensus statistics
  const consensusStats = [
    { type: "Proof of History (POH)", blocks: "62%", validators: "312", avgTime: "380ms" },
    { type: "Proof of Stake (POS)", blocks: "28%", validators: "251", avgTime: "450ms" },
    { type: "VMIA (POW)", blocks: "10%", validators: "49", avgTime: "520ms" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blockchain Explorer</h1>
          <p className="text-muted-foreground">
            Monitor blocks, transactions, and consensus
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="blocks">Blocks</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="consensus">Consensus</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <NetworkActivity />
            <RecentBlocks />
          </TabsContent>
          
          <TabsContent value="blocks" className="space-y-4">
            <RecentBlocks />
          </TabsContent>
          
          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Latest transactions on the Cosmic Nexus blockchain</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction Hash</TableHead>
                      <TableHead>From</TableHead>
                      <TableHead>To</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((tx, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-mono text-xs">{tx.hash}</TableCell>
                        <TableCell>{tx.from}</TableCell>
                        <TableCell>{tx.to}</TableCell>
                        <TableCell>{tx.amount}</TableCell>
                        <TableCell>{tx.time}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-status-online/10 text-status-online border-status-online/20">
                            {tx.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="consensus" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Consensus Mechanism</CardTitle>
                <CardDescription>POHPOS + VMIA Hybrid Consensus Statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Block Share</TableHead>
                      <TableHead>Validators</TableHead>
                      <TableHead>Avg. Block Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {consensusStats.map((stat, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{stat.type}</TableCell>
                        <TableCell>{stat.blocks}</TableCell>
                        <TableCell>{stat.validators}</TableCell>
                        <TableCell>{stat.avgTime}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default BlockchainPage;
