import { memo } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/theme/useTheme';

interface Props {
  transcript: string;
  intensity: number;
}

const VoiceOverlayComponent = ({ transcript, intensity }: Props) => {
  const { colors, typography } = useTheme();
  const opacity = new Animated.Value(Math.min(Math.max(intensity, 0.2), 1));

  return (
    <Animated.View
      style={[styles.container, { backgroundColor: '#00000055', opacity }]}
      pointerEvents="none"
    >
      <Text style={[typography.caption, { color: colors.textSecondary, letterSpacing: 1 }]}>Trainer</Text>
      <Text style={[typography.body, { color: colors.textPrimary }]}>{transcript}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 32,
    borderRadius: 16,
    padding: 16,
  },
});

export const VoiceOverlay = memo(VoiceOverlayComponent);
