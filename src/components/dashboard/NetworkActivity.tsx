
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '00:00', tps: 1400, vmia: 300 },
  { time: '04:00', tps: 2000, vmia: 400 },
  { time: '08:00', tps: 2200, vmia: 500 },
  { time: '12:00', tps: 2700, vmia: 600 },
  { time: '16:00', tps: 2300, vmia: 550 },
  { time: '20:00', tps: 2100, vmia: 480 },
  { time: '24:00', tps: 1800, vmia: 400 },
];

export function NetworkActivity() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Network Activity</CardTitle>
        <CardDescription>Real-time transactions and VMIA processing metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient id="colorTps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorVmia" x1="0" y1="0" x2="0" y2="1">
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
                dataKey="tps" 
                name="Transactions/sec" 
                stroke="hsl(var(--primary))" 
                fillOpacity={1} 
                fill="url(#colorTps)" 
              />
              <Area 
                type="monotone" 
                dataKey="vmia" 
                name="VMIA ops/sec" 
                stroke="hsl(var(--secondary))" 
                fillOpacity={1} 
                fill="url(#colorVmia)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
