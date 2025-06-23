
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CalendarIcon, Plus, Clock, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

interface Task {
  id: string;
  title: string;
  date: Date;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  estimatedTime: string;
}

const TaskCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Mock tasks data
  const [tasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Review project proposal',
      date: new Date(),
      priority: 'high',
      status: 'pending',
      estimatedTime: '2 hours'
    },
    {
      id: '2',
      title: 'Team standup meeting',
      date: new Date(),
      priority: 'medium',
      status: 'completed',
      estimatedTime: '30 minutes'
    },
    {
      id: '3',
      title: 'Update documentation',
      date: new Date(Date.now() + 86400000), // Tomorrow
      priority: 'low',
      status: 'pending',
      estimatedTime: '1 hour'
    },
    {
      id: '4',
      title: 'Client presentation prep',
      date: new Date(Date.now() + 172800000), // Day after tomorrow
      priority: 'high',
      status: 'in-progress',
      estimatedTime: '3 hours'
    }
  ]);

  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => 
      task.date.toDateString() === date.toDateString()
    );
  };

  const selectedDateTasks = selectedDate ? getTasksForDate(selectedDate) : [];

  const getDayTasks = (date: Date) => {
    return getTasksForDate(date);
  };

  // Custom day content to show task indicators
  const renderDay = (date: Date) => {
    const dayTasks = getDayTasks(date);
    const hasHighPriority = dayTasks.some(task => task.priority === 'high');
    const taskCount = dayTasks.length;

    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <span>{date.getDate()}</span>
        {taskCount > 0 && (
          <div className="absolute -top-1 -right-1">
            <div className={`w-2 h-2 rounded-full ${
              hasHighPriority ? 'bg-red-400' : 'bg-blue-400'
            }`} />
          </div>
        )}
        {taskCount > 1 && (
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
            <span className="text-xs text-slate-400">{taskCount}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar */}
      <Card className="lg:col-span-2 bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-blue-400" />
            Task Calendar
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border-slate-700 bg-slate-700/30 text-white [&_button]:text-white [&_button:hover]:bg-slate-600 [&_.rdp-day_selected]:bg-blue-600 [&_.rdp-day_selected]:text-white pointer-events-auto"
            components={{
              DayContent: ({ date }) => renderDay(date)
            }}
          />
        </CardContent>
      </Card>

      {/* Selected Date Tasks */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">
              {selectedDate ? format(selectedDate, 'MMM dd, yyyy') : 'Select a date'}
            </CardTitle>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-1" />
              Add Task
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {selectedDateTasks.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400">No tasks scheduled for this date</p>
              <Button variant="outline" size="sm" className="mt-2 bg-slate-700 border-slate-600 text-slate-300">
                <Plus className="h-4 w-4 mr-1" />
                Add Task
              </Button>
            </div>
          ) : (
            selectedDateTasks.map((task, index) => (
              <div key={task.id}>
                <div className="space-y-3 p-3 rounded-lg bg-slate-700/30">
                  <div className="flex items-start justify-between">
                    <h4 className="text-white font-medium">{task.title}</h4>
                    <Badge 
                      variant="outline"
                      className={`text-xs ${
                        task.priority === 'high' ? 'border-red-400/50 text-red-400' :
                        task.priority === 'medium' ? 'border-orange-400/50 text-orange-400' :
                        'border-green-400/50 text-green-400'
                      }`}
                    >
                      {task.priority}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-slate-400">
                      <Clock className="h-3 w-3" />
                      {task.estimatedTime}
                    </div>
                    <Badge 
                      variant="outline"
                      className={`text-xs ${
                        task.status === 'completed' ? 'border-green-400/50 text-green-400' :
                        task.status === 'in-progress' ? 'border-orange-400/50 text-orange-400' :
                        'border-slate-400/50 text-slate-400'
                      }`}
                    >
                      {task.status}
                    </Badge>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-xs bg-slate-600/50 border-slate-500 text-slate-300">
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs bg-slate-600/50 border-slate-500 text-slate-300">
                      Complete
                    </Button>
                  </div>
                </div>
                {index < selectedDateTasks.length - 1 && <Separator className="bg-slate-700" />}
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Upcoming Tasks */}
      <Card className="lg:col-span-3 bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-400" />
            Upcoming Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks
              .filter(task => task.date >= new Date())
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .map((task) => (
                <div key={task.id} className="p-4 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-white font-medium text-sm">{task.title}</h4>
                    <Badge 
                      variant="outline"
                      className={`text-xs ${
                        task.priority === 'high' ? 'border-red-400/50 text-red-400' :
                        task.priority === 'medium' ? 'border-orange-400/50 text-orange-400' :
                        'border-green-400/50 text-green-400'
                      }`}
                    >
                      {task.priority}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-slate-400">
                      <CalendarIcon className="h-3 w-3" />
                      {format(task.date, 'MMM dd, yyyy')}
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Clock className="h-3 w-3" />
                      {task.estimatedTime}
                    </div>
                    <Badge 
                      variant="outline"
                      className={`text-xs ${
                        task.status === 'completed' ? 'border-green-400/50 text-green-400' :
                        task.status === 'in-progress' ? 'border-orange-400/50 text-orange-400' :
                        'border-slate-400/50 text-slate-400'
                      }`}
                    >
                      {task.status}
                    </Badge>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskCalendar;
