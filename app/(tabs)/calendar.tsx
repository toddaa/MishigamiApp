import React, { useRef, useCallback, useEffect, useState } from 'react';
import { StyleSheet, Platform, View, Image, Text } from 'react-native';
import { ExpandableCalendar, AgendaList, CalendarProvider, WeekCalendar } from 'react-native-calendars';
import AgendaItem from '@/components/AgendaItem';
import { useDataContext } from '@/components/DataContext'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header, BottomSheet, ListItem, Card, Button } from '@rneui/themed';
// import { dateTimeOptions, dateTimeOptionsB } from '@/constants/Dates'
import { add } from "date-fns";


const leftArrowIcon = require('@/assets/images/previous.png');
const rightArrowIcon = require('@/assets/images/next.png');

function isEmpty (obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
}

export default function CalendarScreen () {
  const { dataState } = useDataContext()
  const [events, setEvents] = useState([])
  const [marks, setMarks] = useState({})
  const [isVisible, setIsVisible] = useState(false);
  const [bottomSheetContent, setBottomSheetContent] = useState({});

  const today = new Date()
  const INITIAL_DATE = today.toISOString().split('T')[0]

  // const { weekView } = props;
  const weekView = false
  const theme = {
    // arrows
    arrowColor: 'black',
    arrowStyle: { padding: 0 },
    // knob
    expandableKnobColor: '#00AAAF',
    // month
    monthTextColor: 'black',
    textMonthFontSize: 16,
    textMonthFontFamily: 'HelveticaNeue',
    textMonthFontWeight: 'bold' as const,
    // day names
    textSectionTitleColor: 'black',
    textDayHeaderFontSize: 12,
    textDayHeaderFontFamily: 'HelveticaNeue',
    textDayHeaderFontWeight: 'normal' as const,
    // dates
    dayTextColor: '#00AAAF',
    todayTextColor: '#af0078',
    textDayFontSize: 18,
    textDayFontFamily: 'HelveticaNeue',
    textDayFontWeight: '500' as const,
    textDayStyle: { marginTop: Platform.OS === 'android' ? 2 : 4 },
    // selected date
    selectedDayBackgroundColor: '#00AAAF',
    selectedDayTextColor: 'white',
    // disabled date
    textDisabledColor: 'grey',
    // dot (marked date)
    dotColor: '#00AAAF',
    selectedDotColor: 'white',
    disabledDotColor: 'grey',
    dotStyle: { marginTop: -2 }
  };
  const todayBtnTheme = useRef({
    todayButtonTextColor: '#00AAAF'
  });

  const getCatColor = (c) => {
    switch (c) {
      case 'West Area Events':
        return 'green';
      case 'Mishigami Lodge Events':
      default:
        return 'red'
    }
  }

  useEffect(() => {
    if (dataState.events !== null) {
      // setEvents(dataState.events)
      // console.log(dataState.events)
      // const items = dataState.events.map(e => {
      //   return {
      //     title: e.startDate.split('T')[0],
      //   }
      // })
      const items = dataState.events.reduce((acc, event) => {
        const startDate = event.startDate.split('T')[0]; // Extract the date (YYYY-MM-DD)
        const hour = new Date(event.startDate).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
        const duration = (new Date(event.endDate) - new Date(event.startDate)) / (1000 * 60); // Duration in minutes

        const existingEntry = acc.find((entry) => entry.title === startDate);

        const eventData = {
          ...event,
          hour,
          duration,
          title: event.name,
          // category: event.category,
        };

        if (existingEntry) {
          existingEntry.data.push(eventData);
        } else {
          acc.push({
            title: startDate,
            data: [eventData],
          });
        }

        return acc;
      }, []);
      // for (const e of dataState.events) {
      //   const { startDate } = e
      //   console.log(startDate.split('T')[0])
      //   // marks[evt.startDate.split('T')[0]] = {
      //   //   marked: true,
      //   //   dotColor: getCatColor(evt.category)
      //   // }
      //   // items[startDate.split('T')[0]] = 'test'
      // }
      // setEvents(marks)
      // console.log(JSON.stringify(items))
      setEvents(items)
    }
  }, [dataState]);

  useEffect(() => {
    if (!isEmpty(events)) {
      const marked: MarkedDates = {};

      events.forEach(item => {
        // NOTE: only mark dates with data
        // console.log(item)
        if (item.data && item.data.length > 0 && !isEmpty(item.data[0])) {
          marked[item.title] = {
            marked: true,
            // dotColor: getCatColor(item.category)
          };
        } else {
          marked[item.title] = { disabled: true };
        }
      });
      setMarks(marked)
    }
  }, [events]);

  const onAgendaPress = (e) => {
    console.log(e)
    setBottomSheetContent(e)
    setIsVisible(true)
  }

  const renderItem = useCallback(({ item }: any) => {
    return <AgendaItem item={item} onPress={onAgendaPress} />;
  }, []);

  return (
    <SafeAreaProvider>
      <Header backgroundColor='#799FAF'
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={
          <Image
            source={require('@/assets/images/Mastodon-56000SM.png')}
            style={styles.reactLogo}
          />
        }
        rightComponent={{ icon: 'home', color: '#fff' }}
      />
      <CalendarProvider
        date={INITIAL_DATE}
        // onDateChanged={onDateChanged}
        // onMonthChange={onMonthChange}
        showTodayButton
        // disabledOpacity={0.6}
        theme={todayBtnTheme.current}
      // todayBottomMargin={16}
      >
        {weekView ? (
          <WeekCalendar testID='weekCalendar' firstDay={0} markedDates={marks} />
        ) : (
          <ExpandableCalendar
            testID='expandableCalendar'
            // horizontal={false}
            // hideArrows
            // disablePan
            // hideKnob
            // initialPosition={ExpandableCalendar.positions.OPEN}
            // calendarStyle={styles.calendar}
            // headerStyle={styles.header} // for horizontal only
            // disableWeekScroll
            theme={theme}
            // disableAllTouchEventsForDisabledDays
            firstDay={0}
            markedDates={marks}
            leftArrowImageSource={leftArrowIcon}
            rightArrowImageSource={rightArrowIcon}
          // animateScroll
          // closeOnDayPress={false}
          />
        )}
        <AgendaList
          sections={events}
          renderItem={renderItem}
          // scrollToNextEvent
          sectionStyle={styles.section}
        // dayFormat={'yyyy-MM-d'}
        />
      </CalendarProvider>
      <BottomEventSheet isVisible={isVisible} bottomSheetContent={bottomSheetContent} backdropAction={() => setIsVisible(false)} />
    </SafeAreaProvider>
  );
};

