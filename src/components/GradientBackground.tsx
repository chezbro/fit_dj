import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '@/theme/useTheme';

interface Props {
  children: ReactNode;
}

export const GradientBackground = ({ children }: Props) => {
  const { colors } = useTheme();
  return (
    <LinearGradient
      colors={[colors.primary, '#111744', '#070A1D']}
      style={styles.container}
      start={{ x: 0.1, y: 0.2 }}
      end={{ x: 0.9, y: 0.9 }}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
