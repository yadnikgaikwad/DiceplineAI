
import { useState, useEffect } from 'react';

const NavbarDots = () => {
  const [animatedDots, setAnimatedDots] = useState<boolean[]>(Array(8).fill(false));

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setAnimatedDots(prev => {
        const newDots = [...prev];
        const randomIndex = Math.floor(Math.random() * newDots.length);
        newDots[randomIndex] = !newDots[randomIndex];
        return newDots;
      });
    }, 400);

    return () => clearInterval(dotInterval);
  }, []);

  return (
    <div className="flex items-center space-x-1">
      {animatedDots.map((isActive, index) => (
        <div
          key={index}
          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
            isActive 
              ? 'bg-green-400 shadow-lg shadow-green-400/50 scale-125' 
              : 'bg-slate-600'
          }`}
        />
      ))}
      <div className="ml-2 text-xs text-slate-500">
        Live
      </div>
    </div>
  );
};

export default NavbarDots;
