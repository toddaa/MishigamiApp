import React, { useState, useEffect } from 'react';
import { View, Image, Text, Switch, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CustomHeader } from '@/components/CustomHeader';
import { useDataContext } from '@/components/DataContext'
import { ListItem } from '@rneui/themed';

export default function AboutPage () {
  const { expoPushToken } = useDataContext()

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
          Below are key peices of data about your unique environement.  Should support be needed this data will be the key.
        </ThemedText>

        <ThemedText style={styles.itemText}>
        </ThemedText>

        <ListItem>
          <ListItem.Content>
            <ListItem.Title>Push Notification Token:</ListItem.Title>
            <ListItem.Subtitle>{expoPushToken}</ListItem.Subtitle>
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
