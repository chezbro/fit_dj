import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/useTheme';
import { ProgressBar } from './progress/ProgressBar';

interface Props {
  title: string;
  currentPhase: string;
  progress: number;
  timeRemaining: string;
}

export const SessionHeader = ({ title, currentPhase, progress, timeRemaining }: Props) => {
  const { colors, typography } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={[typography.caption, { color: colors.accent }]}>{currentPhase}</Text>
      <Text style={[typography.display, { color: colors.textPrimary, marginTop: 4 }]}>
        {title}
      </Text>
      <View style={styles.metaRow}>
        <Text style={[typography.caption, { color: colors.textSecondary }]}>Remaining</Text>
        <Text style={[typography.headline, { color: colors.textPrimary }]}>{timeRemaining}</Text>
      </View>
      <ProgressBar progress={progress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
});
