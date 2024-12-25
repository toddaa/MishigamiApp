import React, {useEffect,useState} from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
const dateTimeOptions = {
  year: 'numeric',
  month: 'numeric',
  day: '2-digit',
  // hour: 'numeric',
  // minute: 'numeric',
  // second: 'numeric',
  // hour12:true,
  // timeZoneName: 'short'
}
export default function TabTwoScreen() {
  const [pageToken, setPageToken] =useState('')
  const [events, setEvents] =useState([])
  const [viewableEvents, setViewableEvents] =useState([])

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    {label: 'Lodge Executive Committee', value: 'Lodge Executive Committee'},
    {label: 'Inductions', value: 'Inductions' },
    {label: 'Lodge Events', value: 'Lodge Events' },
    
  ]);
  const CALENDAR_ID = 'c_ts6npsnahqspjgu18j0p8lu9uc@group.calendar.google.com';
  const API_KEY = 'AIzaSyCUAeWuG0RjOTcW7GHPHzTN5e4e7Jl96KI';
  const beginDate = new Date();
  let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}&timeMin=${beginDate.toISOString()}&maxResults=50&singleEvents=true&orderBy=startTime&pageToken=${pageToken}`;
  useEffect(() => {
    fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
              console.log(responseJson.items)
              setEvents(responseJson.items)
                // this.setState({
                //     pageToken: responseJson.nextPageToken,
                //     dataSource: [...this.state.dataSource, ...responseJson.items],
                //     loading: false,
                //     refreshing: false,
                //     error: responseJson.error || null,
                // });
            })
            .then(() => {
                // this.getDates()
            }) 
            .catch(error => {
                // this.setState({ error, loading: false, refreshing: false });
            });
  }, []);
  useEffect(()=> {
setViewableEvents (events)
  }, [events]);

  const filterChange = (value) => {
    console.log(value);
    let temp = []
    if (value.length<1){
      setViewableEvents (events)
    } else {
       temp = events.map((e) => {
        if (value.includes(e.summary)) {
          return e
        }
      }).filter(val => val !== undefined)
      console.log ({temp})
      setViewableEvents(temp)
    }

  }
    

  return (
    <ParallaxScrollView
    headerBackgroundColor={{ light: '#A1CEDC', dark: '#799FAF' }}
    headerImage={
      <Image
        source={require('@/assets/images/Mishigami-Blue-Mastodon-Arrow-Text.png')}
        style={styles.reactLogo}
      />
    }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Calendar</ThemedText>
      </ThemedView>

      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onChangeValue={filterChange}

        theme="DARK"
        multiple={true}
        mode="BADGE"
        badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
      />
      
      {
        viewableEvents.map((e,i) => {
          let endDate ='' 
          if (e?.end.dateTime !== undefined) {
            endDate = new Intl.DateTimeFormat('en-US', dateTimeOptions).format(new Date(e?.end.dateTime))
          }

          let startDate ='' 
          if (e?.start.dateTime !== undefined) {
            startDate = new Intl.DateTimeFormat('en-US', dateTimeOptions).format(new Date(e?.start.dateTime))
          }

          let desc ='' 
          if (e?.description !== undefined) {
            desc = e?.description
          }
          let title = e?.summary
          if (startDate !=='' ){
            title =`${title} ${startDate}`
          }
          if (endDate !=='' ){
            title =`${title} to ${endDate}`
          }
          return <Collapsible key={i} title={title}>
          <ThemedText>
            {desc}
          </ThemedText>
          <ThemedText>
            Location: {e?.location}
          </ThemedText>
          
          <ExternalLink href="https://docs.expo.dev/router/introduction">
            <ThemedText type="link">Learn more</ThemedText>
          </ExternalLink>
        </Collapsible>
        })
      }
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  reactLogo: {
    height: 75,
    width: 150,
    top: 60,
    alignSelf: 'center',
  },
});
