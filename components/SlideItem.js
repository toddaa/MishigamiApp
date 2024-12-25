import {
    Image,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Animated,
    Easing,
    useColorScheme,
  } from 'react-native';
  import React from 'react';

  const {width, height} = Dimensions.get('screen');



  const SlideItem = ({item}) => {
    const colorScheme = useColorScheme() ?? 'light';
    const textColor = colorScheme === 'dark' ? '#fff': '#000';
    const translateYImage = new Animated.Value(40);

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
          <Text style={[styles.description, { color: textColor }]}>{item.description}</Text>
          <Text style={[styles.location, { color: textColor }]}>{item.location}</Text>
        </View>

        <Animated.Image
          source={item.img}
          resizeMode="center"
          style={[
            styles.image,
            {
              transform: [
                {
                  translateY: translateYImage,
                },
              ],
            },
          ]}
        />
        
      </View>
    );
  };

  export default SlideItem;

  const styles = StyleSheet.create({
    container: {
      width,
      height,
      alignItems: 'center',
    },
    image: {
      flex: 0.6,
      width: '100%',
    },
    content: {
      flex: 0,
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#999',
    },
    description: {
      fontSize: 20,
      marginVertical: 12,
      color: '#999',
    },
    location: {
      fontSize: 20,
      color: '#999',
    },
  });