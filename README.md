# FITDJ

FITDJ is an immersive iOS fitness experience built with Expo that fuses a personal strength coach with a live DJ set. The MVP focuses on guided strength training sessions while laying the groundwork for advanced voice AI, Spotify streaming, and future workout modalities.

## Getting Started

```bash
npm install
npm run start
```

The project uses [Expo Router](https://expo.github.io/router) for navigation and TypeScript-first development. Before running on device you will need to provide environment variables for Spotify and ElevenLabs. See [docs/API_INTEGRATIONS.md](docs/API_INTEGRATIONS.md) for configuration details.

## Project Structure

```
app/                # Expo Router routes
assets/             # Placeholder brand assets
src/
  components/       # Shared UI elements (cards, timers, overlays)
  hooks/            # Custom hooks such as the workout session engine
  modules/          # Integrations for audio mixing, Spotify, ElevenLabs
  screens/          # Screen-level components for router entries
  store/            # In-memory workout data and providers
  theme/            # Color palette and typography tokens
  utils/            # Helpers
```

## Scripts

- `npm run start` – launches Expo development server
- `npm run lint` – runs ESLint using the shared TypeScript + React config
- `npm run typecheck` – type-checks the project without emitting files

## Documentation

Detailed product, design, and engineering references live in the [docs](./docs) folder:

- [MVP Scope](docs/MVP_SCOPE.md)
- [Architecture Overview](docs/ARCHITECTURE.md)
- [Design System](docs/DESIGN_SYSTEM.md)
- [API Integration Plan](docs/API_INTEGRATIONS.md)
- [Testing Strategy](docs/TESTING_PLAN.md)
- [Timeline & Milestones](docs/TIMELINE.md)

## Status

This repository contains the MVP blueprint with sample workout data, UI scaffolding, and audio integration primitives. Production Spotify and ElevenLabs keys are intentionally omitted and must be supplied securely (for example with Expo config plugins or CI secrets) prior to release.
