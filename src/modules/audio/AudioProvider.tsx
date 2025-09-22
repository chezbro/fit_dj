import { ReactNode, createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Audio } from 'expo-av';
import { AudioMixer } from './AudioMixer';
import { VoiceoverQueue } from './VoiceoverQueue';
import { ElevenLabsClient } from '../voice/ElevenLabsClient';
import { SpotifyController } from '../music/SpotifyController';

interface AudioContextValue {
  isReady: boolean;
  mixer: AudioMixer | null;
  voiceQueue: VoiceoverQueue | null;
  spotify: SpotifyController | null;
}

const AudioContext = createContext<AudioContextValue | undefined>(undefined);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [isReady, setIsReady] = useState(false);
  const mixerRef = useRef<AudioMixer | null>(null);
  const voiceRef = useRef<VoiceoverQueue | null>(null);
  const spotifyRef = useRef<SpotifyController | null>(null);

  useEffect(() => {
    const setup = async () => {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
      });
      const mixer = new AudioMixer();
      const elevenLabs = new ElevenLabsClient();
      const voiceQueue = new VoiceoverQueue(mixer, elevenLabs);
      const spotify = new SpotifyController(mixer);
      mixerRef.current = mixer;
      voiceRef.current = voiceQueue;
      spotifyRef.current = spotify;
      setIsReady(true);
    };

    setup();
  }, []);

  const value = useMemo(
    () => ({
      isReady,
      mixer: mixerRef.current,
      voiceQueue: voiceRef.current,
      spotify: spotifyRef.current,
    }),
    [isReady],
  );

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};

export const useAudio = () => {
  const ctx = useContext(AudioContext);
  if (!ctx) {
    throw new Error('useAudio must be used inside AudioProvider');
  }
  return ctx;
};
