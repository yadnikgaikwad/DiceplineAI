
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search, Filter, CheckCircle2, Circle, Calendar, Clock, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: string;
  estimatedTime: string;
  category: string;
}

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Design system documentation',
      description: 'Create comprehensive documentation for the design system components and guidelines',
      priority: 'high',
      status: 'in-progress',
      dueDate: '2024-12-25',
      estimatedTime: '4 hours',
      category: 'Documentation'
    },
    {
      id: '2',
      title: 'Code review for feature branch',
      description: 'Review pull request for new authentication feature',
      priority: 'medium',
      status: 'pending',
      dueDate: '2024-12-24',
      estimatedTime: '1 hour',
      category: 'Development'
    },
    {
      id: '3',
      title: 'Update project dependencies',
      description: 'Update all npm packages to latest stable versions',
      priority: 'low',
      status: 'completed',
      dueDate: '2024-12-23',
      estimatedTime: '2 hours',
      category: 'Maintenance'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as const,
    dueDate: '',
    estimatedTime: '',
    category: ''
  });

  const { toast } = useToast();

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const tasksByStatus = {
    pending: filteredTasks.filter(task => task.status === 'pending'),
    'in-progress': filteredTasks.filter(task => task.status === 'in-progress'),
    completed: filteredTasks.filter(task => task.status === 'completed')
  };

  const handleCreateTask = () => {
    if (!newTask.title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a task title.",
        variant: "destructive"
      });
      return;
    }

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority,
      status: 'pending',
      dueDate: newTask.dueDate,
      estimatedTime: newTask.estimatedTime,
      category: newTask.category
    };

    setTasks(prev => [...prev, task]);
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
      estimatedTime: '',
      category: ''
    });
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Task created",
      description: "New task has been added successfully."
    });
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const newStatus = task.status === 'completed' ? 'pending' : 
                         task.status === 'pending' ? 'in-progress' : 'completed';
        return { ...task, status: newStatus };
      }
      return task;
    }));
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    toast({
      title: "Task deleted",
      description: "Task has been removed successfully."
    });
  };

  const TaskCard = ({ task }: { task: Task }) => (
    <Card className="bg-slate-700/30 border-slate-600 hover:bg-slate-700/50 transition-colors">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <button
              onClick={() => toggleTaskStatus(task.id)}
              className="mt-1 text-slate-400 hover:text-white transition-colors"
            >
              {task.status === 'completed' ? (
                <CheckCircle2 className="h-5 w-5 text-green-400" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </button>
            <div className="flex-1">
              <h3 className={`font-medium ${task.status === 'completed' ? 'text-slate-400 line-through' : 'text-white'}`}>
                {task.title}
              </h3>
              {task.description && (
                <p className={`text-sm mt-1 ${task.status === 'completed' ? 'text-slate-500' : 'text-slate-300'}`}>
                  {task.description}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-1">
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-8 w-8 p-0 text-slate-400 hover:text-red-400"
              onClick={() => deleteTask(task.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Badge 
            variant="outline"
            className={`${
              task.priority === 'high' ? 'border-red-400/50 text-red-400' :
              task.priority === 'medium' ? 'border-orange-400/50 text-orange-400' :
              'border-green-400/50 text-green-400'
            }`}
          >
            {task.priority}
          </Badge>
          {task.category && (
            <Badge variant="outline" className="border-slate-500 text-slate-300">
              {task.category}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-400">
          {task.dueDate && (
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(task.dueDate).toLocaleDateString()}
            </div>
          )}
          {task.estimatedTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {task.estimatedTime}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-1 gap-3 w-full sm:w-auto">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[140px] bg-slate-700/50 border-slate-600 text-white">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              New Task
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
                  <label className="text-sm text-slate-300 mb-2 block">Due Date</label>
                  <Input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="bg-slate-700/50 border-slate-600 text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-300 mb-2 block">Estimated Time</label>
                  <Input
                    value={newTask.estimatedTime}
                    onChange={(e) => setNewTask(prev => ({ ...prev, estimatedTime: e.target.value }))}
                    placeholder="e.g., 2 hours"
                    className="bg-slate-700/50 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-300 mb-2 block">Category</label>
                  <Input
                    value={newTask.category}
                    onChange={(e) => setNewTask(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="e.g., Development"
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

      {/* Task Boards */}
      <Tabs defaultValue="board" className="w-full">
        <TabsList className="bg-slate-800/50 border border-slate-700">
          <TabsTrigger value="board" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300">
            Board View
          </TabsTrigger>
          <TabsTrigger value="list" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300">
            List View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="board" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pending */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Circle className="h-5 w-5 text-slate-400" />
                <h3 className="text-white font-medium">Pending</h3>
                <Badge variant="outline" className="text-slate-400 border-slate-500">
                  {tasksByStatus.pending.length}
                </Badge>
              </div>
              <div className="space-y-3">
                {tasksByStatus.pending.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>

            {/* In Progress */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-orange-400" />
                <h3 className="text-white font-medium">In Progress</h3>
                <Badge variant="outline" className="text-orange-400 border-orange-500">
                  {tasksByStatus['in-progress'].length}
                </Badge>
              </div>
              <div className="space-y-3">
                {tasksByStatus['in-progress'].map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>

            {/* Completed */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                <h3 className="text-white font-medium">Completed</h3>
                <Badge variant="outline" className="text-green-400 border-green-500">
                  {tasksByStatus.completed.length}
                </Badge>
              </div>
              <div className="space-y-3">
                {tasksByStatus.completed.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="list" className="mt-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="space-y-3">
                {filteredTasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
              {filteredTasks.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-slate-400">No tasks found matching your criteria.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaskManager;
