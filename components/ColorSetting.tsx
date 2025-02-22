import { Image, StyleSheet, Platform, Text, View, SafeAreaView, ScrollView, FlatList, Animated, Switch, } from 'react-native'

import { HelloWave } from '@/components/HelloWave'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import CustomParallaxScrollView from '@/components/CustomParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import Slider from '@/components/Slider'
import { TouchableOpacity, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { CustomHeader } from '@/components/CustomHeader'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserTheme } from '@/components/useUserTheme';


const ColorSetting = () => {
  // export default function HomeScreen () {

  const [theme, setTheme] = useUserTheme();



  // const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('auto');




  // const [darkMode, setDarkMode] = useState(false)
  // const [lightMode, setLightMode] = useState(false)
  // const [autoMode, setAutoMode] = useState(false)




  // useEffect(() => {
  //   // Load theme from storage
  //   AsyncStorage.getItem('theme').then((storedTheme) => {
  //     if (storedTheme) setTheme(storedTheme as 'light' | 'dark' | 'auto');
  //   });
  // }, []);

  // const updateTheme = async (selectedTheme: 'light' | 'dark' | 'auto') => {
  //   setTheme(selectedTheme);
  //   await AsyncStorage.setItem('theme', selectedTheme);
  // };




  // const toggleDarkMode = () => {
  //   setDarkMode((prev) => {
  //     if (prev && !lightMode && !autoMode) {
  //       return prev
  //     }
  //     if (!prev) {
  //       setAutoMode(false)
  //       setLightMode(false)
  //     }
  //     return !prev
  //   })
  // }
  // const toggleLightMode = () => {
  //   setLightMode((prev) => {
  //     if (prev && !darkMode && !autoMode) {
  //       return prev
  //     }
  //     if (!prev) {
  //       setDarkMode(false)
  //       setAutoMode(false)
  //     }
  //     return !prev
  //   })
  // }
  // const toggleAutoMode = () => {
  //   setAutoMode((prev) => {
  //     if (prev && !lightMode && !darkMode) {
  //       return prev
  //     }
  //     if (!prev) {
  //       setDarkMode(false)
  //       setLightMode(false)
  //     }
  //     return !prev
  //   })
  // }



  return (
    <SafeAreaProvider>

      <ThemedView style={styles.container}>
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Color Theme</ThemedText>
          <ThemedView style={styles.item}>
            <ThemedText style={styles.itemText}>Dark Mode</ThemedText>
            {/* <Switch
              value={darkMode}
              onValueChange={toggleDarkMode}
            /> */}
            <Switch
              value={theme === 'dark'}
              onValueChange={() => setTheme('dark')}
            />
          </ThemedView>

          <ThemedView style={styles.item}>
            <ThemedText style={styles.itemText}>Light Mode</ThemedText>
            {/* <Switch
              value={lightMode}
              onValueChange={toggleLightMode}
            /> */}
            <Switch
              value={theme === 'light'}
              onValueChange={() => setTheme('light')}
            />
          </ThemedView>

          <ThemedView style={styles.item}>
            <ThemedText style={styles.itemText}>Auto</ThemedText>
            {/* <Switch
              value={autoMode}
              onValueChange={toggleAutoMode}
            /> */}
            <Switch
              value={theme === 'auto'}
              onValueChange={() => setTheme('auto')}
            />
          </ThemedView>

        </ThemedView>

      </ThemedView>
    </SafeAreaProvider>
  )
}
export default ColorSetting


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
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    // paddingTop: 10,
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
})
