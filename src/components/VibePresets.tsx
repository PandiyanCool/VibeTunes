import React from 'react';
import { VibePreset } from '../types';
import { motion } from 'framer-motion';

interface VibePresetsProps {
  presets: VibePreset[];
  onSelectPreset: (preset: VibePreset) => void;
  isLoading: boolean;
}

const VibePresets: React.FC<VibePresetsProps> = ({ presets, onSelectPreset, isLoading }) => {
  return (
    <div className="w-full">
      <h3 className="text-sm font-medium mb-3 text-white/90">Quick Vibes:</h3>
      <div className="flex flex-wrap gap-2">
        {presets.map((preset, index) => (
          <motion.button
            key={preset.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelectPreset(preset)}
            disabled={isLoading}
            className={`${preset.vibe.color} px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 
              transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg
              disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none
              ${preset.vibe.color.includes('bg-yellow') || preset.vibe.color.includes('bg-lime') ? 'text-gray-900' : 'text-white'}`}
          >
            <span className="text-base">{preset.vibe.emoji}</span>
            <span>{preset.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default VibePresets;