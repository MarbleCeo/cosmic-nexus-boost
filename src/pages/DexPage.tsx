
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpDown, TrendingUp, TrendingDown, Clock, BarChart3 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { WalletConnect } from "@/components/dex/WalletConnect";
import { useDexData } from "@/hooks/useBlockchainData";

const DexPage = () => {
  // Mock trading pair data
  const tradingPairs = [
    { pair: "CNX/USDT", price: "12.45", change: "+5.2%", volume: "2.4M", trend: "up" },
    { pair: "CNX/BTC", price: "0.00042", change: "+3.8%", volume: "1.2M", trend: "up" },
    { pair: "CNX/ETH", price: "0.0078", change: "+2.1%", volume: "856K", trend: "up" },
    { pair: "BTC/CNX", price: "2,380.45", change: "-1.2%", volume: "1.1M", trend: "down" },
    { pair: "ETH/CNX", price: "128.35", change: "-0.5%", volume: "723K", trend: "down" },
  ];

  // Mock price history data
  const priceData = [
    { date: "Apr 1", price: 10.20 },
    { date: "Apr 2", price: 10.55 },
    { date: "Apr 3", price: 10.78 },
    { date: "Apr 4", price: 11.02 },
    { date: "Apr 5", price: 10.89 },
    { date: "Apr 6", price: 11.21 },
    { date: "Apr 7", price: 11.45 },
    { date: "Apr 8", price: 11.67 },
    { date: "Apr 9", price: 11.92 },
    { date: "Apr 10", price: 12.15 },
    { date: "Apr 11", price: 11.98 },
    { date: "Apr 12", price: 12.27 },
    { date: "Apr 13", price: 12.43 },
    { date: "Apr 14", price: 12.45 },
  ];

  // Mock recent trades
  const recentTrades = [
    { time: "12:42:15", pair: "CNX/USDT", price: "12.45", amount: "120.5", total: "1,500.22", type: "buy" },
    { time: "12:41:58", pair: "CNX/USDT", price: "12.44", amount: "85.3", total: "1,061.13", type: "sell" },
    { time: "12:40:32", pair: "CNX/USDT", price: "12.43", amount: "42.8", total: "531.20", type: "buy" },
    { time: "12:38:45", pair: "CNX/USDT", price: "12.42", amount: "200.0", total: "2,484.00", type: "sell" },
    { time: "12:37:21", pair: "CNX/USDT", price: "12.40", amount: "67.2", total: "833.28", type: "buy" },
  ];

  const { data: dexData, isLoading, error } = useDexData();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">DEX Trading Platform</h1>
          <p className="text-muted-foreground">
            Prototype decentralized exchange for Cosmic Nexus
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="col-span-2">
            <CardHeader className="pb-2">
              <CardTitle>CNX/USDT</CardTitle>
              <CardDescription className="flex items-center">
                <span className="text-xl font-bold mr-2">$12.45</span>
                <Badge variant="outline" className="bg-status-online/10 text-status-online border-status-online/20">
                  <TrendingUp className="h-3 w-3 mr-1" /> +5.2%
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={priceData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" className="text-muted-foreground text-xs" />
                    <YAxis className="text-muted-foreground text-xs" domain={['dataMin - 0.5', 'dataMax + 0.5']} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        borderColor: 'hsl(var(--border))',
                        color: 'hsl(var(--card-foreground))'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="price" 
                      name="Price (USDT)" 
                      stroke="hsl(var(--primary))" 
                      fillOpacity={1} 
                      fill="url(#colorPrice)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Wallet & Trading</CardTitle>
              <CardDescription>Connect wallet to trade</CardDescription>
            </CardHeader>
            <CardContent>
              <WalletConnect />

              <div className="mt-4">
                <Tabs defaultValue="buy" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="buy">Buy</TabsTrigger>
                    <TabsTrigger value="sell">Sell</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="buy" className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Available</span>
                        <span>24,560.75 USDT</span>
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">Price</label>
                        <Input value="12.45" readOnly />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">Amount (CNX)</label>
                        <Input placeholder="0.00" />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">Total (USDT)</label>
                        <Input placeholder="0.00" />
                      </div>
                      
                      <Button className="w-full bg-status-online hover:bg-status-online/90">Buy CNX</Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="sell" className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Available</span>
                        <span>5,245.32 CNX</span>
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">Price</label>
                        <Input value="12.45" readOnly />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">Amount (CNX)</label>
                        <Input placeholder="0.00" />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">Total (USDT)</label>
                        <Input placeholder="0.00" />
                      </div>
                      
                      <Button className="w-full bg-status-offline hover:bg-status-offline/90">Sell CNX</Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Markets</CardTitle>
              <CardDescription>Active trading pairs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="cnx">CNX</SelectItem>
                      <SelectItem value="btc">BTC</SelectItem>
                      <SelectItem value="usdt">USDT</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Input placeholder="Search markets..." className="flex-1" />
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Pair</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>24h</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tradingPairs.map((pair, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{pair.pair}</TableCell>
                        <TableCell>{pair.price}</TableCell>
                        <TableCell>
                          <span className={`flex items-center ${
                            pair.trend === "up" ? "text-status-online" : "text-status-offline"
                          }`}>
                            {pair.trend === "up" ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                            {pair.change}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Recent Trades</CardTitle>
              <CardDescription>Latest activity for CNX/USDT</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        Time
                      </div>
                    </TableHead>
                    <TableHead>Pair</TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        <ArrowUpDown className="h-3 w-3 mr-1" />
                        Price
                      </div>
                    </TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        <BarChart3 className="h-3 w-3 mr-1" />
                        Total
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentTrades.map((trade, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="text-muted-foreground text-xs">{trade.time}</TableCell>
                      <TableCell>{trade.pair}</TableCell>
                      <TableCell className={trade.type === "buy" ? "text-status-online" : "text-status-offline"}>
                        {trade.price}
                      </TableCell>
                      <TableCell>{trade.amount}</TableCell>
                      <TableCell>{trade.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DexPage;
