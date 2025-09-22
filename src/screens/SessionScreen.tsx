import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { GradientBackground } from '@/components/GradientBackground';
import { useWorkouts } from '@/store/workouts/WorkoutProvider';
import { SessionHeader } from '@/components/SessionHeader';
import { CountdownTimer } from '@/components/CountdownTimer';
import { PlaybackControls } from '@/components/PlaybackControls';
import { VoiceOverlay } from '@/components/VoiceOverlay';
import { useTheme } from '@/theme/useTheme';
import { useWorkoutSession } from '@/hooks/useWorkoutSession';
import { useEffect, useMemo } from 'react';
import { useAudio } from '@/modules/audio/AudioProvider';

export const SessionScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getWorkoutById } = useWorkouts();
  const workout = id ? getWorkoutById(id) : undefined;
  const session = useWorkoutSession(workout);
  const { colors, typography } = useTheme();
  const { spotify, voiceQueue } = useAudio();

  useEffect(() => {
    if (!workout || !spotify) return;
    spotify.loadPlaylist(workout.spotifyPlaylistId).then(() => spotify.playCurrentTrack());
  }, [spotify, workout]);

  useEffect(() => {
    if (!session.state || !voiceQueue) return;
    const { exercise, isResting } = session.state;
    const prompt = isResting
      ? `Great work on ${exercise.name}! Focus on your breath during this rest interval.`
      : `Next up: ${exercise.name}. ${exercise.cues.join('. ')}`;
    voiceQueue.enqueue({ text: prompt, voice: 'trainer' });
  }, [session.state, voiceQueue]);

  const transcript = useMemo(() => session.state?.exercise.cues[0] ?? '', [session.state]);

  if (!workout || !session.state) {
    return (
      <GradientBackground>
        <View style={styles.centered}> 
          <Text style={[typography.headline, { color: colors.textPrimary }]}>Loading session…</Text>
        </View>
      </GradientBackground>
    );
  }

  const { exercise, currentPhase, progress, secondsRemaining, isResting } = session.state;

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <SessionHeader
          title={exercise.name}
          currentPhase={currentPhase.toUpperCase()}
          progress={progress}
          timeRemaining={session.formattedTimeRemaining}
        />
        <View style={styles.cueCard}>
          <Text style={[typography.caption, { color: colors.accent }]}>
            {isResting ? 'Rest' : 'Coaching Cue'}
          </Text>
          <Text style={[typography.body, { color: colors.textPrimary }]}>{exercise.cues[0]}</Text>
          <Text style={[typography.caption, { color: colors.textSecondary }]}>Next: {exercise.cues[1] ?? 'Stay strong'}</Text>
        </View>
        <CountdownTimer seconds={secondsRemaining} isRunning={session.isPlaying} />
        <PlaybackControls
          isPlaying={session.isPlaying}
          onTogglePlay={session.togglePlayback}
          onSkip={session.skipExercise}
        />
      </ScrollView>
      <VoiceOverlay transcript={transcript} intensity={session.isPlaying ? 1 : 0.3} />
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 24,
    paddingBottom: 120,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cueCard: {
    borderRadius: 18,
    padding: 20,
    gap: 12,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
});
