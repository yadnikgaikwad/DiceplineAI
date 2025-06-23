
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
    <div className="min-h-screen bg-gray-950">
      <div className="container mx-auto px-6 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-100 mb-2">TaskFlow AI</h1>
            <p className="text-gray-400">Intelligent task management with AI-powered breakdown</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700 hover:text-white">
              <Plus className="h-4 w-4 mr-2" />
              Quick Task
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800 border border-gray-700">
            <TabsTrigger 
              value="dashboard" 
              className="data-[state=active]:bg-gray-700 data-[state=active]:text-gray-100 text-gray-400 hover:text-gray-200"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="ai-breakdown" 
              className="data-[state=active]:bg-gray-700 data-[state=active]:text-gray-100 text-gray-400 hover:text-gray-200"
            >
              <Brain className="h-4 w-4 mr-2" />
              AI Breakdown
            </TabsTrigger>
            <TabsTrigger 
              value="calendar" 
              className="data-[state=active]:bg-gray-700 data-[state=active]:text-gray-100 text-gray-400 hover:text-gray-200"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Calendar
            </TabsTrigger>
            <TabsTrigger 
              value="tasks" 
              className="data-[state=active]:bg-gray-700 data-[state=active]:text-gray-100 text-gray-400 hover:text-gray-200"
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
