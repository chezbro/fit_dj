import { View, Text, StyleSheet } from 'react-native';
import { WorkoutBlock } from '@/store/workouts/types';
import { useTheme } from '@/theme/useTheme';

interface Props {
  blocks: WorkoutBlock[];
}

export const ExerciseList = ({ blocks }: Props) => {
  const { colors, typography } = useTheme();
  return (
    <View style={styles.container}>
      {blocks.map((block) => (
        <View key={block.id} style={[styles.block, { borderColor: colors.border }]}> 
          <Text style={[typography.headline, { color: colors.textPrimary }]}>{block.title}</Text>
          <Text style={[typography.caption, styles.caption, { color: colors.textSecondary }]}>
            {block.duration} min · {block.intensity} intensity
          </Text>
          {block.exercises.map((exercise) => (
            <View key={exercise.id} style={styles.exerciseRow}>
              <View style={[styles.exerciseIndicator, { backgroundColor: colors.accent }]} />
              <View style={styles.exerciseTextGroup}>
                <Text style={[typography.body, { color: colors.textPrimary }]}>
                  {exercise.name}
                </Text>
                <Text style={[typography.caption, { color: colors.textSecondary }]}>
                  {exercise.cues.join(' · ')}
                </Text>
              </View>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>
                {exercise.workDuration}s
              </Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  block: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  caption: {
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  exerciseIndicator: {
    width: 10,
    height: 10,
    borderRadius: 999,
  },
  exerciseTextGroup: {
    flex: 1,
    gap: 4,
  },
});
