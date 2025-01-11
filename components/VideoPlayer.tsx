import { useEvent } from 'expo';
import React, { useEffect, useState } from 'react';
import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet, View, Button, Dimensions, Pressable, Text, TouchableOpacity } from 'react-native';

const videoSource =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export default function VideoPlayer ({ src }) {
  const player = useVideoPlayer(videoSource, player => {
    player.loop = false;
    player.muted = true;
    player.staysActiveInBackground = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  const handlePress = () => {
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
  }

  return (
    <>
      {/* <View style={styles.contentContainer}> */}
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
      // allowsPictureInPicture
      // startsPictureInPictureAutomatically
      // showsTimecodes
      // contentFit="fill"
      // nativeControls={true}
      />
      {/* <View style={styles.controlsContainer}> */}
      {/* <Pressable style={styles.controlButton}
        onPress={handlePress}
      >
        <Text>{isPlaying ? 'Pause' : 'Play'}</Text>
      </Pressable> */}
      {/* </View> */}
      {/* </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
    backgroundColor: 'teal'
  },
  video: {
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
    width: 350,
    height: 275,
    backgroundColor: 'blue'
  },
  controlsContainer: {
    padding: 10,
  },
  controlButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center',
    marginTop: 20
  }
});
