import { Stack } from 'expo-router';
import { useTheme } from '@/theme/useTheme';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colors } = useTheme();
  const [loaded, error] = useFonts({
    'SFProDisplay-Regular': require('../assets/fonts/SF-Pro-Display-Regular.ttf'),
    'SFProDisplay-Semibold': require('../assets/fonts/SF-Pro-Display-Semibold.ttf'),
    'SFProText-Regular': require('../assets/fonts/SF-Pro-Text-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="workout/[id]" />
      <Stack.Screen name="session/[id]" />
    </Stack>
  );
}
