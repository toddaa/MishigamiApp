import { StyleSheet, Image, Pressable } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Header, Icon } from '@rneui/base';
import { router, usePathname } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

export function CustomHeader () {
  const pathname = usePathname();
  const navigation = useNavigation();

  let center
  if (pathname === '/') {
    center = <Image
      source={require('@/assets/images/Mastodon-56000SM.png')}
      style={styles.logo}
    />
  }

  return (
    <Header
      backgroundColor='#799FAF'
      leftComponent={
        <Pressable onPress={() => navigation.openDrawer()}>
          <Icon name="menu" color="#fff" />
        </Pressable>
      }
      centerComponent={center}
      rightComponent={
        <Pressable onPress={() => router.push('/message')}>
          <Icon name="notifications" color="#fff" />
        </Pressable>
      }
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 92,
    width: 130,
    alignSelf: 'center',
  },
});
