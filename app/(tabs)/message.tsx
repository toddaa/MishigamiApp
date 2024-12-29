import { useEffect, useState } from 'react';
import { Image, StyleSheet, Platform, Text, View, SafeAreaView, ScrollView, FlatList, Animated, TextInput, TouchableOpacity, } from 'react-native';
import CustomParallaxScrollView from '@/components/CustomParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { startOfYear, endOfYear, differenceInDays, add } from 'date-fns';
import { generateClient } from 'aws-amplify/api';
import { listMessages } from '../../src/graphql/queries';
import { sortUpdatedDesc } from '@/helpers/utils'

const client = generateClient();

export default function MessagesScreen () {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    async function fetchData () {
      const now = new Date();
      const startOfYearDate = startOfYear(now);
      // let endOfYearDate = endOfYear(now);

      // if (differenceInDays(new Date(startOfYearDate), new Date(endOfYearDate)) < 60) {
      //   endOfYearDate = add(new Date(endOfYearDate), { days: 60 })
      // }

      const messages = await client.graphql({ query: listMessages, variables: { filter: { updatedAt: { ge: startOfYearDate } } } });
      setMessages(messages.data.listMessages.items.sort(sortUpdatedDesc))
    }
    fetchData();

  }, [])
  return (
    <CustomParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#799FAF' }}
      headerImage={
        <Image
          source={require('@/assets/images/Mastodon-56000SM.png')}
          style={styles.reactLogo}
        />
      }>

      <View style={styles.viewContainer}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Messages</ThemedText>
        </ThemedView>

        {
          messages.map((e, i) => {
            const title = e?.title

            return <ThemedView key={i}>

              <ThemedText type='subtitle'>
                {title}
              </ThemedText>

              <View
                style={styles.seperator}
              />

            </ThemedView>
          })
        }

        <ThemedText style={styles.title} >Write your message</ThemedText>
        <TextInput style={styles.inputStyle} multiline placeholder='Subject' />

        <TextInput style={styles.inputStyle} multiline placeholder='Message' />

        <TouchableOpacity onPress={() => { }} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Send Message</Text>
        </TouchableOpacity>

      </View>

    </CustomParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    padding: 20
  },
  seperator: {
    borderBottomColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 15,
    marginTop: 15
  },
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
  },
  submitButton: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center',
    marginTop: 20
  },
  inputStyle: {
    color: '#fff',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
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
    height: 92,
    width: 130,
    top: 55,
    alignSelf: 'center',
  },
  center: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  // slide: {
  //   padding: 100,
  //   width: 100,
  //   height: "100%"
  // },
  // scrollView: {
  //   width: "115%",
  //   height: "200%",
  //   alignSelf: 'center',
  // },
  // horizontalscrollView: {
  //   width: "115%",
  //   height: "200%",
  //   alignSelf: 'center',
  // },
  // item: {
  //   margin: 40,
  //   height: 700
  // },
  // pictureTitle: {
  //   alignSelf: 'center',
  // },
});
