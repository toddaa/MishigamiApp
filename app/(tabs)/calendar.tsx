import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, Platform } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { sortStartDesc } from '@/helpers/utils'
import { dateTimeOptions } from '@/constants/Dates'
import { useDataContext } from '@/components/DataContext'

export default function CalendarScreen () {
  const { dataState } = useDataContext()
  const [events, setEvents] = useState([])
  const [viewableEvents, setViewableEvents] = useState([])

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    { label: 'Lodge Executive Committee', value: 'Lodge Executive Committee' },
    { label: 'Inductions', value: 'Inductions' },
    { label: 'Lodge Events', value: 'Lodge Events' },

  ]);

  useEffect(() => {
    if (dataState.events !== null) {
      setEvents(dataState.events)
    }
  }, [dataState]);

  useEffect(() => {
    setViewableEvents(events.sort(sortStartDesc))
  }, [events]);

  const filterChange = (value) => {
    let temp = []
    if (value.length < 1) {
      setViewableEvents(events)
    } else {
      temp = events.map((e) => {
        if (value.includes(e.summary)) {
          return e
        }
      }).filter(val => val !== undefined)
      setViewableEvents(temp)
    }

  }


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#799FAF' }}
      headerImage={
        <Image
          source={require('@/assets/images/Mastodon-56000SM.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Calendar</ThemedText>
      </ThemedView>

      {/* <DropDownPicker
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
      /> */}

      {
        viewableEvents.map((e, i) => {
          let endDate = ''
          if (e?.endDate !== undefined) {
            endDate = new Intl.DateTimeFormat('en-US', dateTimeOptions).format(new Date(e?.endDate))
          }

          let startDate = ''
          if (e?.startDate !== undefined) {
            startDate = new Intl.DateTimeFormat('en-US', dateTimeOptions).format(new Date(e?.startDate))
          }

          let desc = ''
          if (e?.description !== undefined) {
            desc = e?.description
          }
          let title = e?.name
          if (startDate !== '') {
            title = `${title} ${startDate}`
          }
          if (endDate !== '') {
            title = `${title} to ${endDate}`
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
    height: 92,
    width: 130,
    top: 55,
    alignSelf: 'center',
  },
});
