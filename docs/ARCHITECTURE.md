# Architecture Overview

```
┌─────────────────────┐
│       Screens       │
│ Home · Detail · Run │
└─────────┬───────────┘
          │
┌─────────▼───────────┐
│    Presentation      │
│ Components & Hooks   │
└─────────┬───────────┘
          │
┌─────────▼───────────┐        ┌────────────────────┐
│   Domain / Store    │◀──────▶│    Audio Context    │
│ WorkoutProvider     │        │ AudioMixer · Queue  │
└─────────┬───────────┘        └────────────────────┘
          │
┌─────────▼───────────┐        ┌────────────────────┐        ┌────────────────────┐
│  Integrations       │────────▶│ ElevenLabs Client  │        │ Spotify Controller │
│ Firebase · Future   │        └────────────────────┘        └────────────────────┘
└─────────────────────┘
```

## Key Modules

### `AudioMixer`
Controls simultaneous playback of Spotify music and ElevenLabs voice prompts. Provides fade/duck transitions to maintain immersion.

### `VoiceoverQueue`
Queues contextual prompts generated from workout state. Prevents overlapping voice clips and ensures the music resumes once speech completes.

### `SpotifyController`
Responsible for playlist hydration, tempo metadata lookups, and instructing `AudioMixer` to transition tracks. Uses Spotify Web API for metadata and expects iOS SDK for playback in production builds.

### `useWorkoutSession`
State machine that sequences exercises, rest intervals, and session progress. Provides timer state and triggers audio cues.

## Data Flow
1. User selects a routine on **Home**.
2. **Workout Detail** surfaces warm-up, main sets, and cooldown data from the store.
3. **Session Screen** mounts `useWorkoutSession`, which:
   - Feeds prompts to `VoiceoverQueue`.
   - Signals `SpotifyController` when intensity changes (future enhancement).
   - Exposes progress/time for UI components.

## Future Expansion Hooks
- Swap in Firebase for remote workout catalog + personalization.
- Add analytics middleware for session completion tracking.
- Introduce `TrainerProfile` abstraction enabling multiple voice personas.
