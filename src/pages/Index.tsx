
import { useState } from 'react';
import { Calendar, Plus, Brain, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TaskBreakdown from '@/components/TaskBreakdown';
import TaskCalendar from '@/components/TaskCalendar';
import Dashboard from '@/components/Dashboard';
import TaskManager from '@/components/TaskManager';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">TaskFlow AI</h1>
            <p className="text-slate-400">Intelligent task management with AI-powered breakdown</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-slate-800/50 border-slate-700 text-white hover:bg-slate-700">
              <Plus className="h-4 w-4 mr-2" />
              Quick Task
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border border-slate-700">
            <TabsTrigger 
              value="dashboard" 
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="ai-breakdown" 
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300"
            >
              <Brain className="h-4 w-4 mr-2" />
              AI Breakdown
            </TabsTrigger>
            <TabsTrigger 
              value="calendar" 
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Calendar
            </TabsTrigger>
            <TabsTrigger 
              value="tasks" 
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300"
            >
              Tasks
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="dashboard" className="space-y-6">
              <Dashboard />
            </TabsContent>

            <TabsContent value="ai-breakdown" className="space-y-6">
              <TaskBreakdown />
            </TabsContent>

            <TabsContent value="calendar" className="space-y-6">
              <TaskCalendar />
            </TabsContent>

            <TabsContent value="tasks" className="space-y-6">
              <TaskManager />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
