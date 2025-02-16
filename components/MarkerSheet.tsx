import React, { useRef, useCallback, useEffect, useState } from 'react';
import { StyleSheet, Platform, View, Image, TouchableOpacity, Text, ScrollView } from 'react-native';
import { ExpandableCalendar, AgendaList, CalendarProvider, WeekCalendar } from 'react-native-calendars';
import AgendaItem from '@/components/AgendaItem';
import { useDataContext } from '@/components/DataContext'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CustomHeader } from '@/components/CustomHeader';
import { Header, BottomSheet, ListItem, Card, Button, Dialog, CheckBox, Input } from '@rneui/themed';
import { useColorScheme } from '@/hooks/useColorScheme';
import openMap from 'react-native-open-maps';
import * as Linking from 'expo-linking';



const MarkerSheet = ({ isVisible, bottomSheetContent, backdropAction }) => {
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    markerDescription: {
      fontSize: 18,
      color: (colorScheme === 'light' ? 'black' : 'white'),
      marginBottom: 10
    },
    card: {
      margin: 0,
      paddingBottom: 40,
      backgroundColor: (colorScheme === 'light' ? 'white' : 'black'),
      borderBottomWidth: 0
    },
    markerTitle: {
      color: (colorScheme === 'light' ? 'black' : 'white'),
      fontSize: 20,
    },
  })

  const pressHandler = async () => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${bottomSheetContent.latlon.latitude},${bottomSheetContent.latlon.longitude}`;
    const url = Platform.select({
      ios: `${scheme}${bottomSheetContent.title}@${latLng}`,
      android: `${scheme}${latLng}(${bottomSheetContent.title})`
    });
    // console.log(url)
    Linking.openURL(url);
  }

  return (
    <BottomSheet
      modalProps={{}}
      isVisible={isVisible}
      onBackdropPress={backdropAction}
    >
      <Card containerStyle={styles.card}>
        <Card.Title style={styles.markerTitle}>{bottomSheetContent.title}</Card.Title>
        <Card.Divider />
        <Text style={styles.markerDescription}>{bottomSheetContent.desc}</Text>
        <Button title="Navigate" onPress={pressHandler} />
      </Card>
    </BottomSheet>
  )
}

export default MarkerSheet
