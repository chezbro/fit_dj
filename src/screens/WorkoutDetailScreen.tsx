import { useLocalSearchParams, useRouter } from 'expo-router';
import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { GradientBackground } from '@/components/GradientBackground';
import { ExerciseList } from '@/components/ExerciseList';
import { useTheme } from '@/theme/useTheme';
import { useWorkouts } from '@/store/workouts/WorkoutProvider';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const WorkoutDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getWorkoutById } = useWorkouts();
  const workout = id ? getWorkoutById(id) : undefined;
  const { colors, typography } = useTheme();
  const router = useRouter();

  if (!workout) {
    return (
      <GradientBackground>
        <View style={styles.centered}> 
          <Text style={[typography.headline, { color: colors.textPrimary }]}>Workout not found</Text>
        </View>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <ImageBackground
          source={{ uri: workout.heroImage }}
          style={styles.hero}
          imageStyle={{ borderRadius: 24 }}
        >
          <View style={[styles.overlay, { backgroundColor: '#00000066' }]}>
            <Text style={[typography.caption, { color: colors.accent }]}>{workout.focus}</Text>
            <Text style={[typography.display, { color: colors.textPrimary }]}>{workout.title}</Text>
            <View style={styles.heroMeta}>
              <View style={styles.metaRow}>
                <Ionicons name="time-outline" size={16} color={colors.accent} />
                <Text style={[typography.caption, { color: colors.textSecondary }]}>
                  {workout.duration} mins
                </Text>
              </View>
              <View style={styles.metaRow}>
                <Ionicons name="barbell" size={16} color={colors.accent} />
                <Text style={[typography.caption, { color: colors.textSecondary }]}>
                  {workout.level}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
        <Text style={[typography.body, { color: colors.textSecondary, marginVertical: 16 }]}>
          {workout.description}
        </Text>
        <Text style={[typography.headline, { color: colors.textPrimary, marginBottom: 12 }]}>
          Session Flow
        </Text>
        <ExerciseList blocks={[workout.warmup, ...workout.mainSets, workout.cooldown]} />
        <TouchableOpacity
          onPress={() => router.push(`/session/${workout.id}`)}
          style={[styles.cta, { backgroundColor: colors.secondary }]}
        >
          <Text style={[typography.headline, { color: colors.textPrimary }]}>Start Session</Text>
          <Ionicons name="play" size={20} color={colors.textPrimary} />
        </TouchableOpacity>
      </ScrollView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    gap: 12,
  },
  hero: {
    height: 240,
    justifyContent: 'flex-end',
  },
  overlay: {
    borderRadius: 24,
    padding: 20,
    gap: 12,
  },
  heroMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    paddingVertical: 16,
    gap: 8,
    marginTop: 24,
  },
});
