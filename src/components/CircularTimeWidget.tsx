
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

const CircularTimeWidget = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const seconds = currentTime.getSeconds();
  const minutes = currentTime.getMinutes();
  const hours = currentTime.getHours() % 12;

  // Calculate rotation angles
  const secondAngle = (seconds * 6) - 90; // 6 degrees per second
  const minuteAngle = (minutes * 6) - 90; // 6 degrees per minute
  const hourAngle = (hours * 30 + minutes * 0.5) - 90; // 30 degrees per hour + minute adjustment

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm p-6 w-80 h-80 flex flex-col items-center justify-center relative">
      {/* Circular Clock */}
      <div className="relative w-48 h-48 mb-4">
        {/* Outer circle */}
        <div className="absolute inset-0 rounded-full border-2 border-slate-600/50"></div>
        
        {/* Hour markers */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-6 bg-slate-500"
            style={{
              top: '8px',
              left: '50%',
              transformOrigin: '50% 88px',
              transform: `translateX(-50%) rotate(${i * 30}deg)`
            }}
          />
        ))}

        {/* Clock hands */}
        {/* Hour hand */}
        <div
          className="absolute w-1 bg-white rounded-full shadow-lg transition-transform duration-1000 ease-in-out"
          style={{
            height: '50px',
            top: '46px',
            left: '50%',
            transformOrigin: '50% 50px',
            transform: `translateX(-50%) rotate(${hourAngle}deg)`
          }}
        />
        
        {/* Minute hand */}
        <div
          className="absolute w-0.5 bg-blue-400 rounded-full shadow-lg transition-transform duration-1000 ease-in-out"
          style={{
            height: '70px',
            top: '26px',
            left: '50%',
            transformOrigin: '50% 70px',
            transform: `translateX(-50%) rotate(${minuteAngle}deg)`
          }}
        />
        
        {/* Second hand */}
        <div
          className="absolute w-0.5 bg-red-400 rounded-full shadow-lg transition-transform duration-75"
          style={{
            height: '80px',
            top: '16px',
            left: '50%',
            transformOrigin: '50% 80px',
            transform: `translateX(-50%) rotate(${secondAngle}deg)`
          }}
        />

        {/* Center dot */}
        <div className="absolute w-3 h-3 bg-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg"></div>
      </div>

      {/* Digital time display */}
      <div className="text-center">
        <div className="text-2xl font-bold text-white font-mono tracking-wider mb-1">
          {formatTime(currentTime)}
        </div>
        <div className="text-sm text-slate-400">
          {formatDate(currentTime)}
        </div>
      </div>
    </Card>
  );
};

export default CircularTimeWidget;
