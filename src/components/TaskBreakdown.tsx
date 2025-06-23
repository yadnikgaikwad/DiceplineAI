
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Brain, Sparkles, CheckCircle2, Circle, Calendar, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Step {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  estimatedTime: string;
  priority: 'low' | 'medium' | 'high';
}

const TaskBreakdown = () => {
  const [task, setTask] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [steps, setSteps] = useState<Step[]>([]);
  const { toast } = useToast();

  // Mock AI breakdown function
  const generateBreakdown = async () => {
    if (!task.trim()) {
      toast({
        title: "Please enter a task",
        description: "Describe the task you want to break down.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock AI-generated breakdown based on task content
    const mockSteps: Step[] = [
      {
        id: '1',
        title: 'Research and Planning',
        description: 'Gather requirements, research best practices, and create a detailed plan',
        completed: false,
        estimatedTime: '2-3 hours',
        priority: 'high'
      },
      {
        id: '2',
        title: 'Setup and Configuration',
        description: 'Set up necessary tools, environments, and initial configurations',
        completed: false,
        estimatedTime: '1 hour',
        priority: 'medium'
      },
      {
        id: '3',
        title: 'Core Implementation',
        description: 'Implement the main functionality and core features',
        completed: false,
        estimatedTime: '4-6 hours',
        priority: 'high'
      },
      {
        id: '4',
        title: 'Testing and Validation',
        description: 'Test the implementation thoroughly and validate against requirements',
        completed: false,
        estimatedTime: '1-2 hours',
        priority: 'medium'
      },
      {
        id: '5',
        title: 'Documentation and Cleanup',
        description: 'Document the work done and clean up any temporary files or code',
        completed: false,
        estimatedTime: '30 minutes',
        priority: 'low'
      }
    ];

    setSteps(mockSteps);
    setIsGenerating(false);
    
    toast({
      title: "Task breakdown generated!",
      description: `Created ${mockSteps.length} actionable steps for your task.`
    });
  };

  const toggleStep = (stepId: string) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, completed: !step.completed } : step
    ));
  };

  const addToCalendar = (step: Step) => {
    toast({
      title: "Added to calendar",
      description: `"${step.title}" has been scheduled.`
    });
  };

  const completedCount = steps.filter(step => step.completed).length;
  const progress = steps.length > 0 ? (completedCount / steps.length) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Task Input */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-400" />
            AI Task Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm text-slate-300 mb-2 block">
              Describe your task in detail
            </label>
            <Textarea
              placeholder="e.g., Create a responsive landing page for a SaaS product with modern design, contact form, and pricing section..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 min-h-[100px] resize-none"
              disabled={isGenerating}
            />
          </div>
          <Button 
            onClick={generateBreakdown}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
          >
            {isGenerating ? (
              <>
                <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                Generating breakdown...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                Generate AI Breakdown
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Steps */}
      {steps.length > 0 && (
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Breakdown Results</CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-300">
                  {completedCount}/{steps.length} completed
                </span>
                <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {steps.map((step, index) => (
              <div key={step.id}>
                <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors">
                  <button
                    onClick={() => toggleStep(step.id)}
                    className="mt-1 text-slate-400 hover:text-white transition-colors"
                  >
                    {step.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                    ) : (
                      <Circle className="h-5 w-5" />
                    )}
                  </button>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-medium ${step.completed ? 'text-slate-400 line-through' : 'text-white'}`}>
                        Step {index + 1}: {step.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="outline"
                          className={`text-xs ${
                            step.priority === 'high' ? 'border-red-400/50 text-red-400' :
                            step.priority === 'medium' ? 'border-orange-400/50 text-orange-400' :
                            'border-green-400/50 text-green-400'
                          }`}
                        >
                          {step.priority}
                        </Badge>
                        <Badge variant="outline" className="text-xs text-slate-300 border-slate-500">
                          {step.estimatedTime}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className={`text-sm ${step.completed ? 'text-slate-500' : 'text-slate-300'}`}>
                      {step.description}
                    </p>
                    
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addToCalendar(step)}
                        className="text-xs bg-slate-600/50 border-slate-500 text-slate-300 hover:bg-slate-600 hover:text-white"
                      >
                        <Calendar className="h-3 w-3 mr-1" />
                        Schedule
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs bg-slate-600/50 border-slate-500 text-slate-300 hover:bg-slate-600 hover:text-white"
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add Subtask
                      </Button>
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && <Separator className="bg-slate-700" />}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Tips */}
      <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-700/50 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-purple-400 mt-0.5" />
            <div>
              <h4 className="text-white font-medium mb-1">Pro Tips</h4>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• Be specific about your task requirements for better breakdown</li>
                <li>• Include context about deadlines and constraints</li>
                <li>• Mention any specific tools or technologies you need to use</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskBreakdown;
