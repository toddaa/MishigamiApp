import { Image, StyleSheet, Platform, Text, View, SafeAreaView, ScrollView, FlatList, Animated, Switch, PanResponder, } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import CustomParallaxScrollView from '@/components/CustomParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Slider from '@/components/Slider';
import { TouchableOpacity, } from 'react-native';
import { useTabContext } from '@/components/TabContext';

import DraggableFlatList from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';





import FontAwesome from '@expo/vector-icons/FontAwesome';

import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState, } from 'react';

export default function HomeScreen () {
  const { tabOrder, toggleTabVisibility, updateTabOrder } = useTabContext();

  const renderItem = ({ item, drag, isActive }) => (
    <View style={[styles.item, isActive && styles.activeItem]}>
      <Text style={styles.itemText}>{item.title}</Text>
      <Switch
        value={item.visible}
        onValueChange={() => toggleTabVisibility(item.name)}
      />
      <Text style={styles.dragHandle} onLongPress={drag}>
        ≡
      </Text>
    </View>
  );

    // const { showTab, setShowTab } = useTabContext();

//   const toggleTab = () => {
//     setShowTab(prev => !prev); // Toggle tab visibility
//   };
    // const { setShowTab } = useTabContext();

    // const [TabEnabled, setTabEnabled] = useState(true);
    // const toggleTab = () => setTabEnabled(!TabEnabled);

  return (
    <View style={{ flex: 1 }}>
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#799FAF' }}
      headerImage={
        <Image
          source={require('@/assets/images/Mishigami-Blue-Mastodon-Arrow-Text.png')}
          style={styles.reactLogo}
        />
      }>
        
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Tab Bar</ThemedText>

            {/* <TouchableOpacity onPress={() => setShowTab(prev => !prev)}>
                <FontAwesome name="home" size={24} color="cyan" />
            </TouchableOpacity> */}

                {/* <Switch
                    value={showTab}
                    onValueChange={setShowTab}
                /> */}
                <GestureHandlerRootView style={{ flex: 1 }}>
                <DraggableFlatList
        data={tabOrder}
        onDragEnd={({ data }) => updateTabOrder(data)}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
      />
      </GestureHandlerRootView>
                
                        
          {/* <Animated.View
            {...panResponder.panHandlers}
            style={[
              { transform: pan.getTranslateTransform() }
            ]}
          >
            <FontAwesome name="home" size={24} color="cyan" />
          </Animated.View> */}
        </ThemedView>

    </ParallaxScrollView>
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
    height: 75,
    width: 150,
    top: 60,
    alignSelf: 'center',
  },
  center: {
    alignSelf: 'center',
    alignItems: 'center',
  },
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
  // item: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   paddingVertical: 12,
  //   borderBottomWidth: 1,
  //   borderBottomColor: '#eee',
  // },
  itemText: {
    fontSize: 16,
  },
  itemDetail: {
    fontSize: 16,
    color: '#999',
  },
  
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activeItem: {
    backgroundColor: '#e0e0e0',
  },
  dragHandle: {
    fontSize: 18,
    padding: 8,
    color: '#888',
  },
});
