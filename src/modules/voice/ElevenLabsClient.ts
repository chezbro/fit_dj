import axios from 'axios';
import { Audio } from 'expo-av';
import Constants from 'expo-constants';
import { Buffer } from 'buffer';

const API_BASE = 'https://api.elevenlabs.io/v1';

export class ElevenLabsClient {
  private apiKey = Constants.expoConfig?.extra?.elevenLabsApiKey ?? '';
  private defaultVoice = Constants.expoConfig?.extra?.defaultVoiceId ?? '';

  async synthesize(text: string, voiceId = this.defaultVoice) {
    if (!this.apiKey) {
      console.warn('Missing ElevenLabs API key, returning silent buffer');
      return null;
    }

    const response = await axios.post(
      `${API_BASE}/text-to-speech/${voiceId}`,
      {
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.4,
          similarity_boost: 0.7,
          style: 0.35,
          use_speaker_boost: true,
        },
      },
      {
        headers: {
          'xi-api-key': this.apiKey,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
      },
    );

    const base64 = Buffer.from(response.data, 'binary').toString('base64');
    const { sound } = await Audio.Sound.createAsync({ uri: `data:audio/mpeg;base64,${base64}` });
    return sound;
  }
}
