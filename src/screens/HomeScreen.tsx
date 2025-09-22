import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { GradientBackground } from '@/components/GradientBackground';
import { WorkoutCard } from '@/components/WorkoutCard';
import { useTheme } from '@/theme/useTheme';
import { useWorkouts } from '@/store/workouts/WorkoutProvider';
import { Ionicons } from '@expo/vector-icons';

export const HomeScreen = () => {
  const { colors, typography } = useTheme();
  const { workouts } = useWorkouts();

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View>
            <Text style={[typography.caption, { color: colors.textSecondary }]}>Welcome to</Text>
            <Text style={[typography.display, { color: colors.textPrimary }]}>FITDJ</Text>
          </View>
          <View style={[styles.djBadge, { backgroundColor: colors.surface }]}> 
            <Ionicons name="musical-notes" size={16} color={colors.accent} />
            <Text style={[typography.caption, { color: colors.textSecondary }]}>Live DJ Mode</Text>
          </View>
        </View>
        <Text style={[typography.headline, styles.sectionTitle, { color: colors.textPrimary }]}>
          Strength Sessions
        </Text>
        {workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </ScrollView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  djBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
});