const BottomEventSheet = ({ isVisible, bottomSheetContent, backdropAction }) => {
  const [start, setStart] = useState('')
  // const date = new Date(bottomSheetContent.startDate)
  // console.log(date)
  // start = new Intl.DateTimeFormat('en-US', dateTimeOptionsB).format(date)
  // console.log(start)

  const startDateOpts = {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
  }

  const endDateOpts = {
    hour: 'numeric',
  }

  useEffect(() => {
    console.log(bottomSheetContent)
    if (!isEmpty(bottomSheetContent)) {
      const { startDate, duration } = bottomSheetContent
      const startingDate = new Date(startDate)
      const startText = new Intl.DateTimeFormat('en-US', startDateOpts).format(startingDate)
      // console.log(startText)

      const endingDate = add(startingDate, { minutes: duration })
      const endText = new Intl.DateTimeFormat('en-US', endDateOpts).format(endingDate)
      // console.log(endText)
      setStart(`${startText} - ${endText}`)

    }
  }, [bottomSheetContent]);

  return (
    <BottomSheet modalProps={{}} isVisible={isVisible} onBackdropPress={backdropAction}>
      <Card containerStyle={{ margin: 0 }}>
        <Card.Title>{bottomSheetContent.title}</Card.Title>
        <Card.Divider />
        <View style={{ position: "relative" }}>
          <Text>{start}</Text>
          {/* <Text>{bottomSheetContent.endDate}</Text> */}
          {/* <Text>{bottomSheetContent.duration}</Text> */}
          <Text>{bottomSheetContent.location}</Text>
          <Text>{bottomSheetContent.signUpURL}</Text>
          <Button title="Add to Calendar" />
        </View>
      </Card>
    </BottomSheet>
  )
}

// export default CalendarScreen;

const styles = StyleSheet.create({
  viewContainer: {
    // padding: 20
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: 10,
    paddingBottom: 10
  },
  calendar: {
    paddingLeft: 20,
    paddingRight: 20
  },
  header: {
    backgroundColor: 'lightgrey'
  },
  section: {
    backgroundColor: '#f2f7f7',
    color: 'grey',
    textTransform: 'capitalize'
  },
  reactLogo: {
    height: 92,
    width: 130,
    alignSelf: 'center',
  },
});
