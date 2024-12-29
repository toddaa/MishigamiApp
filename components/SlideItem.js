import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Easing,
  useColorScheme,
} from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get('screen')



const SlideItem = ({ item }) => {
  const colorScheme = useColorScheme() ?? 'light'
  const textColor = colorScheme === 'dark' ? '#fff' : '#000'
  const translateYImage = new Animated.Value(40)

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
  )
}

export default SlideItem

const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: 'center',
  },
  image: {
    marginVertical: '-200',
    flex: 0.6,
    width: '400',
    resizeMode: 'contain',
  },
  content: {
    flex: 0,
    alignItems: 'center',
  },
  title: {
    marginVertical: '30',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#999',
  },
  description: {
    textAlign: 'center',
    fontSize: 20,
    marginVertical: '-20',
    color: '#999',
  },
  location: {
    marginVertical: '25',
    fontSize: 20,
    color: '#999',
  },
})
