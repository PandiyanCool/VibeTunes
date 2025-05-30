import React from 'react';
import { Vibe } from '../types';
import { motion } from 'framer-motion';

interface VibeDisplayProps {
  vibe: Vibe | null;
}

const VibeDisplay: React.FC<VibeDisplayProps> = ({ vibe }) => {
  if (!vibe) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center"
    >
      <div className={`${vibe.color} w-24 h-24 rounded-full flex items-center justify-center text-4xl mb-4`}>
        {vibe.emoji}
      </div>
      <h2 className="text-2xl font-bold capitalize mb-1">{vibe.label}</h2>
      <div className="flex items-center gap-2 mb-4">
        <div className="h-2 w-32 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white" 
            style={{ width: `${vibe.confidence * 100}%` }}
          />
        </div>
        <span className="text-sm">{Math.round(vibe.confidence * 100)}%</span>
      </div>
    </motion.div>
  );
};

export default VibeDisplay;