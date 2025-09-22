import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/useTheme';

interface Props {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSkip: () => void;
}

export const PlaybackControls = ({ isPlaying, onTogglePlay, onSkip }: Props) => {
  const { colors, typography } = useTheme();
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.button, { borderColor: colors.border }]}
        onPress={onTogglePlay}
        android_ripple={{ color: 'rgba(255,255,255,0.1)', borderless: false }}
      >
        <Ionicons
          name={isPlaying ? 'pause' : 'play'}
          color={colors.textPrimary}
          size={20}
        />
        <Text style={[typography.caption, { color: colors.textPrimary }]}>
          {isPlaying ? 'Pause' : 'Play'}
        </Text>
      </Pressable>
      <Pressable
        style={[styles.button, { borderColor: colors.border }]}
        onPress={onSkip}
        android_ripple={{ color: 'rgba(255,255,255,0.1)', borderless: false }}
      >
        <Ionicons name="play-skip-forward" color={colors.textPrimary} size={20} />
        <Text style={[typography.caption, { color: colors.textPrimary }]}>Skip</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
});
