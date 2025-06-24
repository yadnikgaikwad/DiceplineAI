
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

const GitHubCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Mock data for task completion - in a real app this would come from your task data
  const taskCompletionData = {
    '2024-12-01': { completed: 5, total: 5 }, // All tasks completed - green
    '2024-12-02': { completed: 3, total: 4 }, // Some incomplete - orange
    '2024-12-03': { completed: 2, total: 2 }, // All completed - green
    '2024-12-15': { completed: 4, total: 6 }, // Some incomplete - orange
    '2024-12-20': { completed: 1, total: 1 }, // All completed - green
    '2024-12-24': { completed: 0, total: 3 }, // None completed - red
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getTaskStatus = (day: number | null) => {
    if (!day) return null;
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const dateKey = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    
    const dayData = taskCompletionData[dateKey];
    if (!dayData) return 'none';
    
    if (dayData.completed === dayData.total) return 'completed';
    if (dayData.completed > 0) return 'partial';
    return 'incomplete';
  };

  const getCellColor = (status: string | null) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 hover:bg-green-600 border-green-400';
      case 'partial':
        return 'bg-orange-500 hover:bg-orange-600 border-orange-400';
      case 'incomplete':
        return 'bg-red-500 hover:bg-red-600 border-red-400';
      case 'none':
      default:
        return 'bg-slate-700 hover:bg-slate-600 border-slate-600';
    }
  };

  const getTooltipText = (day: number | null, status: string | null) => {
    if (!day) return '';
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const dateKey = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const dayData = taskCompletionData[dateKey];
    
    const dateText = `${monthNames[currentDate.getMonth()]} ${day}, ${year}`;
    
    if (!dayData) {
      return `${dateText}\nNo tasks`;
    }
    
    return `${dateText}\n${dayData.completed}/${dayData.total} tasks completed`;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const days = getDaysInMonth(currentDate);

  return (
    <TooltipProvider>
      <div className="space-y-3">
        {/* Month Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth('prev')}
            className="h-8 w-8 p-0 hover:bg-slate-700"
          >
            <ChevronLeft className="h-4 w-4 text-slate-400" />
          </Button>
          
          <h3 className="text-white font-medium text-sm">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth('next')}
            className="h-8 w-8 p-0 hover:bg-slate-700"
          >
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </Button>
        </div>

        {/* Week Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {weekDays.map((day, index) => (
            <div key={index} className="text-xs text-slate-400 text-center font-medium h-6 flex items-center justify-center">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const status = getTaskStatus(day);
            const cellColor = getCellColor(status);
            const tooltipText = getTooltipText(day, status);
            
            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <div
                    className={`w-6 h-6 border rounded-sm transition-all duration-200 cursor-pointer ${cellColor} ${
                      day ? 'hover:scale-110' : 'cursor-default hover:scale-100'
                    }`}
                  >
                  </div>
                </TooltipTrigger>
                {day && (
                  <TooltipContent 
                    side="top" 
                    className="bg-slate-900 border-slate-700 text-white text-xs whitespace-pre-line"
                  >
                    {tooltipText}
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mt-3">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-slate-700 border border-slate-600 rounded-sm"></div>
            <div className="w-3 h-3 bg-red-500 border border-red-400 rounded-sm"></div>
            <div className="w-3 h-3 bg-orange-500 border border-orange-400 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-500 border border-green-400 rounded-sm"></div>
          </div>
          <span>More</span>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default GitHubCalendar;
