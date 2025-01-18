import { Image, StyleSheet, Platform, Text, View, SafeAreaView, ScrollView, FlatList, Animated, TouchableOpacity, } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import CustomParallaxScrollView from '@/components/CustomParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Slider from '@/components/Slider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header, Icon } from '@rneui/base';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { router } from 'expo-router';
import { CustomHeader } from '@/components/CustomHeader';

export default function MapScreen () {
  return (
    <SafeAreaProvider>
      <CustomHeader />
      <ThemedView style={styles.container}>


      </ThemedView>


    </SafeAreaProvider >
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
});
