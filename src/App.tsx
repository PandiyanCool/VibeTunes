import React, { useState, useEffect } from 'react';
import { Vibe, Song, VibePreset, VibeResponse } from './types';
import { analyzeEmotion } from './services/openaiService';
import { getSongRecommendation } from './services/spotifyService';
import { getVibeThemeClasses, vibePresets } from './utils/vibeUtils';
import Header from './components/Header';
import TextInput from './components/TextInput';
import VibeDisplay from './components/VibeDisplay';
import SongRecommendation from './components/SongRecommendation';
import VibePresets from './components/VibePresets';
import LoadingState from './components/LoadingState';
import { Music } from 'lucide-react';

function App() {
  const [vibe, setVibe] = useState<Vibe | null>(null);
  const [song, setSong] = useState<Song | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleTextSubmit = async (text: string, language: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const detectedVibe = await analyzeEmotion(text, language);
      const recommendedSong = await getSongRecommendation(detectedVibe, language);
      
      setVibe(detectedVibe);
      setSong(recommendedSong);
    } catch (err) {
      setError('Failed to analyze your vibe. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePresetSelect = async (preset: VibePreset) => {
    setIsLoading(true);
    setError(null);
    
    try {
      setVibe(preset.vibe);
      const recommendedSong = await getSongRecommendation(preset.vibe);
      setSong(recommendedSong);
    } catch (err) {
      setError('Failed to get song recommendations. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const themeClasses = getVibeThemeClasses(vibe);
  
  return (
    <div className={`min-h-screen transition-colors duration-1000 ease-in-out ${themeClasses.bg}`}>
      <div className="w-full max-w-4xl px-6 py-8 mx-auto">
        <Header />
        
        <main className="mt-8 flex flex-col items-center">
          <div className="w-full max-w-2xl mb-8">
            <h2 className="text-3xl font-bold text-center mb-6 text-white">
              Discover Music That Matches Your Mood
            </h2>
            <p className="text-center text-white/80 mb-8">
              Share how you're feeling, and we'll recommend the perfect song to match your vibe.
            </p>
            
            <TextInput onSubmit={handleTextSubmit} isLoading={isLoading} />
            
            <div className="mt-6">
              <VibePresets presets={vibePresets} onSelectPreset={handlePresetSelect} isLoading={isLoading} />
            </div>
          </div>
          
          {isLoading ? (
            <LoadingState />
          ) : error ? (
            <div className="text-red-400 p-4 bg-red-900/20 rounded-lg">
              {error}
            </div>
          ) : vibe && song ? (
            <div className="flex flex-col items-center gap-8 w-full">
              <VibeDisplay vibe={vibe} />
              <SongRecommendation song={song} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 opacity-60">
              <Music size={64} className="mb-4 text-white/50" />
              <p className="text-white/70 text-center">
                Enter some text or select a vibe preset to get started
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;