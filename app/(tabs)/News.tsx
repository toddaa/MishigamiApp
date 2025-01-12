import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Platform, View, Text, Dimensions } from 'react-native';
import CustomParallaxScrollView from '@/components/CustomParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import HTMLView from 'react-native-htmlview';
import Unorderedlist from 'react-native-unordered-list';
import { dateTimeOptions } from '@/constants/Dates'
import { useDataContext } from '@/components/DataContext'
import VideoPlayer from '@/components/VideoPlayer'

const { width } = Dimensions.get('window');

export default function NewsScreen () {
  const { dataState } = useDataContext()
  const [news, setNews] = useState([])

  useEffect(() => {
    if (dataState.articles !== null) {
      setNews(dataState.articles)
    }

  }, [dataState])

  function renderNode (node, index, siblings, parent, defaultRenderer) {
    // console.log(node.name)
    if (node.name === 'li') {
      return (
        <Unorderedlist key={index} bulletUnicode={0x2022} color='white' style={{ fontSize: 20 }}>
          <Text style={{ marginTop: 5 }}>
            {defaultRenderer(node.children, parent)}
          </Text>
        </Unorderedlist>
      )
    }
    if (node.name === 'img') {
      const imageURL = node.attribs['data-orig-file']

      const finalSize = {};
      if (node.attribs.width > width) {
        finalSize.width = width;
        const ratio = width / node.attribs.width;
        finalSize.height = node.attribs.height * ratio;
      }

      const imgStyle = StyleSheet.create({
        width: finalSize.width,
        height: finalSize.height,
      })
      return (
        <Image
          key={index}
          src={imageURL}
          style={imgStyle}
        />
      )
    }
    if (node.name === 'video') {
      const videoUrl = node.attribs.src
      console.log(node.attribs.src)
      return (
        <VideoPlayer key={index} src={videoUrl} />
      )
    }
  }

  return (
    <CustomParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#799FAF' }}
      // style={{ padding: 10 }}
      headerImage={
        <Image
          source={require('@/assets/images/Mastodon-56000SM.png')}
          style={styles.reactLogo}
        />
      }>
      <View style={styles.viewContainer}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">News</ThemedText>
        </ThemedView>

        {
          news.map((e, i) => {
            const title = e?.title
            let desc = e?.description


            let updatedDate = ''
            if (e?.updatedAt !== undefined) {
              updatedDate = new Intl.DateTimeFormat('en-US', dateTimeOptions).format(new Date(e?.updatedAt))
            }

            return <ThemedView key={i}>
              <ThemedText type='subtitle'>
                {title}
              </ThemedText>

              <View style={styles.row}>
                <ThemedText type='link' style={styles.leftText}>by {e?.author}</ThemedText>
                <ThemedText type='link' style={styles.rightText}>{updatedDate}</ThemedText>
              </View>

              <HTMLView
                value={desc}
                stylesheet={styles}
                renderNode={renderNode}
              />

              <View
                style={styles.seperator}
              />
            </ThemedView>
          })
        }
      </View>
    </CustomParallaxScrollView >
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
  p: {
    color: 'white',
    fontSize: 16,
    marginBottom: -20
  },
  ul: {
    color: 'white',
    paddingBottom: 20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Align items to opposite ends
    marginBottom: 10
  },
  leftText: {
    textAlign: 'left',
  },
  rightText: {
    textAlign: 'right',
  },
});
