import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/theme/useTheme';

interface Props {
  seconds: number;
  isRunning: boolean;
}

export const CountdownTimer = ({ seconds, isRunning }: Props) => {
  const { colors, typography } = useTheme();
  const animatedValue = useRef(new Animated.Value(seconds)).current;

  useEffect(() => {
    if (isRunning) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: seconds * 1000,
        useNativeDriver: false,
      }).start();
    } else {
      animatedValue.stopAnimation();
    }
  }, [animatedValue, isRunning, seconds]);

  const display = animatedValue.interpolate({
    inputRange: [0, seconds],
    outputRange: ['0', seconds.toString()],
  });

  return (
    <View style={[styles.container, { borderColor: colors.border }]}
      accessibilityLiveRegion="polite"
    >
      <Animated.Text style={[typography.display, styles.text, { color: colors.textPrimary }]}>
        {display}
      </Animated.Text>
      <Text style={[typography.caption, { color: colors.textSecondary }]}>seconds</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: 140,
  },
  text: {
    letterSpacing: 2,
  },
});
