import React from 'react';
import { motion } from 'framer-motion';

const LoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-16 h-16 mb-4 flex items-center justify-center"
      >
        <div className="w-full h-full rounded-full border-4 border-white/20 border-t-white/80" />
      </motion.div>
      <p className="text-white/70">Analyzing your vibe...</p>
    </div>
  );
};

export default LoadingState;