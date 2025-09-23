import Constants from 'expo-constants';
import axios from 'axios';
import { Buffer } from 'buffer';
import { AudioMixer } from '../audio/AudioMixer';

interface SpotifyTrack {
  uri: string;
  tempo: number;
  name: string;
}

interface SpotifyPlaylistItem {
  track: {
    uri: string;
    name: string;
    id: string;
  };
}

interface SpotifyPlaylistResponse {
  items: SpotifyPlaylistItem[];
}

interface SpotifyAudioFeaturesResponse {
  tempo: number;
}

export class SpotifyController {
  private accessToken: string | null = null;
  private playlist: SpotifyTrack[] = [];
  private currentIndex = 0;

  constructor(private mixer: AudioMixer) {}

  async connect() {
    const clientId = Constants.expoConfig?.extra?.spotifyClientId;
    const refreshToken = Constants.expoConfig?.extra?.spotifyRefreshToken;
    const clientSecret = Constants.expoConfig?.extra?.spotifyClientSecret;
    if (!clientId || !refreshToken || !clientSecret) {
      console.warn('Spotify credentials missing');
      return;
    }
    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refreshToken }),
      {
        headers: {
          Authorization: `Basic ${basic}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    this.accessToken = response.data.access_token;
  }

  async loadPlaylist(playlistId: string) {
    if (!this.accessToken) {
      await this.connect();
    }
    if (!this.accessToken) return;
    const response = await axios.get<SpotifyPlaylistResponse>(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
        params: { fields: 'items(track(uri,name,id))' },
      },
    );
    this.playlist = await Promise.all(
      response.data.items.map(async (item) => {
        const audioFeatures = await axios.get<SpotifyAudioFeaturesResponse>(
          `https://api.spotify.com/v1/audio-features/${item.track.id}`,
          { headers: { Authorization: `Bearer ${this.accessToken}` } },
        );
        return {
          uri: item.track.uri,
          tempo: audioFeatures.data.tempo,
          name: item.track.name,
        } satisfies SpotifyTrack;
      }),
    );
    this.currentIndex = 0;
  }

  getCurrentTrack() {
    return this.playlist[this.currentIndex];
  }

  async playCurrentTrack() {
    const track = this.getCurrentTrack();
    if (!track) return;
    // Placeholder: Real implementation should stream through Spotify SDK.
    await this.mixer.loadMusic(track.uri);
    await this.mixer.playMusic();
  }

  async nextTrack() {
    if (!this.playlist.length) return;
    this.currentIndex = (this.currentIndex + 1) % this.playlist.length;
    await this.playCurrentTrack();
  }
}
