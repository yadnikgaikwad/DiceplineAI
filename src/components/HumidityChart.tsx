
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const HumidityChart = () => {
  const data = [
    { day: 'Sun', value: 24 },
    { day: 'Mon', value: 33 },
    { day: 'Tue', value: 29 },
    { day: 'Wed', value: 45 },
    { day: 'Thu', value: 24 },
    { day: 'Fri', value: 33 },
    { day: 'Sat', value: 33 }
  ];

  const chartConfig = {
    value: {
      label: "Humidity %",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-sm font-medium">Humidity</CardTitle>
          <span className="text-xs text-slate-400">Today</span>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <ChartContainer config={chartConfig} className="h-[120px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#64748b' }}
              />
              <YAxis hide />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 3 }}
                activeDot={{ r: 4, fill: '#3b82f6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="flex justify-between items-center mt-2">
          {data.map((item, index) => (
            <div key={index} className="text-center">
              <div className="text-xs text-slate-400">{item.value}°</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HumidityChart;
