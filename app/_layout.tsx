import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { TabProvider } from '@/components/TabContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import Constants from 'expo-constants';

import {
  AutoEnvAttributes,
  LDProvider,
  ReactNativeLDClient,
} from '@launchdarkly/react-native-client-sdk';

const featureClient = new ReactNativeLDClient(
  'mob-930b7bf0-341d-419d-a458-8d3872368c72',
  AutoEnvAttributes.Enabled,
  {
    debug: false,
    applicationInfo: {
      id: Constants.expoConfig?.name,
      version: Constants.expoConfig?.version,
    },
  },
);

import { Amplify } from 'aws-amplify';
import config from '../src/amplifyconfiguration.json';
Amplify.configure(config);

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout () {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <LDProvider client={featureClient}>
      <TabProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          {/* <StatusBar style="auto" /> */}
        </ThemeProvider>
      </TabProvider>
    </LDProvider>
  );
}
