# FITDJ MVP Scope

## Workout Library
- 6 curated strength-focused programs across beginner, intermediate, and advanced levels.
- Each program includes warm-up, primary strength blocks, and cooldown.
- Sessions range from 25–40 minutes with emphasis on compound movements and core strength.

## Coaching Intelligence
- Context-aware cue sets written per exercise (encouragement, form, breathing).
- Dynamic prompts triggered at phase changes (warm-up → main, work → rest, cooldown).
- Placeholder ElevenLabs voice configuration with production-ready scripts.

## Music Experience
- Admin-managed Spotify playlists mapped 1:1 with workout IDs.
- Tempo metadata leveraged to align drops with high-intensity phases.
- Auto-ducking and fade logic orchestrated by `AudioMixer`.

## Core Screens
1. **Home** – curated workout carousel with hero CTAs.
2. **Workout Detail** – visual overview, flow breakdown, start CTA.
3. **Session** – live coaching interface with timers, cues, and audio status.

## Out of Scope (post-MVP)
- Health metrics sync (Apple HealthKit).
- User-generated workouts and trainer personalities.
- Android support and offline playback.
- Full video library (current build uses static imagery + voice cues).
