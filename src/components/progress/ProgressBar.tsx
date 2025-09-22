import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/useTheme';

interface Props {
  progress: number; // 0..1
}

export const ProgressBar = ({ progress }: Props) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.border }]}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(progress * 100) }}
    >
      <View
        style={[
          styles.fill,
          {
            backgroundColor: colors.secondary,
            width: `${Math.min(Math.max(progress, 0), 1) * 100}%`,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 8,
    borderRadius: 999,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
});
