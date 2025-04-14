
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useSolflareWallet } from "@/hooks/useBlockchainData";
import { useToast } from "@/hooks/use-toast";
import { Copy, ExternalLink, LogOut, Wallet } from "lucide-react";
import { useState } from "react";

export function WalletConnect() {
  const { connect, disconnect, connected, loading, wallet, error } = useSolflareWallet();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    if (wallet?.address) {
      navigator.clipboard.writeText(wallet.address);
      setCopied(true);
      
      toast({
        title: "Address copied",
        description: "Wallet address copied to clipboard",
      });
      
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (error) {
    toast({
      title: "Wallet Error",
      description: error,
      variant: "destructive",
    });
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Wallet className="mr-2 h-4 w-4" />
          Wallet
        </CardTitle>
        <CardDescription>Connect your Solflare wallet</CardDescription>
      </CardHeader>
      <CardContent>
        {!connected ? (
          <Button 
            onClick={connect} 
            className="w-full bg-[#FE8E0D] hover:bg-[#E57200] text-black font-semibold"
            disabled={loading}
          >
            {loading ? "Connecting..." : "Connect Solflare"}
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="rounded-md bg-muted p-3">
              <div className="text-sm text-muted-foreground mb-1">Connected Account</div>
              <div className="flex items-center justify-between">
                <div className="font-mono text-xs">
                  {wallet?.address?.slice(0, 6)}...{wallet?.address?.slice(-4)}
                </div>
                <div className="flex gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6" 
                    onClick={handleCopyAddress}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6" 
                    asChild
                  >
                    <a 
                      href={`https://explorer.solana.com/address/${wallet?.address}?cluster=devnet`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="rounded-md bg-muted p-3">
              <div className="text-sm text-muted-foreground mb-1">Balance</div>
              <div className="font-semibold">{wallet?.balance || "0.00"} CNX</div>
            </div>
            
            <div className="rounded-md bg-muted p-3">
              <div className="text-sm text-muted-foreground mb-1">Network</div>
              <div className="font-semibold capitalize">{wallet?.network || "devnet"}</div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={disconnect}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Disconnect
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
