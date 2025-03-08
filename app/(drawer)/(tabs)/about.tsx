import React, { useState, useEffect } from 'react';
import { View, Image, Text, Switch, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CustomHeader } from '@/components/CustomHeader';
import { useDataContext } from '@/components/DataContext'
import { ListItem } from '@rneui/themed';
import * as SecureStore from 'expo-secure-store';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export default function AboutPage () {
  const { expoPushToken } = useDataContext()
  const [deviceId, setDeviceId] = useState()

  useEffect(() => {
    const getCurrent = async () => {
      let fetchUUID = await SecureStore.getItemAsync('secure_deviceid');
      if (fetchUUID) {
        setDeviceId(fetchUUID)
      }
    }
    getCurrent()
  }, [])

  return (
    <SafeAreaProvider>
      <CustomHeader />

      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>
          Thank you for using the Mishigami App.
        </ThemedText>
        <ThemedText style={styles.itemText}>
          The goal of this app is to become the tool that unifies lodge communications into a modern platform that all can benefit from.
        </ThemedText>

        <View
          style={styles.seperator}
        />

        <ThemedText style={styles.itemText}>
          Below are key pieces of data about your unique environement.  Should support be needed this data will be the key.
        </ThemedText>

        <ThemedText style={styles.itemText}>
        </ThemedText>

        <ListItem>
          <ListItem.Content>
            <ListItem.Title>Push Notification Token:</ListItem.Title>
            <ListItem.Subtitle>{expoPushToken}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>

        {/* <ListItem>
          <ListItem.Content>
            <ListItem.Title>Device Id:</ListItem.Title>
            <ListItem.Subtitle>{DeviceInfo.getDeviceId()}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem> */}

        <ListItem>
          <ListItem.Content>
            <ListItem.Title>Unique Id:</ListItem.Title>
            <ListItem.Subtitle>{deviceId}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>

      </ThemedView>


    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
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
    flex: 1,
    paddingTop: 5,
    paddingHorizontal: 10,
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
  reactLogo: {
    height: 75,
    width: 150,
    top: 60,
    alignSelf: 'center',
  },
  seperator: {
    borderBottomColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 15,
    marginTop: 15
  },
});
