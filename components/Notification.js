import { Image, StyleSheet, Platform, Text, View, SafeAreaView, ScrollView, FlatList, Animated, TouchableOpacity, Switch, } from 'react-native'
import React, { useState, useEffect } from 'react'

import { HelloWave } from '@/components/HelloWave'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import CustomParallaxScrollView from '@/components/CustomParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import Slider from '@/components/Slider'

import { useNavigation } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { CustomHeader } from '@/components/CustomHeader'
import { useDataContext } from '@/components/DataContext'

const Notification = () => {
  const { dataState, saveSubscription } = useDataContext()
  const [subscriptions, setSubscriptions] = useState({})

  useEffect(() => {
    // console.log(dataState.subscriptions)
    setSubscriptions(dataState.subscriptions)
  }, [dataState.subscriptions])

  const toggleSubscription = async (sub) => {
    setSubscriptions({
      ...subscriptions,
      [sub]: !subscriptions[sub]
    })
    await saveSubscription(sub, !subscriptions[sub])
  }

  return (
    <SafeAreaProvider>

      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Notification Subscriptions</ThemedText>

        <ThemedView style={styles.item}>
          <ThemedText style={styles.itemText}>Lodge Notifications</ThemedText>
          <Switch
            value={subscriptions.lodge}
            onValueChange={() => toggleSubscription('lodge')}
          />
        </ThemedView>

        <ThemedView style={styles.item}>
          <ThemedText style={styles.itemText}>North Area Notifications</ThemedText>
          <Switch
            value={subscriptions.north}
            onValueChange={() => toggleSubscription('north')}
          />
        </ThemedView>

        <ThemedView style={styles.item}>
          <ThemedText style={styles.itemText}>South Area Notifications</ThemedText>
          <Switch
            value={subscriptions.south}
            onValueChange={() => toggleSubscription('south')}
          />
        </ThemedView>

        <ThemedView style={styles.item}>
          <ThemedText style={styles.itemText}>East Area Notifications</ThemedText>
          <Switch
            value={subscriptions.east}
            onValueChange={() => toggleSubscription('east')}
          />
        </ThemedView>

        <ThemedView style={styles.item}>
          <ThemedText style={styles.itemText}>West Area Notifications</ThemedText>
          <Switch
            value={subscriptions.west}
            onValueChange={() => toggleSubscription('west')}
          />
        </ThemedView>

        <ThemedView style={styles.item}>
          <ThemedText style={styles.itemText}>Central Area Notifications</ThemedText>
          <Switch
            value={subscriptions.central}
            onValueChange={() => toggleSubscription('central')}
          />
        </ThemedView>

      </ThemedView>

    </SafeAreaProvider>
  )
}
export default Notification



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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    flex: 1,
    paddingTop: 5,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    paddingTop: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    // paddingBottom: 12,
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
