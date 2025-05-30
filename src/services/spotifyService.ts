import axios from 'axios';
import { Song, Vibe } from '../types';

class SpotifyService {
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  private async getAccessToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      const response = await axios.post('https://accounts.spotify.com/api/token', 
        new URLSearchParams({
          'grant_type': 'client_credentials'
        }), {
        headers: {
          'Authorization': `Basic ${btoa(`${import.meta.env.VITE_SPOTIFY_CLIENT_ID}:${import.meta.env.VITE_SPOTIFY_CLIENT_SECRET}`)}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      this.accessToken = response.data.access_token;
      this.tokenExpiry = Date.now() + (response.data.expires_in * 1000);
      return this.accessToken;
    } catch (error) {
      console.error('Error getting Spotify access token:', error);
      throw error;
    }
  }

  private mapVibeToAudioFeatures(vibe: string) {
    const featureMap = {
      happy: { valence: 0.8, energy: 0.7, tempo: 120 },
      sad: { valence: 0.2, energy: 0.3, tempo: 80 },
      angry: { valence: 0.3, energy: 0.9, tempo: 140 },
      excited: { valence: 0.8, energy: 0.9, tempo: 130 },
      relaxed: { valence: 0.6, energy: 0.3, tempo: 90 },
      anxious: { valence: 0.3, energy: 0.6, tempo: 110 },
      neutral: { valence: 0.5, energy: 0.5, tempo: 100 },
      romantic: { valence: 0.7, energy: 0.4, tempo: 95 },
      nostalgic: { valence: 0.6, energy: 0.4, tempo: 85 },
      energetic: { valence: 0.7, energy: 0.9, tempo: 135 },
      melancholic: { valence: 0.3, energy: 0.4, tempo: 80 },
      hopeful: { valence: 0.7, energy: 0.5, tempo: 100 },
      fearful: { valence: 0.2, energy: 0.7, tempo: 120 },
      surprised: { valence: 0.6, energy: 0.8, tempo: 125 },
      bored: { valence: 0.4, energy: 0.3, tempo: 90 }
    };
    
    return featureMap[vibe] || featureMap.neutral;
  }

  async getSongRecommendation(vibe: Vibe, language: string = 'en'): Promise<Song> {
    try {
      const token = await this.getAccessToken();
      const features = this.mapVibeToAudioFeatures(vibe.label);
      
      const response = await axios.get('https://api.spotify.com/v1/recommendations', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          limit: 1,
          market: language.toUpperCase(),
          target_valence: features.valence,
          target_energy: features.energy,
          target_tempo: features.tempo,
          min_popularity: 50
        }
      });

      const track = response.data.tracks[0];
      
      return {
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        albumArt: track.album.images[0].url,
        previewUrl: track.preview_url,
        externalUrl: track.external_urls.spotify
      };
    } catch (error) {
      console.error('Error getting song recommendation:', error);
      return {
        id: 'default',
        name: 'Song recommendation unavailable',
        artist: 'Unknown',
        albumArt: 'https://via.placeholder.com/300',
        previewUrl: null,
        externalUrl: 'https://open.spotify.com'
      };
    }
  }
}

export const spotifyService = new SpotifyService();
export const getSongRecommendation = (vibe: Vibe, language: string = 'en') => 
  spotifyService.getSongRecommendation(vibe, language);