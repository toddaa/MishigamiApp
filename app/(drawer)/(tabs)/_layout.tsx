import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';


import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTabContext } from '@/components/TabContext';

export default function TabLayout () {
  const colorScheme = useColorScheme();
  const { tabOrder } = useTabContext();
  //^this is where you need to go to add tabs

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      {tabOrder.map((tab, index) => {
        let iconNames = {};
        switch (tab.name) {
          case 'index':
            iconNames = { focused: 'home', unfocused: 'home-outline' };
            break;
          case 'calendar':
            iconNames = { focused: 'calendar', unfocused: 'calendar-outline' };
            break;
          case 'News':
            iconNames = { focused: 'newspaper', unfocused: 'newspaper-outline' };
            break;
          case 'map':
            iconNames = { focused: 'map', unfocused: 'map-outline' };
            break;
          case 'tradingPost':
            iconNames = { focused: 'bag-handle', unfocused: 'bag-handle-outline' };
            break;
          case 'settings':
            iconNames = { focused: 'settings', unfocused: 'settings-outline' };
            break;
          // case 'message':
          //   iconNames = { focused: 'chatbox-ellipses', unfocused: 'chatbox-ellipses-outline' };
          //   break;
          default:
            iconNames = { focused: 'circle', unfocused: 'circle-outline' };
            break;
        }
        return (
          <Tabs.Screen
            key={index}
            name={tab.name}
            options={{
              title: tab.title,
              href: tab.visible ? undefined : null,
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  name={focused ? iconNames.focused : iconNames.unfocused}
                  color={color}
                />
              ),
            }}
          />
        );
      })}

      <Tabs.Screen
        name="TabBarSettings"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="AppPreferencesSettings"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="AccountSettings"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="NotificationsSettings"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          href: null,
        }}
      />

    </Tabs>
  );
}
