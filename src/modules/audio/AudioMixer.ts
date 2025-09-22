import { Audio, AVPlaybackStatusToSet } from 'expo-av';

const VOICE_TRACK = 'voice';
const MUSIC_TRACK = 'music';

export class AudioMixer {
  private channels: Record<string, Audio.Sound | null> = {
    [VOICE_TRACK]: null,
    [MUSIC_TRACK]: null,
  };
  private targetMusicVolume = 1;
  private duckedMusicVolume = 0.35;

  async loadMusic(uri: string) {
    await this.unloadChannel(MUSIC_TRACK);
    const { sound } = await Audio.Sound.createAsync({ uri }, {}, false);
    this.channels[MUSIC_TRACK] = sound;
  }

  async playMusic(status: AVPlaybackStatusToSet = { shouldPlay: true }) {
    const sound = this.channels[MUSIC_TRACK];
    if (!sound) return;
    await sound.setIsLoopingAsync(true);
    await sound.setVolumeAsync(this.targetMusicVolume);
    await sound.setStatusAsync(status);
  }

  async fadeOutMusic(duration = 600) {
    const sound = this.channels[MUSIC_TRACK];
    if (!sound) return;
    const step = this.targetMusicVolume / (duration / 50);
    for (let volume = this.targetMusicVolume; volume >= this.duckedMusicVolume; volume -= step) {
      await sound.setVolumeAsync(Math.max(volume, this.duckedMusicVolume));
      await delay(50);
    }
  }

  async restoreMusic(duration = 600) {
    const sound = this.channels[MUSIC_TRACK];
    if (!sound) return;
    const step = (this.targetMusicVolume - this.duckedMusicVolume) / (duration / 50);
    for (let volume = this.duckedMusicVolume; volume <= this.targetMusicVolume; volume += step) {
      await sound.setVolumeAsync(Math.min(volume, this.targetMusicVolume));
      await delay(50);
    }
  }

  async playVoice(buffer: Audio.Sound | null) {
    await this.fadeOutMusic();
    if (!buffer) return;
    this.channels[VOICE_TRACK] = buffer;
    await buffer.playAsync();
    buffer.setOnPlaybackStatusUpdate(async (status) => {
      if (!status.isLoaded) return;
      if (status.didJustFinish) {
        await this.restoreMusic();
        await buffer.unloadAsync();
        this.channels[VOICE_TRACK] = null;
      }
    });
  }

  get musicSound() {
    return this.channels[MUSIC_TRACK];
  }

  private async unloadChannel(name: string) {
    const sound = this.channels[name];
    if (sound) {
      await sound.unloadAsync();
      this.channels[name] = null;
    }
  }
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
