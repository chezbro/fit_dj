import { AudioMixer } from './AudioMixer';
import { ElevenLabsClient } from '../voice/ElevenLabsClient';

interface QueueItem {
  text: string;
  voice: string;
}

export class VoiceoverQueue {
  private queue: QueueItem[] = [];
  private playing = false;

  constructor(private mixer: AudioMixer, private elevenLabs: ElevenLabsClient) {}

  enqueue(item: QueueItem) {
    this.queue.push(item);
    if (!this.playing) {
      void this.playNext();
    }
  }

  private async playNext() {
    const next = this.queue.shift();
    if (!next) {
      this.playing = false;
      return;
    }
    this.playing = true;
    const buffer = await this.elevenLabs.synthesize(next.text, next.voice);
    await this.mixer.playVoice(buffer);
    await this.playNext();
  }

  clear() {
    this.queue = [];
  }
}
