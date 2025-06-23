
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CalendarIcon, Plus, Clock, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface Task {
  id: string;
  title: string;
  date: Date;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  estimatedTime: string;
  description?: string;
}

interface NewTask {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  estimatedTime: string;
}

const TaskCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState<NewTask>({
    title: '',
    description: '',
    priority: 'medium',
    estimatedTime: ''
  });
  
  const { toast } = useToast();
  
  // Mock tasks data
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Review project proposal',
      date: new Date(),
      priority: 'high',
      status: 'pending',
      estimatedTime: '2 hours',
      description: 'Review the latest project proposal and provide feedback'
    },
    {
      id: '2',
      title: 'Team standup meeting',
      date: new Date(),
      priority: 'medium',
      status: 'completed',
      estimatedTime: '30 minutes',
      description: 'Daily team standup meeting'
    },
    {
      id: '3',
      title: 'Update documentation',
      date: new Date(Date.now() + 86400000), // Tomorrow
      priority: 'low',
      status: 'pending',
      estimatedTime: '1 hour',
      description: 'Update project documentation'
    },
    {
      id: '4',
      title: 'Client presentation prep',
      date: new Date(Date.now() + 172800000), // Day after tomorrow
      priority: 'high',
      status: 'in-progress',
      estimatedTime: '3 hours',
      description: 'Prepare presentation for client meeting'
    }
  ]);

  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => 
      task.date.toDateString() === date.toDateString()
    );
  };

  const selectedDateTasks = selectedDate ? getTasksForDate(selectedDate) : [];

  const handleCreateTask = () => {
    if (!newTask.title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a task title.",
        variant: "destructive"
      });
      return;
    }

    if (!selectedDate) {
      toast({
        title: "Date required",
        description: "Please select a date for the task.",
        variant: "destructive"
      });
      return;
    }

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      date: selectedDate,
      priority: newTask.priority,
      status: 'pending',
      estimatedTime: newTask.estimatedTime
    };

    setTasks(prev => [...prev, task]);
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      estimatedTime: ''
    });
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Task created",
      description: "New task has been added successfully."
    });
  };

  const updateTaskStatus = (taskId: string, newStatus: 'pending' | 'in-progress' | 'completed') => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
    
    toast({
      title: "Task updated",
      description: "Task status has been updated."
    });
  };

  // Check if a date has tasks for styling
  const getDateTasks = (date: Date) => {
    return getTasksForDate(date);
  };

  const modifiers = {
    hasTask: (date: Date) => getDateTasks(date).length > 0,
    hasHighPriority: (date: Date) => getDateTasks(date).some(task => task.priority === 'high')
  };

  const modifiersStyles = {
    hasTask: { 
      position: 'relative',
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: '2px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '4px',
        height: '4px',
        borderRadius: '50%',
        backgroundColor: '#60a5fa'
      }
    },
    hasHighPriority: {
      position: 'relative',
      '&::after': {
        backgroundColor: '#f87171'
      }
    }
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
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            className="rounded-md border-slate-700 bg-slate-700/30 text-white [&_button]:text-white [&_button:hover]:bg-slate-600 [&_.rdp-day_selected]:bg-blue-600 [&_.rdp-day_selected]:text-white"
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
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Task
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-800 border-slate-700 text-white">
                <DialogHeader>
                  <DialogTitle>Create New Task</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-slate-300 mb-2 block">Title *</label>
                    <Input
                      value={newTask.title}
                      onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter task title..."
                      className="bg-slate-700/50 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-300 mb-2 block">Description</label>
                    <Textarea
                      value={newTask.description}
                      onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Enter task description..."
                      className="bg-slate-700/50 border-slate-600 text-white resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-slate-300 mb-2 block">Priority</label>
                      <Select value={newTask.priority} onValueChange={(value: 'low' | 'medium' | 'high') => setNewTask(prev => ({ ...prev, priority: value }))}>
                        <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm text-slate-300 mb-2 block">Estimated Time</label>
                      <Input
                        value={newTask.estimatedTime}
                        onChange={(e) => setNewTask(prev => ({ ...prev, estimatedTime: e.target.value }))}
                        placeholder="e.g., 2 hours"
                        className="bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button onClick={handleCreateTask} className="flex-1 bg-blue-600 hover:bg-blue-700">
                      Create Task
                    </Button>
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="border-slate-600 text-slate-300">
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {selectedDateTasks.length === 0 ? (
            <div className="text-center py-8">
              <CalendarIcon className="h-12 w-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400">No tasks scheduled for this date</p>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="mt-2 bg-slate-700 border-slate-600 text-slate-300">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Task
                  </Button>
                </DialogTrigger>
              </Dialog>
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
                  
                  {task.description && (
                    <p className="text-sm text-slate-300">{task.description}</p>
                  )}
                  
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
                    <Select value={task.status} onValueChange={(value: 'pending' | 'in-progress' | 'completed') => updateTaskStatus(task.id, value)}>
                      <SelectTrigger className="text-xs bg-slate-600/50 border-slate-500 text-slate-300 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
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
