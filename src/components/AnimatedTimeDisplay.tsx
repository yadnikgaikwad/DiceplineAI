
import { useState, useEffect } from 'react';

const AnimatedTimeDisplay = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [animatedDots, setAnimatedDots] = useState<boolean[]>(Array(20).fill(false));

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setAnimatedDots(prev => {
        const newDots = [...prev];
        const randomIndex = Math.floor(Math.random() * newDots.length);
        newDots[randomIndex] = !newDots[randomIndex];
        return newDots;
      });
    }, 300);

    return () => clearInterval(dotInterval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col space-y-1">
          <div className="text-2xl font-bold text-white font-mono tracking-wider">
            {formatTime(currentTime)}
          </div>
          <div className="text-sm text-slate-400">
            {formatDate(currentTime)}
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          {animatedDots.map((isActive, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                isActive 
                  ? 'bg-green-400 shadow-lg shadow-green-400/50 scale-125' 
                  : 'bg-slate-600'
              }`}
            />
          ))}
        </div>
      </div>
      
      <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
        <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
        Live Dashboard
      </div>
    </div>
  );
};

export default AnimatedTimeDisplay;
