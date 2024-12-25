import React, {useEffect,useState} from 'react';
import { Image, StyleSheet, Platform } from 'react-native';
//import newsFeed from 'news.xml'
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
//import XMLParser from 'react-xml-parser'
const dateTimeOptions = {
  year: 'numeric',
  month: 'numeric',
  day: '2-digit',
  // hour: 'numeric',
  // minute: 'numeric',
  // second: 'numeric',
  // hour12:true,
  // timeZoneName: 'short'
}

export default function HomeScreen() {
  const [News, setNews] =useState([])
  let url = '/news.xml' //`https://mishigami.org/feed/`;
  useEffect(() => {
    fetch(url)
            .then((response) => response.text())
            .then((responseJson) => {
              // console.log(responseJson)
             // const parser = new XMLParser();
              const xml = parser.parseFromString(responseJson)
              console.log(xml)
              
              console.log(xml.getElementsByTagName('item'))
              //setNews(responseJson.items)
                // this.setState({
                //     pageToken: responseJson.nextPageToken,
                //     dataSource: [...this.state.dataSource, ...responseJson.items],
                //     loading: false,
                //     refreshing: false,
                //     error: responseJson.error || null,
                // });
            })
            .then(() => {
                // this.getDates()
            }) 
            .catch(error => {
              console.log (error)
                // this.setState({ error, loading: false, refreshing: false });
            });
   
  }, []);
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#799FAF' }}
      headerImage={
        <Image
          source={require('@/assets/images/Mishigami-Blue-Mastodon-Arrow-Text.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">connor!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
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
});
