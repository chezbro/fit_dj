# Design System

## Brand
- **Logo**: Wordmark + waveform mark (placeholder assets in `assets/`).
- **Tone**: Modern, energetic, confident.

## Color Palette
| Token | Hex | Usage |
| --- | --- | --- |
| Primary | `#1A2151` | Background gradient base, buttons |
| Secondary | `#FF5A5F` | CTA buttons, emphasis states |
| Accent | `#4ECDC4` | Live metrics, icons |
| Surface | `#1D244A` | Cards, overlays |
| Text Primary | `#FFFFFF` | Headlines |
| Text Secondary | `#C5C9E6` | Body copy |

Both light and dark themes will inherit contrast ratios ≥ 4.5:1 for body text.

## Typography
- **Display**: SF Pro Display Semibold 28px / 34px
- **Headline**: SF Pro Display Semibold 22px / 28px
- **Body**: SF Pro Text Regular 16px / 22px
- **Caption**: SF Pro Text Regular 13px / 18px (uppercase for metadata)

## Components
- **Workout Card**: gradient background, flame badge for intensity.
- **Session Header**: progress bar synced with `useWorkoutSession`.
- **Voice Overlay**: floating translucent card surfacing trainer speech.
- **Countdown Timer**: animated numeric countdown with letterspaced digits.

## Motion & Interaction
- Crossfade transitions between screens.
- Audio-reactive pulses (future) for beat-synced glow behind timers.
- Buttons use scale + ripple feedback for instant response.

## Accessibility
- Text size minimum 16px.
- Voiceover prompts mirror on-screen text for parity.
- Haptics to be added during high-intensity transitions.
