
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const EnergyChart = () => {
  const data = [
    { day: 'Sun', value: 45, color: '#8b5cf6' },
    { day: 'Mon', value: 65, color: '#8b5cf6' },
    { day: 'Tue', value: 35, color: '#8b5cf6' },
    { day: 'Wed', value: 80, color: '#8b5cf6' },
    { day: 'Thu', value: 25, color: '#8b5cf6' },
    { day: 'Fri', value: 70, color: '#8b5cf6' },
    { day: 'Sat', value: 55, color: '#8b5cf6' }
  ];

  const chartConfig = {
    value: {
      label: "Energy kWh",
      color: "#8b5cf6",
    },
  };

  return (
    <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-sm font-medium flex items-center gap-2">
            <span className="text-yellow-400">⚡</span>
            Energy
          </CardTitle>
          <span className="text-xs text-slate-300">Week</span>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="text-lg font-bold text-white mb-2">23.6 kWh</div>
        <div className="text-xs text-slate-300 mb-3">15.8 kWh</div>
        
        <ChartContainer config={chartConfig} className="h-[80px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barCategoryGap="20%">
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#cbd5e1' }}
              />
              <YAxis hide />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar 
                dataKey="value" 
                fill="#8b5cf6"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default EnergyChart;
