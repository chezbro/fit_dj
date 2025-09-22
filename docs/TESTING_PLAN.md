# Testing Strategy

## Automated
- **Unit**: Hooks (`useWorkoutSession`), utility helpers (`formatSeconds`).
- **Integration**: Audio services mocked to ensure queue + mixer interactions behave under sequential prompts.
- **Linting/Type**: `npm run lint` and `npm run typecheck` executed in CI.

## Manual QA
1. **Usability**: Observe 8–10 fitness enthusiasts completing two workouts.
2. **Audio Mixing**: Validate ducking, prompt clarity, and tempo alignment on AirPods + speakers.
3. **Performance**: Test on iPhone 12, iPhone 14 Pro, iPad Mini.
4. **Battery**: Measure drain over 45-minute session vs control (target <15%).
5. **Network Resilience**: Simulate 3G drops; app should gracefully resume playback and queue voice prompts.

## Tooling
- Use Jest + React Native Testing Library for UI/hook coverage.
- Detox for end-to-end flows (future milestone).
- Firebase Crashlytics instrumentation post-MVP.
