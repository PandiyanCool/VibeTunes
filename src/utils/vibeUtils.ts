import { Vibe } from '../types';

export const vibeColors = {
  happy: 'bg-yellow-500',
  sad: 'bg-blue-600',
  angry: 'bg-red-600',
  excited: 'bg-orange-500',
  relaxed: 'bg-green-500',
  anxious: 'bg-purple-600',
  neutral: 'bg-gray-500',
  romantic: 'bg-pink-500',
  nostalgic: 'bg-amber-600',
  energetic: 'bg-lime-500',
  melancholic: 'bg-indigo-600',
  hopeful: 'bg-teal-500',
  fearful: 'bg-violet-700',
  surprised: 'bg-cyan-500',
  bored: 'bg-slate-500',
};

export const vibeEmojis = {
  happy: '😊',
  sad: '😢',
  angry: '😠',
  excited: '🤩',
  relaxed: '😌',
  anxious: '😰',
  neutral: '😐',
  romantic: '❤️',
  nostalgic: '🕰️',
  energetic: '⚡',
  melancholic: '🌧️',
  hopeful: '🌈',
  fearful: '😨',
  surprised: '😲',
  bored: '😴',
};

export const vibePresets = [
  { id: 'happy', name: 'Happy', vibe: { label: 'happy', emoji: '😊', confidence: 0.95, color: vibeColors.happy } },
  { id: 'sad', name: 'Sad', vibe: { label: 'sad', emoji: '😢', confidence: 0.95, color: vibeColors.sad } },
  { id: 'relaxed', name: 'Relaxed', vibe: { label: 'relaxed', emoji: '😌', confidence: 0.95, color: vibeColors.relaxed } },
  { id: 'energetic', name: 'Energetic', vibe: { label: 'energetic', emoji: '⚡', confidence: 0.95, color: vibeColors.energetic } },
  { id: 'romantic', name: 'Romantic', vibe: { label: 'romantic', emoji: '❤️', confidence: 0.95, color: vibeColors.romantic } },
];

export const getVibeThemeClasses = (vibe: Vibe | null): { bg: string, text: string, border: string } => {
  if (!vibe) {
    return {
      bg: 'bg-gradient-to-br from-slate-800 to-slate-900',
      text: 'text-white',
      border: 'border-slate-700'
    };
  }

  const baseColor = vibe.color.replace('bg-', '');
  const [colorName, intensity] = baseColor.split('-');
  const colorIntensity = parseInt(intensity);

  return {
    bg: `bg-gradient-to-br from-${colorName}-${colorIntensity} via-${colorName}-${Math.min(colorIntensity + 100, 900)} to-${colorName}-${Math.min(colorIntensity + 200, 900)}`,
    text: colorIntensity <= 500 ? 'text-gray-900' : 'text-white',
    border: `border-${colorName}-${Math.min(colorIntensity + 100, 900)}`
  };
};