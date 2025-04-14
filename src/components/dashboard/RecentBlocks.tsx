
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CheckCircle } from "lucide-react";

interface BlockData {
  height: number;
  hash: string;
  timestamp: string;
  txCount: number;
  size: string;
  proposer: string;
  consensus: string;
}

const blocks: BlockData[] = [
  {
    height: 5432109,
    hash: "0x7f92ab5b3f5c4e79a45e7b82aec9c5617bd9a9c7e8b4e2d5a6b8c9d0e1f2a3b4",
    timestamp: "3s ago",
    txCount: 1267,
    size: "1.2 MB",
    proposer: "validator4.cosmic",
    consensus: "POH"
  },
  {
    height: 5432108,
    hash: "0x2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3",
    timestamp: "8s ago",
    txCount: 954,
    size: "0.9 MB",
    proposer: "validator12.cosmic",
    consensus: "POS"
  },
  {
    height: 5432107,
    hash: "0x3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f",
    timestamp: "15s ago",
    txCount: 1523,
    size: "1.4 MB",
    proposer: "validator7.cosmic",
    consensus: "POH"
  },
  {
    height: 5432106,
    hash: "0x4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4",
    timestamp: "21s ago",
    txCount: 1102,
    size: "1.1 MB",
    proposer: "validator1.cosmic",
    consensus: "VMIA"
  },
  {
    height: 5432105,
    hash: "0x5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5",
    timestamp: "28s ago",
    txCount: 873,
    size: "0.8 MB",
    proposer: "validator9.cosmic",
    consensus: "POS"
  }
];

export function RecentBlocks() {
  const getConsensusBadge = (consensus: string) => {
    switch (consensus) {
      case "POH":
        return <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">POH</Badge>;
      case "POS":
        return <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">POS</Badge>;
      case "VMIA":
        return <Badge variant="outline" className="bg-accent/10 text-accent-foreground border-accent/20">VMIA</Badge>;
      default:
        return <Badge variant="outline">{consensus}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div>
          <CardTitle>Recent Blocks</CardTitle>
          <CardDescription>Latest blocks added to the Cosmic Nexus blockchain</CardDescription>
        </div>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="ml-auto rounded-full bg-status-online/20 p-1">
                <CheckCircle className="h-4 w-4 text-status-online" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p className="text-xs">All systems operational</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Height</TableHead>
              <TableHead>Hash</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Txs</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Proposer</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blocks.map((block) => (
              <TableRow key={block.height}>
                <TableCell className="font-medium">{block.height}</TableCell>
                <TableCell className="font-mono text-xs">
                  {block.hash.substring(0, 10)}...
                </TableCell>
                <TableCell>{block.timestamp}</TableCell>
                <TableCell>{block.txCount}</TableCell>
                <TableCell>{block.size}</TableCell>
                <TableCell>{block.proposer}</TableCell>
                <TableCell>{getConsensusBadge(block.consensus)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
