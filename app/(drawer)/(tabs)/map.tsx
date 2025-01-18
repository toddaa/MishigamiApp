import { Image, StyleSheet, Dimensions, Text, View, SafeAreaView, ScrollView, FlatList, Animated, TouchableOpacity, Icon } from 'react-native';
import React, { useRef, useCallback, useEffect, useState } from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import CustomParallaxScrollView from '@/components/CustomParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Slider from '@/components/Slider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { Header, Icon } from '@rneui/base';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { router } from 'expo-router';
import { CustomHeader } from '@/components/CustomHeader';
import MapView, { Marker, Overlay, Polygon, UrlTile, PROVIDER_GOOGLE, Callout, LocalTile } from 'react-native-maps';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

// import geojson from '@/data/MishigamiAreas.json';

const tileServerUrl = "http://10.255.2.245:8080/data/out/{z}/{x}/{y}.pfb"; // Replace with your tile server URL

const { width, height } = Dimensions.get('window');

const LATITUDE = 44.3148;
const LONGITUDE = -85.6024;

const ASPECT_RATIO = width / height;
// const LATITUDE = 37.78825;
// const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 12;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const SAMPLE_REGION = {
  latitude: LATITUDE,
  longitude: LONGITUDE,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

export default function MapScreen () {
  const [coordinates, setCoordinates] = useState([]);
  // useEffect(() => {
  //   // Parse GeoJSON file to extract coordinates
  //   const parseGeoJSON = () => {
  //     const polygon = geojson.features[0].geometry.coordinates[0];
  //     // Convert [longitude, latitude] to [latitude, longitude]
  //     const formattedCoordinates = polygon.map(([lng, lat]) => ({
  //       latitude: lat,
  //       longitude: lng,
  //     }));
  //     setCoordinates(formattedCoordinates);
  //   };

  //   parseGeoJSON();
  // }, []);

  const markers = [
    {
      title: 'Camp Rotary',
      desc: 'A very cool camp for sure',
      latlon: {
        latitude: 43.943295,
        longitude: -84.759669,
      }
    },
    {
      title: 'Cole Canoe Base',
      desc: '',
      latlon: {
        latitude: 44.179388,
        longitude: -84.070019,
      }
    },
    {
      title: 'Camp Gerber',
      desc: '',
      latlon: {
        latitude: 43.447072,
        longitude: -86.190291,
      }
    },
    {
      title: 'D-A Scout Ranch',
      desc: '',
      latlon: {
        latitude: 42.971765,
        longitude: -83.257943
      }
    },
    {
      title: 'Camp Hiawatha',
      desc: '',
      latlon: {
        latitude: 46.266964,
        longitude: -86.789328
      }
    },
    {
      title: 'Camp Teetonkah',
      desc: '',
      latlon: {
        latitude: 42.207288,
        longitude: -84.239430
      }
    }
  ]


  return (
    <SafeAreaProvider>
      <CustomHeader />

      <MapView
        // mapType='standard'
        showsUserLocation
        showsMyLocationButton
        // provider={PROVIDER_GOOGLE}
        initialRegion={SAMPLE_REGION}
        style={styles.map}>
        {
          markers.map((m, i) => {
            return (
              <Marker
                key={i}
                coordinate={m.latlon}
              >
                <FontAwesome6 name="campground" size={20} color="black" />

                <Callout>
                  <View style={{ padding: 10, width: 180 }}>
                    <Text style={{ fontSize: 18 }}>{m.title}</Text>
                    <Text style={{ fontSize: 14 }}>{m.desc}</Text>
                  </View>
                </Callout>
              </Marker>
            )
          })
        }
        {/* <Overlay
          image={require('@/assets/carousel/App-Logo.png')} // Replace with your image file
          bounds={overlayBounds}
          opacity={0.7} // Optional: Adjust overlay transparency
        /> */}
        {/* <Polygon
          coordinates={eatonCountyCoordinates} // Polygon coordinates
          strokeColor="blue" // Border color
          fillColor="rgba(135, 206, 250, 0.5)" // Fill color with transparency
          strokeWidth={3} // Border width
        /> */}
        {/* {coordinates.length > 0 && (
          <Polygon
            coordinates={coordinates}
            strokeColor="blue"
            fillColor="rgba(135, 206, 250, 0.5)"
            strokeWidth={3}
          />
        )} */}
        {/* <Geojson
          geojson={geojson}
          strokeColor="red"
          fillColor="green"
          strokeWidth={2}
        /> */}
        {/* <UrlTile
          urlTemplate={tileServerUrl} // Template for tile URLs
        // maximumZ={19} // Adjust based on your tile data
        // minimumZ={0}
        // flipY={true}
        /> */}
        {/* <LocalTile
          pathTemplate='../../tiles/'
          tileSize={256}
        /> */}
      </MapView>

    </SafeAreaProvider >
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
  map: {
    width: '100%',
    height: '100%',
  },
});
