
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { DockerNodes } from "@/components/dashboard/DockerNodes";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Container, Plus, RefreshCcw, PlayCircle, StopCircle } from "lucide-react";

const DockerPage = () => {
  // Mock Docker container data
  const containerTypes = [
    { name: 'AI Processing', count: 430, color: 'hsl(var(--primary))' },
    { name: 'Smart Contract Execution', count: 308, color: 'hsl(var(--secondary))' },
    { name: 'Data Validation', count: 254, color: 'hsl(var(--accent))' },
    { name: 'Storage Nodes', count: 182, color: 'hsl(var(--destructive))' },
    { name: 'Networking', count: 79, color: 'hsl(var(--muted-foreground))' },
  ];

  // Mock performance data over time
  const performanceData = [
    { time: '00:00', ops: 5400, containers: 1100 },
    { time: '04:00', ops: 6200, containers: 1150 },
    { time: '08:00', ops: 7100, containers: 1230 },
    { time: '12:00', ops: 7500, containers: 1253 },
    { time: '16:00', ops: 7200, containers: 1240 },
    { time: '20:00', ops: 6800, containers: 1220 },
    { time: '24:00', ops: 6100, containers: 1180 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Docker VMIA</h1>
            <p className="text-muted-foreground">
              Virtual Machine for IA running on Docker containers
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            <span>Deploy New Container</span>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Active Containers</CardTitle>
              <CardDescription>Total Docker VMIA containers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">1,253</div>
              <div className="mt-4 space-y-2">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Network Capacity</span>
                    <span>78.3%</span>
                  </div>
                  <Progress value={78.3} className="h-1" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Processing Power</CardTitle>
              <CardDescription>Total compute available</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">9.8 PFLOPS</div>
              <div className="mt-4 space-y-2">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Utilization</span>
                    <span>92.7%</span>
                  </div>
                  <Progress value={92.7} className="h-1" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Rewards Pool</CardTitle>
              <CardDescription>Available for distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">278,456 CNX</div>
              <div className="mt-4 space-y-2">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Daily Distribution</span>
                    <span>18,345 CNX</span>
                  </div>
                  <Progress value={65.8} className="h-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>VMIA Performance</CardTitle>
            <CardDescription>Operations per second and active containers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={performanceData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="time" className="text-muted-foreground text-xs" />
                  <YAxis yAxisId="left" className="text-muted-foreground text-xs" />
                  <YAxis yAxisId="right" orientation="right" className="text-muted-foreground text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      borderColor: 'hsl(var(--border))',
                      color: 'hsl(var(--card-foreground))'
                    }} 
                  />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="ops" 
                    name="Operations/sec" 
                    stroke="hsl(var(--primary))" 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="containers" 
                    name="Active Containers" 
                    stroke="hsl(var(--secondary))" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="containers" className="space-y-4">
          <TabsList>
            <TabsTrigger value="containers">Container Types</TabsTrigger>
            <TabsTrigger value="active">Active Nodes</TabsTrigger>
            <TabsTrigger value="management">Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="containers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>VMIA Container Workloads</CardTitle>
                <CardDescription>Distribution by container function</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={containerTypes}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="name" className="text-muted-foreground text-xs" />
                      <YAxis className="text-muted-foreground text-xs" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          borderColor: 'hsl(var(--border))',
                          color: 'hsl(var(--card-foreground))'
                        }} 
                      />
                      <Bar dataKey="count" name="Containers" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="active" className="space-y-4">
            <DockerNodes />
          </TabsContent>
          
          <TabsContent value="management" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Container Management</CardTitle>
                <CardDescription>Deploy and manage Docker VMIA containers</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Container ID</TableHead>
                      <TableHead>Image</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Workload</TableHead>
                      <TableHead>Host</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-mono text-xs">7f3a9bd2c...</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Container className="h-4 w-4" />
                        <span>cosmic/vmia-ai:latest</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-status-online/10 text-status-online border-status-online/20">
                          Running
                        </Badge>
                      </TableCell>
                      <TableCell>AI Processing</TableCell>
                      <TableCell>us-east-cluster-1</TableCell>
                      <TableCell className="flex space-x-2">
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <RefreshCcw className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <StopCircle className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-xs">2e1b8ac5d...</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Container className="h-4 w-4" />
                        <span>cosmic/vmia-contract:latest</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-status-idle/10 text-status-idle border-status-idle/20">
                          Idle
                        </Badge>
                      </TableCell>
                      <TableCell>Smart Contract Execution</TableCell>
                      <TableCell>eu-west-cluster-3</TableCell>
                      <TableCell className="flex space-x-2">
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <RefreshCcw className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <PlayCircle className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-xs">9c4f2d1e8...</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Container className="h-4 w-4" />
                        <span>cosmic/vmia-storage:latest</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-status-offline/10 text-status-offline border-status-offline/20">
                          Stopped
                        </Badge>
                      </TableCell>
                      <TableCell>Storage Nodes</TableCell>
                      <TableCell>ap-south-cluster-2</TableCell>
                      <TableCell className="flex space-x-2">
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <RefreshCcw className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <PlayCircle className="h-4 w-4" />
                        </Button>
                      </TableCell>
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

export default DockerPage;
