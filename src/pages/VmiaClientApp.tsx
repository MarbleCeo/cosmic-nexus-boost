
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Upload, Info, Activity, Server, Clock, CpuIcon, MemoryStick, HardDrive } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { useSolflareWallet, useVmiaClientStatus, useTransactions, startVmiaContainer, stopVmiaContainer, useNotifications } from "@/hooks/useBlockchainData";
import { WalletConnect } from "@/components/dex/WalletConnect";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock performance data until real data is available
const performanceData = [
  { time: '00:00', ops: 150, rewards: 0.21 },
  { time: '04:00', ops: 180, rewards: 0.28 },
  { time: '08:00', ops: 220, rewards: 0.35 },
  { time: '12:00', ops: 250, rewards: 0.42 },
  { time: '16:00', ops: 230, rewards: 0.38 },
  { time: '20:00', ops: 200, rewards: 0.32 },
  { time: '24:00', ops: 170, rewards: 0.24 },
];

const VmiaClientApp = () => {
  const { toast } = useToast();
  const { wallet, connected } = useSolflareWallet();
  const { data: vmiaStatus, isLoading: loadingStatus, error: statusError } = useVmiaClientStatus(wallet?.address);
  const { data: transactions, isLoading: loadingTx } = useTransactions(wallet?.address);
  const { data: notifications } = useNotifications(wallet?.address);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [isStopping, setIsStopping] = useState(false);

  const handleDownloadDocker = () => {
    setIsDownloading(true);
    toast({
      title: "Download Started",
      description: "Downloading the VMIA Docker image...",
    });
    
    // Simulate download process
    setTimeout(() => {
      setIsDownloading(false);
      toast({
        title: "Download Complete",
        description: "VMIA Docker image has been downloaded successfully!",
      });
    }, 3000);
  };

  const handleStartDocker = async () => {
    if (!wallet?.address) return;
    
    setIsStarting(true);
    
    try {
      const result = await startVmiaContainer(wallet.address);
      
      if (result.success) {
        toast({
          title: "Docker VMIA Started",
          description: "Your VMIA container is now running and contributing to the network.",
        });
      } else {
        toast({
          title: "Failed to Start Docker",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsStarting(false);
    }
  };

  const handleStopDocker = async () => {
    if (!vmiaStatus?.container?.id) return;
    
    setIsStopping(true);
    
    try {
      const result = await stopVmiaContainer(vmiaStatus.container.id);
      
      if (result.success) {
        toast({
          title: "Docker VMIA Stopped",
          description: "Your VMIA container has been stopped successfully.",
        });
      } else {
        toast({
          title: "Failed to Stop Docker",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsStopping(false);
    }
  };

  if (statusError) {
    toast({
      title: "Connection Error",
      description: "Failed to fetch VMIA client status. Please try again later.",
      variant: "destructive",
    });
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <Server className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Cosmic Nexus Client</h1>
          </div>
          <nav className="flex items-center gap-4">
            <Link to="/" className="text-sm font-medium hover:underline">
              Dashboard
            </Link>
            <Link to="/dex" className="text-sm font-medium hover:underline">
              DEX
            </Link>
          </nav>
        </div>
      </header>

      <main className="container px-4 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">VMIA Client App</h1>
            <p className="text-muted-foreground">
              Contribute computing power to the Cosmic Nexus network and earn CNX tokens
            </p>
          </div>

          {!connected ? (
            <Card className="max-w-md mx-auto">
              <CardHeader className="text-center">
                <CardTitle>Connect Your Wallet</CardTitle>
                <CardDescription>Connect your Solflare wallet to get started with VMIA</CardDescription>
              </CardHeader>
              <CardContent>
                <WalletConnect />
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-12">
              <div className="md:col-span-8 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>VMIA Performance</CardTitle>
                    <CardDescription>Contribution metrics and rewards</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={performanceData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <defs>
                            <linearGradient id="colorOps" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorRewards" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                          <XAxis dataKey="time" className="text-muted-foreground text-xs" />
                          <YAxis className="text-muted-foreground text-xs" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))', 
                              borderColor: 'hsl(var(--border))',
                              color: 'hsl(var(--card-foreground))'
                            }} 
                          />
                          <Area 
                            type="monotone" 
                            dataKey="ops" 
                            name="Operations/sec" 
                            stroke="hsl(var(--primary))" 
                            fillOpacity={1} 
                            fill="url(#colorOps)" 
                            yAxisId={0}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="rewards" 
                            name="CNX Rewards" 
                            stroke="hsl(var(--secondary))" 
                            fillOpacity={1} 
                            fill="url(#colorRewards)" 
                            yAxisId={1}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>VMIA Docker Control</CardTitle>
                    <CardDescription>Manage your Docker container for VMIA operations</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button 
                        className="bg-status-online hover:bg-status-online/90" 
                        onClick={handleStartDocker} 
                        disabled={isStarting || (vmiaStatus?.isRunning || false)}
                      >
                        {isStarting ? "Starting..." : "Start Docker VMIA"}
                      </Button>
                      <Button 
                        variant="destructive" 
                        onClick={handleStopDocker} 
                        disabled={isStopping || !(vmiaStatus?.isRunning || false)}
                      >
                        {isStopping ? "Stopping..." : "Stop Docker VMIA"}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={handleDownloadDocker} 
                        disabled={isDownloading || (vmiaStatus?.isInstalled || false)}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        {isDownloading ? "Downloading..." : vmiaStatus?.isInstalled ? "Already Installed" : "Download VMIA Image"}
                      </Button>
                    </div>

                    <div className="rounded-md bg-muted p-4">
                      <div className="flex items-start gap-2">
                        <Info className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium">Running Docker VMIA</h4>
                          <p className="text-sm text-muted-foreground">
                            Your machine will contribute computing power to the Cosmic Nexus network. 
                            You'll earn CNX tokens based on your contribution. Make sure to keep your 
                            Docker container running and your wallet connected.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Tabs defaultValue="transactions">
                  <TabsList>
                    <TabsTrigger value="transactions">Transactions</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="transactions" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Recent Transactions</CardTitle>
                        <CardDescription>Your recent activity on Cosmic Nexus</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Type</TableHead>
                              <TableHead>Amount</TableHead>
                              <TableHead>Time</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {loadingTx ? (
                              <TableRow>
                                <TableCell colSpan={4} className="text-center py-4">Loading transactions...</TableCell>
                              </TableRow>
                            ) : transactions?.transactions && transactions.transactions.length > 0 ? (
                              transactions.transactions.map((tx) => (
                                <TableRow key={tx.id}>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      {tx.type === "vmia-reward" ? (
                                        <Badge variant="outline" className="bg-accent/10 text-accent-foreground border-accent/20">
                                          VMIA Reward
                                        </Badge>
                                      ) : tx.type === "transfer" ? (
                                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                                          Transfer
                                        </Badge>
                                      ) : (
                                        <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
                                          {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                                        </Badge>
                                      )}
                                    </div>
                                  </TableCell>
                                  <TableCell className="font-medium">
                                    {tx.type === "transfer" && tx.from === wallet?.address ? (
                                      <div className="flex items-center text-destructive">
                                        <Upload className="h-3 w-3 mr-1" />
                                        {tx.amount}
                                      </div>
                                    ) : (
                                      <div className="flex items-center text-status-online">
                                        <Download className="h-3 w-3 mr-1" />
                                        {tx.amount}
                                      </div>
                                    )}
                                  </TableCell>
                                  <TableCell className="text-muted-foreground">{tx.timestamp}</TableCell>
                                  <TableCell>
                                    <Badge 
                                      variant="outline" 
                                      className={
                                        tx.status === "confirmed" 
                                          ? "bg-status-online/10 text-status-online border-status-online/20"
                                          : tx.status === "pending"
                                          ? "bg-status-idle/10 text-status-idle border-status-idle/20"
                                          : "bg-status-offline/10 text-status-offline border-status-offline/20"
                                      }
                                    >
                                      {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                                    </Badge>
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={4} className="text-center py-4">No transactions found</TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="notifications" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                        <CardDescription>System updates and alerts</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {notifications && notifications.length > 0 ? (
                          <div className="space-y-4">
                            {notifications.map((notification, index) => (
                              <div key={index} className={`p-4 rounded-lg border ${notification.read ? 'bg-card' : 'bg-accent/5'}`}>
                                <div className="flex justify-between items-start">
                                  <div className="flex items-center gap-2">
                                    {notification.type === "reward" ? (
                                      <Badge variant="outline" className="bg-status-online/10 text-status-online border-status-online/20">
                                        Reward
                                      </Badge>
                                    ) : notification.type === "system" ? (
                                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                                        System
                                      </Badge>
                                    ) : notification.type === "update" ? (
                                      <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
                                        Update
                                      </Badge>
                                    ) : (
                                      <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                                        Security
                                      </Badge>
                                    )}
                                    <span className="text-sm text-muted-foreground">{notification.timestamp}</span>
                                  </div>
                                  {notification.actionRequired && (
                                    <Badge variant="outline" className="bg-status-idle/10 text-status-idle border-status-idle/20">
                                      Action Required
                                    </Badge>
                                  )}
                                </div>
                                <p className="mt-2">{notification.message}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-medium">No notifications</h3>
                            <p className="text-muted-foreground">You're all caught up!</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="settings" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Client Settings</CardTitle>
                        <CardDescription>Configure your VMIA Docker client</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Docker Resource Limits</label>
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">CPU Usage Limit</span>
                                <span>70%</span>
                              </div>
                              <Progress value={70} className="h-1" />
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">Memory Usage Limit</span>
                                <span>60%</span>
                              </div>
                              <Progress value={60} className="h-1" />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Network Configuration</label>
                            <div className="rounded-md bg-muted p-3">
                              <div className="text-sm text-muted-foreground mb-1">Network Type</div>
                              <div className="font-semibold capitalize">Devnet</div>
                            </div>
                            <div className="rounded-md bg-muted p-3">
                              <div className="text-sm text-muted-foreground mb-1">Auto-update Client</div>
                              <div className="font-semibold">Enabled</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="md:col-span-4 space-y-4">
                <WalletConnect />

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>VMIA Status</CardTitle>
                    <CardDescription>
                      {loadingStatus 
                        ? "Loading client status..."
                        : vmiaStatus?.isRunning
                        ? "Your VMIA node is active and contributing"
                        : "Your VMIA node is inactive"
                      }
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loadingStatus ? (
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded animate-pulse" />
                        <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                        <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
                      </div>
                    ) : vmiaStatus ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Status</span>
                          <Badge 
                            variant="outline" 
                            className={
                              vmiaStatus.isRunning
                                ? "bg-status-online/10 text-status-online border-status-online/20"
                                : "bg-status-offline/10 text-status-offline border-status-offline/20"
                            }
                          >
                            {vmiaStatus.isRunning ? "Running" : "Stopped"}
                          </Badge>
                        </div>
                        
                        <div className="rounded-md bg-muted p-3">
                          <div className="text-sm text-muted-foreground mb-1">Total Earned</div>
                          <div className="font-semibold">{vmiaStatus.totalEarned || "0.00"} CNX</div>
                        </div>
                        
                        <div className="rounded-md bg-muted p-3">
                          <div className="text-sm text-muted-foreground mb-1">Weekly Average</div>
                          <div className="font-semibold">{vmiaStatus.weeklyAverage || "0.00"} CNX</div>
                        </div>
                        
                        {vmiaStatus.isRunning && vmiaStatus.performance && (
                          <div className="space-y-3">
                            <div className="text-sm font-medium">Resource Usage</div>
                            <div className="space-y-1">
                              <div className="flex items-center text-xs">
                                <CpuIcon className="mr-1 h-3 w-3" /> CPU: {vmiaStatus.performance.cpu}%
                              </div>
                              <Progress value={vmiaStatus.performance.cpu} className="h-1" />
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center text-xs">
                                <MemoryStick className="mr-1 h-3 w-3" /> RAM: {vmiaStatus.performance.memory}%
                              </div>
                              <Progress value={vmiaStatus.performance.memory} className="h-1" />
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center text-xs">
                                <Activity className="mr-1 h-3 w-3" /> Tasks: {vmiaStatus.performance.tasks}/sec
                              </div>
                              <Progress value={vmiaStatus.performance.tasks / 2} className="h-1" />
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            Last payout: {vmiaStatus.lastPayout || "Never"}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <Server className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                        <h3 className="text-lg font-medium">No VMIA client data</h3>
                        <p className="text-sm text-muted-foreground mb-4">Connect your wallet and install Docker VMIA to get started</p>
                        <Button onClick={handleDownloadDocker} disabled={isDownloading}>
                          <Download className="mr-2 h-4 w-4" />
                          {isDownloading ? "Downloading..." : "Install VMIA Client"}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default VmiaClientApp;
