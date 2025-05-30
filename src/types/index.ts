export interface Vibe {
  label: string;
  emoji: string;
  confidence: number;
  color: string;
}

export interface Song {
  id: string;
  name: string;
  artist: string;
  albumArt: string;
  previewUrl: string | null;
  externalUrl: string;
}

export interface VibePreset {
  id: string;
  name: string;
  vibe: Vibe;
}

export interface VibeResponse {
  vibe: Vibe;
  song: Song;
}