
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Step {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  estimatedTime: string;
  priority: 'low' | 'medium' | 'high';
}

interface DiceRollerProps {
  steps: Step[];
  onStepSelected: (step: Step) => void;
}

const DiceRoller = ({ steps, onStepSelected }: DiceRollerProps) => {
  const [isRolling, setIsRolling] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [diceResults, setDiceResults] = useState<number[]>([]);
  const [selectedStep, setSelectedStep] = useState<Step | null>(null);
  const [timerProgress, setTimerProgress] = useState(0);
  const { toast } = useToast();

  const getDiceIcon = (value: number) => {
    const icons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];
    const IconComponent = icons[value - 1];
    return <IconComponent className="w-12 h-12 text-purple-400" />;
  };

  const rollDice = async () => {
    if (steps.length === 0) {
      toast({
        title: "No tasks available",
        description: "Generate a task breakdown first to use the dice roller.",
        variant: "destructive"
      });
      return;
    }

    setIsRolling(true);
    setTimerProgress(0);
    
    // Simulate dice rolling animation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const numDice = steps.length > 6 ? 2 : 1;
    const results: number[] = [];
    
    for (let i = 0; i < numDice; i++) {
      results.push(Math.floor(Math.random() * 6) + 1);
    }
    
    setDiceResults(results);
    
    // Calculate selected step index
    let selectedIndex: number;
    if (numDice === 1) {
      selectedIndex = (results[0] - 1) % steps.length;
    } else {
      const sum = results.reduce((a, b) => a + b, 0);
      selectedIndex = (sum - 1) % steps.length;
    }
    
    const step = steps[selectedIndex];
    setSelectedStep(step);
    setIsRolling(false);
    setShowResult(true);
    
    // Start timer animation
    const timer = setInterval(() => {
      setTimerProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setShowResult(false);
          onStepSelected(step);
          return 0;
        }
        return prev + 2;
      });
    }, 60); // 3 second timer (100/2 * 60ms = 3000ms)
  };

  const numDice = steps.length > 6 ? 2 : 1;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-4">
        {/* Dice Display */}
        <div className="flex gap-3">
          {Array.from({ length: numDice }).map((_, index) => (
            <div 
              key={index}
              className={`
                w-16 h-16 bg-slate-700/50 border-2 border-slate-600 rounded-lg 
                flex items-center justify-center transition-all duration-300
                ${isRolling ? 'animate-bounce' : ''}
              `}
            >
              {isRolling ? (
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" />
              ) : diceResults[index] ? (
                getDiceIcon(diceResults[index])
              ) : (
                <div className="w-8 h-8 border-2 border-slate-500 rounded border-dashed" />
              )}
            </div>
          ))}
        </div>
        
        {/* Roll Button */}
        <Button
          onClick={rollDice}
          disabled={isRolling || steps.length === 0}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2"
        >
          {isRolling ? 'Rolling...' : 'Roll Dice'}
        </Button>
      </div>
      
      <p className="text-center text-sm text-slate-400">
        {steps.length === 0 
          ? "Generate tasks to use the dice roller"
          : `${numDice} dice for ${steps.length} tasks`
        }
      </p>

      {/* Result Dialog */}
      <Dialog open={showResult} onOpenChange={setShowResult}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white text-center">Task Selected!</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Dice Result */}
            <div className="flex justify-center gap-3">
              {diceResults.map((result, index) => (
                <div key={index} className="w-16 h-16 bg-slate-700 border-2 border-purple-400 rounded-lg flex items-center justify-center">
                  {getDiceIcon(result)}
                </div>
              ))}
            </div>
            
            {/* Selected Task */}
            {selectedStep && (
              <div className="text-center space-y-2">
                <h3 className="text-white font-medium">{selectedStep.title}</h3>
                <p className="text-slate-300 text-sm">{selectedStep.description}</p>
                <div className="text-xs text-slate-400">
                  Estimated time: {selectedStep.estimatedTime}
                </div>
              </div>
            )}
            
            {/* Timer Progress */}
            <div className="space-y-2">
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-75 ease-linear"
                  style={{ width: `${timerProgress}%` }}
                />
              </div>
              <p className="text-center text-xs text-slate-400">
                Auto-selecting in {Math.ceil((100 - timerProgress) * 0.03)} seconds
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DiceRoller;
