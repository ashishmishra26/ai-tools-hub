import React from 'react';
import { useThemeStore } from '../store/themeStore';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  rows?: number;
}

export function TextInput({ value, onChange, placeholder, label, rows = 4 }: TextInputProps) {
  const { isDark } = useThemeStore();

  return (
    <div className="mb-4">
      <label className={`block text-sm font-medium mb-2 ${
        isDark ? 'text-gray-300' : 'text-gray-700'
      }`}>
        {label}
      </label>
      <textarea
        className={`
          w-full px-4 py-2 rounded-lg transition-all resize-none
          ${isDark 
            ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
            : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
          }
        `}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
      />
    </div>
  );
}