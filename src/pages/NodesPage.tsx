
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const NodesPage = () => {
  const validatorNodes = [
    { id: "val-1", name: "validator1.cosmic", status: "online", type: "POS", stake: "250,000 CNX", blocks: 1245, uptime: "99.98%" },
    { id: "val-2", name: "validator4.cosmic", status: "online", type: "POH", stake: "180,000 CNX", blocks: 987, uptime: "100%" },
    { id: "val-3", name: "validator7.cosmic", status: "online", type: "POH", stake: "320,000 CNX", blocks: 1502, uptime: "99.92%" },
    { id: "val-4", name: "validator9.cosmic", status: "online", type: "POS", stake: "140,000 CNX", blocks: 765, uptime: "99.87%" },
    { id: "val-5", name: "validator12.cosmic", status: "online", type: "POS", stake: "210,000 CNX", blocks: 1189, uptime: "99.95%" },
  ];

  const validatorDistribution = [
    { name: 'POH Validators', value: 312, color: 'hsl(var(--primary))' },
    { name: 'POS Validators', value: 251, color: 'hsl(var(--secondary))' },
    { name: 'VMIA Nodes', value: 49, color: 'hsl(var(--accent))' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "online":
        return <Badge variant="outline" className="bg-status-online/10 text-status-online border-status-online/20">Online</Badge>;
      case "offline":
        return <Badge variant="outline" className="bg-status-offline/10 text-status-offline border-status-offline/20">Offline</Badge>;
      case "syncing":
        return <Badge variant="outline" className="bg-status-idle/10 text-status-idle border-status-idle/20">Syncing</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "POH":
        return <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">POH</Badge>;
      case "POS":
        return <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">POS</Badge>;
      case "VMIA":
        return <Badge variant="outline" className="bg-accent/10 text-accent-foreground border-accent/20">VMIA</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Node Management</h1>
          <p className="text-muted-foreground">
            Monitor and manage network validators and VMIA nodes
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total Nodes</CardTitle>
              <CardDescription>Active validators and VMIA nodes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">612</div>
              <div className="mt-4 space-y-2">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Network Health</span>
                    <span>98.7%</span>
                  </div>
                  <Progress value={98.7} className="h-1" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-2">
            <CardHeader className="pb-2">
              <CardTitle>Node Distribution</CardTitle>
              <CardDescription>By consensus type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={validatorDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={70}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {validatorDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        borderColor: 'hsl(var(--border))',
                        color: 'hsl(var(--card-foreground))'
                      }} 
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="validators" className="space-y-4">
          <TabsList>
            <TabsTrigger value="validators">Validators</TabsTrigger>
            <TabsTrigger value="vmia">VMIA Nodes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="validators" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Validators</CardTitle>
                <CardDescription>Nodes participating in POHPOS consensus</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Node Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Stake</TableHead>
                      <TableHead>Blocks Produced</TableHead>
                      <TableHead>Uptime</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {validatorNodes.map((node) => (
                      <TableRow key={node.id}>
                        <TableCell className="font-medium">{node.name}</TableCell>
                        <TableCell>{getStatusBadge(node.status)}</TableCell>
                        <TableCell>{getTypeBadge(node.type)}</TableCell>
                        <TableCell>{node.stake}</TableCell>
                        <TableCell>{node.blocks}</TableCell>
                        <TableCell>{node.uptime}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="vmia" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>VMIA Docker Nodes</CardTitle>
                <CardDescription>Nodes providing computational resources to the network</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Node Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>CPU Usage</TableHead>
                      <TableHead>Memory</TableHead>
                      <TableHead>Rewards (24h)</TableHead>
                      <TableHead>Uptime</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">VMIA-Node-Alpha</TableCell>
                      <TableCell>{getStatusBadge("online")}</TableCell>
                      <TableCell>78%</TableCell>
                      <TableCell>62%</TableCell>
                      <TableCell>12.45 CNX</TableCell>
                      <TableCell>99.8%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">VMIA-Node-Beta</TableCell>
                      <TableCell>{getStatusBadge("online")}</TableCell>
                      <TableCell>92%</TableCell>
                      <TableCell>85%</TableCell>
                      <TableCell>15.72 CNX</TableCell>
                      <TableCell>100%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">VMIA-Node-Gamma</TableCell>
                      <TableCell>{getStatusBadge("syncing")}</TableCell>
                      <TableCell>23%</TableCell>
                      <TableCell>37%</TableCell>
                      <TableCell>4.18 CNX</TableCell>
                      <TableCell>97.3%</TableCell>
                    </TableRow>
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

export default NodesPage;
