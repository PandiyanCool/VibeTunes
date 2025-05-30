import React from 'react';
import { Music } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Music size={28} className="text-white" />
        <h1 className="text-2xl font-bold text-white">VibeTunes</h1>
      </div>
      <div className="text-sm text-white/70">
        Emotion-based music recommendations
      </div>
    </header>
  );
};

export default Header;