import { Image, StyleSheet, Platform, Text, View, ScrollView, FlatList, Animated, StatusBar, TouchableOpacity, } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import CustomParallaxScrollView from '@/components/CustomParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Slider from '@/components/Slider';
import React, { useRef } from 'react';
import { Header, Icon } from '@rneui/base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';
import { router } from 'expo-router';


export default function HomeScreen () {
  return (
    <SafeAreaProvider>
      <Header
        backgroundColor='#799FAF'
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={
          <Image
            source={require('@/assets/images/Mastodon-56000SM.png')}
            style={styles.reactLogo}
          />
        }
        rightComponent={
          <TouchableOpacity onPress={() => router.push('/message')}>
            <Icon name="notifications" color="#fff" />
          </TouchableOpacity>
        }
      />

      < StatusBar
        backgroundColor={'transparent'}
        translucent={true}
      />

      <ThemedView>
        <Slider />
      </ThemedView>
    </SafeAreaProvider >
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
    height: 92,
    width: 130,
    alignSelf: 'center',
  },
  center: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  // slide: {
  //   padding: 100,
  //   width: 100,
  //   height: "100%"
  // },
  // scrollView: {
  //   width: "115%",
  //   height: "200%",
  //   alignSelf: 'center',
  // },
  // horizontalscrollView: {
  //   width: "115%",
  //   height: "200%",
  //   alignSelf: 'center',
  // },
  // item: {
  //   margin: 40,
  //   height: 700
  // },
  // pictureTitle: {
  //   alignSelf: 'center',
  // },
});
