import React, { useRef, useCallback, useEffect, useState } from 'react';
import { StyleSheet, Platform, View, Image, TouchableOpacity, Text, ScrollView } from 'react-native';
import { ExpandableCalendar, AgendaList, CalendarProvider, WeekCalendar } from 'react-native-calendars';
import AgendaItem from '@/components/AgendaItem';
import { useDataContext } from '@/components/DataContext'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CustomHeader } from '@/components/CustomHeader';
import { Header, BottomSheet, ListItem, Card, Button, Dialog, CheckBox, Input } from '@rneui/themed';
import { add } from "date-fns";
import * as Calendar from 'expo-calendar';
import { useColorScheme } from '@/hooks/useColorScheme';

function isEmpty (obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
}

const EventAddSheet = ({ isVisible, bottomSheetContent, backdropAction }) => {
  const colorScheme = useColorScheme();
  const [start, setStart] = useState('')

  // const date = new Date(bottomSheetContent.startDate)
  // console.log(date)
  // start = new Intl.DateTimeFormat('en-US', dateTimeOptionsB).format(date)
  // console.log({ isVisible })
  // console.log({ bottomSheetContent })

  const startDateOpts = {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
  }

  const endDateOpts = {
    hour: 'numeric',
  }

  const styles = StyleSheet.create({
    eventTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: (colorScheme === 'light' ? 'black' : 'white'),
    },
    eventField: {
      fontSize: 18,
      margin: 5,
      color: (colorScheme === 'light' ? 'black' : 'white'),
    },
    card: {
      margin: 0,
      paddingBottom: 40,
      backgroundColor: (colorScheme === 'light' ? 'white' : 'black'),
      borderBottomWidth: 0
    },
    cardTitle: {
      color: (colorScheme === 'light' ? 'grey' : 'white'),
    },
    pickerIcon: {
      marginRight: 10,
      marginTop: 10
    }
  })

  useEffect(() => {
    // console.log(bottomSheetContent)
    if (!isEmpty(bottomSheetContent)) {
      (async () => {
        const { startDate, duration } = bottomSheetContent
        const startingDate = new Date(startDate)
        const startText = new Intl.DateTimeFormat('en-US', startDateOpts).format(startingDate)
        // console.log(startText)

        const endingDate = add(startingDate, { minutes: duration })
        const endText = new Intl.DateTimeFormat('en-US', endDateOpts).format(endingDate)
        // console.log(endText)
        setStart(`${startText} to ${endText}`)
      })();
    }
  }, [bottomSheetContent]);

  const pressHandler = async () => {
    const eventConfig = {
      title: bottomSheetContent.name,
      startDate: new Date(bottomSheetContent.startDate).toISOString(),
      endDate: new Date(bottomSheetContent.endDate).toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      location: bottomSheetContent.location,
      notes: bottomSheetContent.description,
      url: bottomSheetContent.signUpURL
    }

    const result = await Calendar.createEventInCalendarAsync(eventConfig)
    // console.log(result)
    if (result.action === 'saved') {
      backdropAction()
    }
  }

  return (
    <BottomSheet
      modalProps={{}}
      isVisible={isVisible}
      onBackdropPress={backdropAction}
    >
      <Card containerStyle={styles.card}>
        <Card.Title style={styles.cardTitle}>Add Event to Calendar</Card.Title>
        <Card.Divider />
        <Text style={styles.eventTitle}>{bottomSheetContent.name}</Text>
        <Text style={styles.eventField}>{start}</Text>
        {
          bottomSheetContent.description !== ''
            ? <Text style={styles.eventField}>{bottomSheetContent.description}</Text>
            : ''
        }
        {
          bottomSheetContent.location !== ''
            ? <Text style={styles.eventField}>{bottomSheetContent.location}</Text>
            : ''
        }
        {
          bottomSheetContent.signUpURL !== ''
            ? <Text style={styles.eventField}>{bottomSheetContent.signUpURL}</Text>
            : ''
        }
        <Button title="Add to Calendar" onPress={pressHandler} />
      </Card>
    </BottomSheet>
  )
}

export default EventAddSheet
