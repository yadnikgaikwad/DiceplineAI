
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const GitHubCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Mock data for task completion - in a real app this would come from your task data
  const taskCompletionData = {
    '2024-12-01': { completed: 5, total: 5 }, // All tasks completed - green
    '2024-12-02': { completed: 3, total: 4 }, // Some incomplete - grey
    '2024-12-03': { completed: 2, total: 2 }, // All completed - green
    '2024-12-15': { completed: 4, total: 6 }, // Some incomplete - grey
    '2024-12-20': { completed: 1, total: 1 }, // All completed - green
    '2024-12-24': { completed: 0, total: 3 }, // None completed - grey
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
    
    return dayData.completed === dayData.total ? 'completed' : 'incomplete';
  };

  const getCellColor = (status: string | null) => {
    switch (status) {
      case 'completed':
        return 'bg-green-600 border-green-500';
      case 'incomplete':
        return 'bg-slate-600 border-slate-500';
      case 'none':
      default:
        return 'bg-slate-800 border-slate-700';
    }
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
    <div className="space-y-4">
      {/* Month Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-1 rounded hover:bg-slate-700 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 text-slate-400" />
        </button>
        
        <h3 className="text-white font-medium">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        
        <button
          onClick={() => navigateMonth('next')}
          className="p-1 rounded hover:bg-slate-700 transition-colors"
        >
          <ChevronRight className="h-4 w-4 text-slate-400" />
        </button>
      </div>

      {/* Week Day Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day, index) => (
          <div key={index} className="text-xs text-slate-400 text-center font-medium">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const status = getTaskStatus(day);
          const cellColor = getCellColor(status);
          
          return (
            <div
              key={index}
              className={`w-8 h-8 border rounded-sm flex items-center justify-center transition-colors ${cellColor}`}
            >
              {day && (
                <span className="text-xs text-white font-medium">
                  {day}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 text-xs text-slate-400 mt-4">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-slate-800 border border-slate-700 rounded-sm"></div>
          <div className="w-3 h-3 bg-slate-600 border border-slate-500 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-600 border border-green-500 rounded-sm"></div>
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

export default GitHubCalendar;
