import React, { useState, useRef } from 'react';
import { Play, Pause, ExternalLink } from 'lucide-react';
import { Song } from '../types';
import { motion } from 'framer-motion';

interface SongRecommendationProps {
  song: Song | null;
}

const SongRecommendation: React.FC<SongRecommendationProps> = ({ song }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  if (!song) return null;

  const togglePlay = () => {
    if (!audioRef.current || !song.previewUrl) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-lg overflow-hidden border border-white/20"
    >
      {song.previewUrl && (
        <audio 
          ref={audioRef} 
          src={song.previewUrl} 
          onEnded={handleAudioEnd}
        />
      )}
      
      <div className="flex items-center p-4">
        <div className="flex-shrink-0 mr-4">
          <img 
            src={song.albumArt} 
            alt={`${song.name} album art`} 
            className="w-20 h-20 object-cover rounded-md shadow-lg"
          />
        </div>
        
        <div className="flex-1">
          <h3 className="font-bold text-lg line-clamp-1">{song.name}</h3>
          <p className="text-sm opacity-80 mb-2">{song.artist}</p>
          
          <div className="flex items-center gap-2">
            {song.previewUrl && (
              <button 
                onClick={togglePlay}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
            )}
            
            <a 
              href={song.externalUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs opacity-80 hover:opacity-100 transition-opacity"
            >
              <span>Open in Spotify</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SongRecommendation;