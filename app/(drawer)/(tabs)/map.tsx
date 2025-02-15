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
import MarkerSheet from '@/components/MarkerSheet';

// import geojson from '@/data/MishigamiAreas.json';

const tileServerUrl = "http://10.255.2.245:8080/data/out/{z}/{x}/{y}.pbf"; // Replace with your tile server URL
// const tileServerUrl = "https://mishigami-tiles.s3.us-east-1.amazonaws.com/{z}/{x}/{y}.png"; // Replace with your tile server URL

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
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [bottomSheetContent, setBottomSheetContent] = useState({});

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
      desc: `Located in the central part of Michigan’s Lower Peninsula, Camp Rotary has one of our country’s clearest spring-fed lakes, scenic rolling hills and fragrant pine trees, making it one of the most beautiful camps in the country.  With over 1,100 acres and abundant natural resources, Camp Rotary is able to offer a wide variety of programs and welcomes Scout Troops, School, Church, Civic, Fraternal organizations and corporate groups on a year-round basis.
Camp Rotary offers a wide variety of innovative programs each summer and welcomes Scout Troops from both in and out-of-state each summer. Camp Rotary boasts perhaps the most beautiful waterfront of any Scout camp and has specialty programs for older Scouts and first year campers alike.  Always one of the most popular areas in camp is the dining hall where tasty, well-balanced meals are served family style.  Premiere Shooting Sports Ranges, COPE, Climbing and Rappelling, our new high-tech M.A.D.E. area, a family carnival on Friday night, and modern shower houses make Camp Rotary an ideal camp for any Unit!`,
      latlon: {
        latitude: 43.943295,
        longitude: -84.759669,
      }
    },
    {
      title: 'Cole Canoe Base',
      desc: 'Cole Canoe Base offers both year-round and summer camp opportunities for groups seeking a fantastic place to participate in outdoor activities. All campsites and White Pines cabin are available throughout the year outside of the summer camping season to any interested units. Scouts can practice their shooting sports skills in camp, go hiking on our many miles of trails, and participate in other unit led scouting activities. Your group holding a weekend campout here at Cole Canoe Base will enable your scouts to have the opportunity to complete requirements towards advancing in rank or completing merit badges.',
      latlon: {
        latitude: 44.179388,
        longitude: -84.070019,
      }
    },
    {
      title: 'Camp Gerber',
      desc: `Gerber Scout Camp first opened in 1951 and is located in the Manistee Forest near Twin Lake Michigan. Gerber Scout Reservation operates Boy Scout Summer Camp and Webelos & Cub Scout Summer Camp.
Gerber offers many different year-round programs and are currently developing even more. We rent a large variety of our building out for your scouting events. More information are detailed below in the Year Round Programs and Services. If their is a program you would like to see offered reach out to the Reservation Director; we are always welcome to new ideas.`,
      latlon: {
        latitude: 43.447072,
        longitude: -86.190291,
      }
    },
    {
      title: 'D-bar-A-Scout Ranch',
      desc: 'Since 1950, D-bar-A-Scout Ranch has been providing quality scouting experiences for Scouts, Schools, and Churches from Southeast Michigan and around the Midwest. D-bar-A is located about an hour North of Detroit, MI.  The ranch consists of over 1,700 acres of wilderness, 3 lakes, a herd of horses, Long Horn Steer, and other livestock, 28 heated cabins, and 11 tent sites.  Program facilities include a 32 foot climbing tower, two shooting sports areas for Cub Scout and Boy Scout needs, several Nature Centers, Bouldering Wall, and 11 miles of hiking trails.',
      latlon: {
        latitude: 42.971765,
        longitude: -83.257943
      }
    },
    {
      title: 'Camp Hiawatha',
      desc: 'Camp Hiawatha is 800 acres of pristine spruce and pines, and encircles Bunting Lake, a 60 acre lake in the middle of Hiawathaland National Forest in the heart of the Upper Peninsula of Michigan, between the towns of Munising and Chatham. Close by are many trails and waterways including the Pictured Rocks National Lakeshore, The North Country Trail, Grand Island, and the Autrain River.  It offers many opportunities for Units outside of the traditional camping sessions and is available to Units throughout the year as a base camp if they wish to explore the surrounding national forest or hike along the Pictured Rocks National Lakeshore.',
      latlon: {
        latitude: 46.266964,
        longitude: -86.789328
      }
    },
    {
      title: 'Camp Teetonkah',
      desc: 'Camp Teetonkah is located in the Irish Hills of Michigan, southwest of Grass Lake. The camp consists of 240 acres on the shore of Big Wolf Lake. One of the oldest Scout camps in the country. Camp Teetonkah also offers weekend camping for Scout units. Campsites offer on site water, and are a short walk to modern indoor restrooms. The dining hall pavilion is also available to rent for your unit to use for meetings, picnics, or just some protection from the elements. Electricity and lights make using it at night very convenient.',
      latlon: {
        latitude: 42.207288,
        longitude: -84.239430
      }
    }
  ]

  const handleMarkerPress = (marker) => {
    console.log('Marker pressed:', marker);
    // Do something with the marker data
    setIsBottomSheetVisible(true)
    setBottomSheetContent(marker)
  };

  return (
    <SafeAreaProvider>
      <CustomHeader />
      <ThemedView style={styles.container}>

      </ThemedView>

      <MapView
        // mapType='standard'
        showsUserLocation
        showsMyLocationButton
        provider={PROVIDER_GOOGLE}
        initialRegion={SAMPLE_REGION}
        style={styles.map}>
        {
          markers.map((m, i) => {
            return (
              <Marker
                key={i}
                coordinate={m.latlon}
                onPress={() => handleMarkerPress(m)}

              >
                <FontAwesome6 name="campground" size={20} color="black" />

                {/* <Callout>
                  <View style={{ padding: 10, width: 180 }}>
                    <Text style={{ fontSize: 18 }}>{m.title}</Text>
                    <Text style={{ fontSize: 14 }}>{m.desc}</Text>
                  </View>
                </Callout> */}
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
          maximumZ={19} // Adjust based on your tile data
          minimumZ={0}
        // flipY={true}
        /> */}
        {/* <LocalTile
          pathTemplate='../../../data/tiles/'
          tileSize={256}
        /> */}
      </MapView>
      <MarkerSheet
        isVisible={isBottomSheetVisible}
        bottomSheetContent={bottomSheetContent}
        backdropAction={() => setIsBottomSheetVisible(false)} />
    </SafeAreaProvider >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
