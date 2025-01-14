import { Image, StyleSheet, Platform, Text, View, SafeAreaView, ScrollView, FlatList, Animated, TouchableOpacity, Switch, } from 'react-native';
import React, { useState } from 'react';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import CustomParallaxScrollView from '@/components/CustomParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Slider from '@/components/Slider';

import { useNavigation } from '@react-navigation/native';

export default function HomeScreen () {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const toggleNotifications = () => setNotificationsEnabled(!notificationsEnabled);


  return (
    <View style={{ flex: 1 }}>
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#799FAF' }}
      headerImage={
        <Image
          source={require('@/assets/images/Mishigami-Blue-Mastodon-Arrow-Text.png')}
          style={styles.reactLogo}
        />
      }>
        <ThemedView style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Notifications</ThemedText>
            <ThemedView style={styles.item}>
                <ThemedText style={styles.itemText}>Enable Notifications</ThemedText>
                    <Switch
                        value={notificationsEnabled}
                        onValueChange={toggleNotifications}
                    />
            </ThemedView>
        </ThemedView>

    </ParallaxScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 75,
    width: 150,
    top: 60,
    alignSelf: 'center',
  },
  center: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 16,
  },
  itemDetail: {
    fontSize: 16,
    color: '#999',
  },
});
