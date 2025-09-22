import { Link } from 'expo-router';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { WorkoutSummary } from '@/store/workouts/types';
import { useTheme } from '@/theme/useTheme';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  workout: WorkoutSummary;
}

export const WorkoutCard = ({ workout }: Props) => {
  const { colors, typography } = useTheme();
  return (
    <Link href={`/workout/${workout.id}`} asChild>
      <Pressable style={[styles.card, { backgroundColor: colors.surface }]}
        android_ripple={{ color: 'rgba(255,255,255,0.08)' }}
      >
        <View style={styles.header}>
          <Text style={[typography.headline, { color: colors.textPrimary }]}>{workout.title}</Text>
          <View style={styles.levelTag}>
            <Ionicons name="flame" size={14} color={colors.secondary} />
            <Text style={[styles.levelText, { color: colors.textSecondary }]}>{workout.level}</Text>
          </View>
        </View>
        <Text style={[styles.description, typography.body, { color: colors.textSecondary }]}>
          {workout.description}
        </Text>
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={16} color={colors.accent} />
            <Text style={[styles.metaText, { color: colors.textSecondary }]}>
              {workout.duration} mins
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="barbell" size={16} color={colors.accent} />
            <Text style={[styles.metaText, { color: colors.textSecondary }]}>
              {workout.focus}
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  description: {
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 14,
  },
  levelTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  levelText: {
    fontSize: 12,
    textTransform: 'capitalize',
  },
});
