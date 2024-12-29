import { Image, StyleSheet, Platform, Text, View, SafeAreaView, ScrollView, FlatList, Animated, TextInput, TouchableOpacity, } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import CustomParallaxScrollView from '@/components/CustomParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Slider from '@/components/Slider';
import { useState } from 'react';


export default function HomeScreen () {
  return (
    <View style={{ flex: 1 }}>
      <CustomParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#799FAF' }}
        headerImage={
          <Image
            source={require('@/assets/images/Mastodon-56000SM.png')}
            style={styles.reactLogo}
          />
        }>

        <ThemedView style={styles.container}>
          <ThemedText style={styles.title} >Write your message</ThemedText>
          <TextInput style={styles.inputStyle} multiline placeholderTextColor={'#808080'} placeholder='Subject' />

          <TextInput style={styles.inputStyle} multiline placeholderTextColor={'#808080'} placeholder='Message' />

          <TouchableOpacity onPress={() => { }} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Send Message</Text>
          </TouchableOpacity>

        </ThemedView>

      </CustomParallaxScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
  },
  submitButton: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center',
    marginTop: 20
  },
  inputStyle: {
    color: '#fff',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  container: {
    // alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
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
    height: 92,
    width: 130,
    top: 55,
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
