import React from 'react';
import { Loader2 } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

export function Button({ 
  onClick, 
  children, 
  isLoading, 
  disabled,
  variant = 'primary' 
}: ButtonProps) {
  const { isDark } = useThemeStore();

  const getButtonStyles = () => {
    if (isLoading || disabled) {
      return isDark 
        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
        : 'bg-gray-100 text-gray-400 cursor-not-allowed';
    }

    if (variant === 'primary') {
      return isDark
        ? 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700'
        : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800';
    }

    return isDark
      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 active:bg-gray-500'
      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 active:bg-gray-400';
  };

  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`
        px-4 py-2 rounded-lg font-medium transition-all
        ${getButtonStyles()}
      `}
    >
      <div className="flex items-center gap-2">
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </div>
    </button>
  );
}