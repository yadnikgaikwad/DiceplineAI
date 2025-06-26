
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

const ProjectMetrics = () => {
  const data = [
    { week: 'W1', productivity: 65, quality: 45 },
    { week: 'W2', productivity: 75, quality: 55 },
    { week: 'W3', productivity: 85, quality: 70 },
    { week: 'W4', productivity: 78, quality: 65 },
    { week: 'W5', productivity: 90, quality: 80 },
    { week: 'W6', productivity: 88, quality: 85 }
  ];

  const chartConfig = {
    productivity: {
      label: "Productivity",
      color: "#06b6d4",
    },
    quality: {
      label: "Quality",
      color: "#8b5cf6",
    },
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-sm font-medium flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-cyan-400" />
            Project Metrics
          </CardTitle>
          <span className="text-xs text-slate-400">6 Weeks</span>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="flex gap-4 mb-3">
          <div>
            <div className="text-lg font-bold text-white">88%</div>
            <div className="text-xs text-cyan-400">Productivity</div>
          </div>
          <div>
            <div className="text-lg font-bold text-white">85%</div>
            <div className="text-xs text-purple-400">Quality</div>
          </div>
        </div>
        
        <ChartContainer config={chartConfig} className="h-[100px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="productivity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="quality" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="week" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#64748b' }}
              />
              <YAxis hide />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="productivity"
                stroke="#06b6d4"
                fillOpacity={1}
                fill="url(#productivity)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="quality"
                stroke="#8b5cf6"
                fillOpacity={1}
                fill="url(#quality)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ProjectMetrics;
