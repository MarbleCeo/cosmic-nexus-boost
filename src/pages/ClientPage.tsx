
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WalletConnect } from "@/components/dex/WalletConnect";
import { VmiaClientStats } from "@/components/vmia/VmiaClientStats";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, Upload, Info, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock transaction data - would be replaced with real data
const transactions = [
  { id: "tx1", type: "vmia-reward", amount: "2.45", timestamp: "10 min ago", status: "confirmed" },
  { id: "tx2", type: "vmia-reward", amount: "1.02", timestamp: "35 min ago", status: "confirmed" },
  { id: "tx3", type: "vmia-reward", amount: "3.78", timestamp: "2 hours ago", status: "confirmed" },
  { id: "tx4", type: "transfer", amount: "50.00", timestamp: "1 day ago", status: "confirmed" },
  { id: "tx5", type: "stake", amount: "100.00", timestamp: "3 days ago", status: "confirmed" },
];

const ClientPage = () => {
  const { toast } = useToast();

  const handleStartDocker = () => {
    toast({
      title: "Docker Command Sent",
      description: "Attempting to start the VMIA Docker container...",
    });
  };

  const handleStopDocker = () => {
    toast({
      title: "Docker Command Sent",
      description: "Shutting down VMIA Docker container...",
    });
  };

  const handleDownloadDocker = () => {
    toast({
      title: "Download Started",
      description: "Downloading the VMIA Docker image...",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cosmic Nexus Client</h1>
          <p className="text-muted-foreground">
            Manage your VMIA Docker container and wallet
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <VmiaClientStats />
          </div>
          <div>
            <WalletConnect />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>VMIA Docker Control</CardTitle>
            <CardDescription>Manage your Docker container for VMIA operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="bg-status-online hover:bg-status-online/90" onClick={handleStartDocker}>
                Start Docker VMIA
              </Button>
              <Button variant="destructive" onClick={handleStopDocker}>
                Stop Docker VMIA
              </Button>
              <Button variant="outline" onClick={handleDownloadDocker}>
                <Download className="mr-2 h-4 w-4" />
                Download Latest Image
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
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="help">Help</TabsTrigger>
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
                    {transactions.map((tx) => (
                      <TableRow key={tx.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {tx.type === "vmia-reward" ? (
                              <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                                VMIA Reward
                              </Badge>
                            ) : tx.type === "transfer" ? (
                              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                                Transfer
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
                                Stake
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {tx.type === "transfer" ? (
                            <div className="flex items-center text-destructive">
                              <Upload className="h-3 w-3 mr-1" />
                              {tx.amount} CNX
                            </div>
                          ) : (
                            <div className="flex items-center text-status-online">
                              <Download className="h-3 w-3 mr-1" />
                              {tx.amount} CNX
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground">{tx.timestamp}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-status-online/10 text-status-online border-status-online/20">
                            Confirmed
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Client Settings</CardTitle>
                <CardDescription>Configure your VMIA Docker client</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">VMIA Docker settings will be available soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="help" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Help & Documentation</CardTitle>
                <CardDescription>Learn how to use Cosmic Nexus</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium">Getting Started</h4>
                    <p className="text-sm text-muted-foreground">
                      To begin earning CNX tokens, connect your Solflare wallet and start your VMIA Docker container.
                      Make sure your system meets the minimum requirements.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium">Troubleshooting</h4>
                    <p className="text-sm text-muted-foreground">
                      If your Docker container fails to start, check that Docker is installed and running on your system.
                      For wallet connection issues, ensure you have the Solflare extension installed.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ClientPage;
