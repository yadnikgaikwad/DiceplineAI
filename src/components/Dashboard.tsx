
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Calendar, CheckCircle2, Clock, TrendingUp, Target } from 'lucide-react';
import AnimatedTimeDisplay from './AnimatedTimeDisplay';
import GitHubCalendar from './GitHubCalendar';
import HumidityChart from './HumidityChart';
import EnergyChart from './EnergyChart';
import ProjectMetrics from './ProjectMetrics';

const Dashboard = () => {
  // Mock data for demonstration
  const stats = {
    totalTasks: 24,
    completedTasks: 18,
    pendingTasks: 6,
    todayTasks: 5
  };

  const completionRate = (stats.completedTasks / stats.totalTasks) * 100;

  const recentTasks = [
    { name: "Design landing page", status: "completed", priority: "high", dueDate: "Today" },
    { name: "Review marketing proposal", status: "in-progress", priority: "medium", dueDate: "Tomorrow" },
    { name: "Client meeting preparation", status: "pending", priority: "high", dueDate: "Dec 25" },
    { name: "Update project documentation", status: "completed", priority: "low", dueDate: "Yesterday" },
  ];

  const upcomingDeadlines = [
    { task: "Product launch presentation", date: "Dec 24", priority: "critical" },
    { task: "Budget review meeting", date: "Dec 26", priority: "high" },
    { task: "Team retrospective", date: "Dec 28", priority: "medium" },
  ];

  return (
    <div className="space-y-6">
      <AnimatedTimeDisplay />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Progress Overview */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              Progress Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-slate-300">Total Tasks</span>
              </div>
              <span className="text-lg font-bold text-white">{stats.totalTasks}</span>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300">Overall Completion</span>
                <span className="text-white font-medium">{completionRate.toFixed(0)}%</span>
              </div>
              <Progress value={completionRate} className="h-2 bg-slate-700" />
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <div className="text-lg font-bold text-green-400">{stats.completedTasks}</div>
                <div className="text-xs text-slate-400">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-orange-400">{stats.pendingTasks}</div>
                <div className="text-xs text-slate-400">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-400">{stats.todayTasks}</div>
                <div className="text-xs text-slate-400">Today</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="h-5 w-5 text-red-400" />
              Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingDeadlines.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-slate-700/30">
                <div className="flex-1">
                  <p className="text-sm text-white truncate">{item.task}</p>
                  <p className="text-xs text-slate-400">{item.date}</p>
                </div>
                <Badge 
                  variant={item.priority === 'critical' ? 'destructive' : 'secondary'}
                  className={`text-xs ${
                    item.priority === 'critical' ? 'bg-red-600/20 text-red-400 border-red-600/50' :
                    item.priority === 'high' ? 'bg-orange-600/20 text-orange-400 border-orange-600/50' :
                    'bg-blue-600/20 text-blue-400 border-blue-600/50'
                  }`}
                >
                  {item.priority}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Analytics Charts Section */}
        <div className="lg:col-span-3">
          <h3 className="text-white text-lg font-semibold mb-4">Analytics Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <HumidityChart />
            <EnergyChart />
            <ProjectMetrics />
          </div>
        </div>

        {/* Task Completion Calendar */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-400" />
              Task Completion Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <GitHubCalendar />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
