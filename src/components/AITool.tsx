import React from 'react';
import { LucideIcon } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

interface AIToolProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

export function AITool({ icon: Icon, title, description, children, isActive, onClick }: AIToolProps) {
  const { isDark } = useThemeStore();

  const handleClick = (e: React.MouseEvent) => {
    // Only trigger onClick if clicking the header area
    if (!(e.target instanceof HTMLElement) || !e.target.closest('.tool-content')) {
      onClick();
    }
  };

  return (
    <div 
      className={`
        rounded-xl p-6 transition-all duration-300 backdrop-blur-sm
        ${isDark
          ? isActive
            ? 'bg-gray-800/90 shadow-lg scale-100'
            : 'bg-gray-800/50 hover:bg-gray-800/70 hover:shadow-md cursor-pointer scale-95'
          : isActive
            ? 'bg-white/90 shadow-lg scale-100'
            : 'bg-white/50 hover:bg-white/70 hover:shadow-md cursor-pointer scale-95'
        }
      `}
      onClick={handleClick}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-3 rounded-lg ${isDark ? 'bg-blue-500/20' : 'bg-blue-50'}`}>
          <Icon className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
        </div>
        <div>
          <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h2>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {description}
          </p>
        </div>
      </div>
      {isActive && (
        <div className="tool-content mt-4">
          {children}
        </div>
      )}
    </div>
  );
}