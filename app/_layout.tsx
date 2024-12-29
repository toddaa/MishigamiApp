import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import 'react-native-reanimated';
import { TabProvider } from '@/components/TabContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import {
  AutoEnvAttributes,
  LDProvider,
  ReactNativeLDClient,
} from '@launchdarkly/react-native-client-sdk';
import { add, getUnixTime } from 'date-fns';


import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import { createPushTokens, updatePushTokens } from '../src/graphql/mutations';
import config from '../src/amplifyconfiguration.json';
Amplify.configure(config);
const client = generateClient();

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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

function handleRegistrationError (errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync () {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to get push token for push notification!');
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError('Project ID not found');
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log({ pushTokenString });
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout () {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(
    undefined
  );
  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();

  useEffect(() => {
    featureClient
      .identify({ kind: 'user', key: 'example-user-key' })
      .catch((e) => console.error('error: ' + e))

    registerForPushNotificationsAsync()
      .then(token => setExpoPushToken(token ?? ''))
      .catch((error: any) => setExpoPushToken(`${error}`));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log({ response });
    });
    // console.log({ expoPushToken })
    savePushToken(expoPushToken)

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [])


  async function savePushToken (token: String) {
    console.log(token)
    const now = new Date();
    const exp = add(new Date(now), { years: 1 })
    const input = {
      token: token,
      ttl: getUnixTime(exp)
    }
    console.log({ input })

    const response = await client.graphql({ query: createPushTokens, variables: { input: input } });
    console.log({ response })
    if (response.hasOwnProperty("errors")) {
      const response1 = await client.graphql({ query: updatePushTokens, variables: { input: input } });
      console.log({ response1 })
    }
  }

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
