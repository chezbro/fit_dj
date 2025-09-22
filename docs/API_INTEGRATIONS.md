# API Integration Plan

## ElevenLabs
- Use `/text-to-speech` endpoint with `eleven_multilingual_v2` model.
- Configure voice presets per trainer persona; MVP uses `defaultVoiceId` defined via Expo config.
- Stream audio using `arraybuffer` response and load into Expo `Audio.Sound`.
- Cache frequently used prompts locally to reduce latency.
- Queue prompts in `VoiceoverQueue` to avoid overlap.

### Environment Variables
| Key | Description |
| --- | --- |
| `elevenLabsApiKey` | API key for authenticated calls |
| `defaultVoiceId` | Voice preset ID |

## Spotify
- Authentication: refresh token grant flow stored in secure backend/Firebase function.
- Metadata: Spotify Web API fetches playlist items + audio features (tempo, energy).
- Playback: Use Spotify iOS SDK inside Expo custom dev client for premium accounts.
- Adaptive tempo: map `tempo` to workout intensity to inform track transitions.

### Environment Variables
| Key | Description |
| --- | --- |
| `spotifyClientId` | Spotify app client ID |
| `spotifyClientSecret` | Spotify app secret (never shipped in client) |
| `spotifyRefreshToken` | Service account refresh token |

## Firebase
- Auth: Email + Apple Sign-In planned for post-MVP.
- Firestore: store user preferences, progression, and playlist overrides.
- Functions: secure proxy for Spotify token exchange and ElevenLabs key rotation.

## Secure Key Management
- Use Expo config plugins to inject runtime secrets via `app.config.ts` sourced from CI.
- For production, rely on Firebase Functions to proxy Spotify/ElevenLabs requests to keep secrets off device.
- Implement remote config for feature flagging new workout types and trainer personalities.
