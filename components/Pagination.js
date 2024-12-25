import {StyleSheet, Animated, View, Dimensions, useColorScheme, } from 'react-native';
import React from 'react';


const {width} = Dimensions.get('screen');

const Pagination = ({data, scrollX, index}) => {
  const colorScheme = useColorScheme() ?? 'light';

  const dotColor = colorScheme === 'dark' ? '#799FAF' : '#799FAF'; // Adjust this if needed
  const activeDotColor = colorScheme === 'dark' ? '#fff' : '#000'; // Adjust active color as needed
  

  return (
    <View style={styles.container}>
      {data.map((_, idx) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [12, 30, 12],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.2, 1, 0.1],
          extrapolate: 'clamp',
        });

        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: [dotColor, activeDotColor, dotColor],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={idx.toString()}
            style={[
              styles.dot,
              {width: dotWidth, backgroundColor},
              // idx === index && styles.dotActive,
            ]}
          />
        );
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 300,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 3,
    // backgroundColor: '#8DB7CB',
  },
  dotActive: {
    // backgroundColor: '#8DB7CB',
  },
});