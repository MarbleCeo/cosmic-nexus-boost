
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const data = [
  { name: 'CNX', value: 4000, color: 'hsl(var(--primary))' },
  { name: 'BTC', value: 3000, color: 'hsl(var(--accent))' },
  { name: 'ETH', value: 2000, color: 'hsl(var(--secondary))' },
  { name: 'SOL', value: 2780, color: 'hsl(var(--accent))' },
  { name: 'BNB', value: 1890, color: 'hsl(var(--secondary))' },
  { name: 'USDT', value: 2390, color: 'hsl(var(--primary))' },
  { name: 'XRP', value: 3490, color: 'hsl(var(--secondary))' },
];

export function DexOverview() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>DEX Overview</CardTitle>
            <CardDescription>Trading volume - Last 24h</CardDescription>
          </div>
          <Link to="/dex">
            <Button variant="ghost" size="sm" className="gap-1">
              <span>Open DEX</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 20,
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
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
