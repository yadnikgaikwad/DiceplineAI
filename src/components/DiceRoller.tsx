
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
  const { toast } = useToast();

  const getDiceIcon = (value: number) => {
    const icons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];
    const IconComponent = icons[value - 1];
    return <IconComponent className="w-12 h-12 text-gray-800" />;
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
  };

  const handleAddToTask = () => {
    if (selectedStep) {
      setShowResult(false);
      onStepSelected(selectedStep);
      toast({
        title: "Task selected!",
        description: `Focus on: "${selectedStep.title}"`
      });
    }
  };

  const handleRollAgain = () => {
    setShowResult(false);
    setDiceResults([]);
    setSelectedStep(null);
    rollDice();
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
                w-16 h-16 bg-white border-2 border-gray-800 rounded-lg 
                flex items-center justify-center transition-all duration-300 shadow-lg
                ${isRolling ? 'animate-bounce' : ''}
              `}
            >
              {isRolling ? (
                <div className="w-3 h-3 bg-gray-800 rounded-full animate-pulse" />
              ) : diceResults[index] ? (
                getDiceIcon(diceResults[index])
              ) : (
                <div className="w-8 h-8 border-2 border-gray-400 rounded border-dashed" />
              )}
            </div>
          ))}
        </div>
        
        {/* Roll Button */}
        <Button
          onClick={rollDice}
          disabled={isRolling || steps.length === 0}
          className="bg-gray-900 hover:bg-gray-800 text-white border border-gray-700 px-6 py-2"
        >
          {isRolling ? 'Rolling...' : 'Roll Dice'}
        </Button>
      </div>
      
      <p className="text-center text-sm text-gray-600">
        {steps.length === 0 
          ? "Generate tasks to use the dice roller"
          : `${numDice} dice for ${steps.length} tasks`
        }
      </p>

      {/* Result Dialog */}
      <Dialog open={showResult} onOpenChange={setShowResult}>
        <DialogContent className="bg-white border-2 border-gray-800 max-w-md shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-gray-900 text-center font-bold">Task Selected!</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Dice Result */}
            <div className="flex justify-center gap-3">
              {diceResults.map((result, index) => (
                <div key={index} className="w-16 h-16 bg-white border-2 border-gray-800 rounded-lg flex items-center justify-center shadow-lg">
                  {getDiceIcon(result)}
                </div>
              ))}
            </div>
            
            {/* Selected Task */}
            {selectedStep && (
              <div className="text-center space-y-2 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h3 className="text-gray-900 font-semibold text-lg">{selectedStep.title}</h3>
                <p className="text-gray-700 text-sm">{selectedStep.description}</p>
                <div className="text-xs text-gray-600 font-medium">
                  Estimated time: {selectedStep.estimatedTime}
                </div>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex gap-3 justify-center">
              <Button 
                onClick={handleAddToTask}
                className="bg-gray-900 hover:bg-gray-800 text-white border border-gray-700 px-6"
              >
                Add to Task
              </Button>
              <Button 
                onClick={handleRollAgain}
                variant="outline"
                className="border-gray-800 text-gray-900 hover:bg-gray-100 px-6"
              >
                Roll Again
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DiceRoller;
