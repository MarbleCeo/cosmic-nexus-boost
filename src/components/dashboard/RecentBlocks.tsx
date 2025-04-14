
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CheckCircle, AlertCircle } from "lucide-react";
import { useBlocks } from "@/hooks/useBlockchainData";

export function RecentBlocks() {
  const { data: blocks, isLoading, error } = useBlocks();

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
                {error ? (
                  <AlertCircle className="h-4 w-4 text-destructive" />
                ) : (
                  <CheckCircle className="h-4 w-4 text-status-online" />
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p className="text-xs">
                {error ? "Error fetching blocks" : "All systems operational"}
              </p>
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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">Loading blocks...</TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-destructive">
                  Error loading blocks
                </TableCell>
              </TableRow>
            ) : blocks?.map((block) => (
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
