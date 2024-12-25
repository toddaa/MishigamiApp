import React, { useState } from 'react';
import { View, Image, Text, Switch, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import CustomParallaxScrollView from '@/components/CustomParallaxScrollView'
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigation } from '@react-navigation/native';

export default function SettingsPage() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
    <CustomParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#799FAF' }}
      headerImage={
        <Image
          source={require('@/assets/images/Mishigami-Blue-Mastodon-Arrow-Text.png')}
          style={styles.reactLogo}
        />
      }>
        <View style={styles.container}>
            {/* Account Settings Section */}
            <ThemedView style={styles.section}>
                <TouchableOpacity onPress={() => navigation.navigate('AccountSettings')}>
                    <ThemedText style={styles.sectionTitle}>Account Settings</ThemedText>
                </TouchableOpacity>
            </ThemedView>

            {/* Notifications Section */}
            <ThemedView style={styles.section}>
                <TouchableOpacity onPress={() => navigation.navigate('NotificationsSettings')}>
                    <ThemedText style={styles.sectionTitle}>Notifications</ThemedText>
                </TouchableOpacity>
            </ThemedView>

            {/* App Preferences Section */}
            <ThemedView style={styles.section}>
                <TouchableOpacity onPress={() => navigation.navigate('AppPreferencesSettings')}>
                    <ThemedText style={styles.sectionTitle}>App Preferences</ThemedText>
                </TouchableOpacity>
            </ThemedView>

             {/* TabBar Section */}
             <ThemedView style={styles.section}>
                <TouchableOpacity onPress={() => navigation.navigate('TabBarSettings')}>
                    <ThemedText style={styles.sectionTitle}>Tab Bar</ThemedText>
                </TouchableOpacity>
            </ThemedView>
        </View>
    </CustomParallaxScrollView>
    </View>
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
  reactLogo: {
    height: 75,
    width: 150,
    top: 60,
    alignSelf: 'center',
  },
});