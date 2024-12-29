import { Image, StyleSheet, Platform, Text, View, SafeAreaView, ScrollView, FlatList, Animated, StatusBar, } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import CustomParallaxScrollView from '@/components/CustomParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Slider from '@/components/Slider';

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
        <StatusBar
          backgroundColor={'transparent'}
          translucent={true}
        />

        <Slider />
      </CustomParallaxScrollView>
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
