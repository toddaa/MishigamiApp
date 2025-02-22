import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import 'react-native-reanimated';
import { TabProvider } from '@/components/TabContext';
import { DataProvider } from '@/components/DataContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import {
  AutoEnvAttributes,
  LDProvider,
  ReactNativeLDClient,
} from '@launchdarkly/react-native-client-sdk';
import { Amplify } from 'aws-amplify';
import config from '../src/amplifyconfiguration.json';
Amplify.configure(config);

const featureClient = new ReactNativeLDClient(
  process.env.EXPO_PUBLIC_LD_KEY ?? '',
  AutoEnvAttributes.Enabled,
  {
    debug: false,
    applicationInfo: {
      id: Constants.expoConfig?.name,
      version: Constants.expoConfig?.version,
    },
  },
);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout () {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    featureClient
      .identify({ kind: 'user', key: 'example-user-key' })
      .catch((e) => console.error('error: ' + e))

    // console.log(featureClient.stringVariationDetail)
  }, [])

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
      <DataProvider>
        <TabProvider>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
              <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            {/* <StatusBar style="auto" /> */}
          </ThemeProvider>
        </TabProvider>
      </DataProvider>
    </LDProvider>
  );
}
