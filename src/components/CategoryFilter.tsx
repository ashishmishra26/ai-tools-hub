import React from 'react';
import { useThemeStore } from '../store/themeStore';
import type { ModelCategory } from '../types/models';

interface CategoryFilterProps {
  selectedCategory: ModelCategory;
  onCategoryChange: (category: ModelCategory) => void;
}

const categories: { value: ModelCategory; label: string }[] = [
  { value: 'all', label: 'All Models' },
  { value: 'text', label: 'Text' },
  { value: 'image', label: 'Image' },
  { value: 'audio', label: 'Audio' },
  { value: 'analysis', label: 'Analysis' },
  { value: 'creative', label: 'Creative' },
];

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const { isDark } = useThemeStore();

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      {categories.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onCategoryChange(value)}
          className={`
            px-4 py-2 rounded-full transition-all text-sm font-medium
            ${selectedCategory === value
              ? isDark
                ? 'bg-blue-500 text-white'
                : 'bg-blue-600 text-white'
              : isDark
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm'
            }
          `}
        >
          {label}
        </button>
      ))}
    </div>
  );
}