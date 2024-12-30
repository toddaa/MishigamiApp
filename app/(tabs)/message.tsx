import { useEffect, useState } from 'react';
import { Image, StyleSheet, Platform, Text, View, SafeAreaView, ScrollView, FlatList, Animated, TextInput, TouchableOpacity, } from 'react-native';
import CustomParallaxScrollView from '@/components/CustomParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useDataContext } from '@/components/DataContext'
import { useBoolVariation } from '@launchdarkly/react-native-client-sdk'

const MyTextInput = ({ style, value, name = '', onChange, placeholder, placeholderTextColor }) => {
  return (
    <TextInput
      style={style}
      value={value}
      placeholderTextColor={placeholderTextColor}
      placeholder={placeholder}
      onChangeText={text => onChange({ name, text })}
    />
  );
};

export default function MessagesScreen () {
  const messageFlag = useBoolVariation('message', false)
  const { dataState, sendMessage } = useDataContext()
  const [messages, setMessages] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSubmitable, setIsSubmitable] = useState(false)
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
  })
  useEffect(() => {
    if (dataState.messages !== null) {
      setMessages(dataState.messages)
    }

  }, [dataState])

  useEffect(() => {
    if (formData.subject && formData.message) {
      setIsSubmitable(true)
    } else {
      setIsSubmitable(false)
    }
  }, [formData])

  const handleSubmit = () => {
    sendMessage(formData)
  };

  const handleFieldChange = event => {
    const { name, text } = event;
    setFormData({
      ...formData,
      [name]: text
    })
  }

  return (
    <CustomParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#799FAF' }}
      headerImage={
        <Image
          source={require('@/assets/images/Mastodon-56000SM.png')}
          style={styles.reactLogo}
        />
      }>

      {!messageFlag
        ? <View style={styles.viewContainerNewMessage}>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title" style={{ color: 'black' }}>New Message</ThemedText>
          </ThemedView>

          {/* <ThemedText style={styles.title} >Write your message</ThemedText> */}

          <MyTextInput
            style={styles.inputStyle}
            // multiline
            placeholderTextColor={'#808080'}
            placeholder='Subject'
            name='subject'
            onChange={handleFieldChange}
            value={formData.subject} />

          <MyTextInput
            style={styles.inputStyle}
            // multiline
            placeholderTextColor={'#808080'}
            placeholder='Message'
            name='message'
            onChange={handleFieldChange}
            value={formData.message} />

          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}
            disabled={!isSubmitable}>
            <Text style={styles.submitButtonText}>Send Message</Text>
          </TouchableOpacity>

        </View>
        : ''
      }


      <View style={styles.viewContainer}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Messages</ThemedText>
        </ThemedView>

        {
          messages.map((e, i) => {
            const title = e?.title
            const body = e?.body

            return <ThemedView key={i}>

              <ThemedText type='subtitle'>
                {title}
              </ThemedText>
              <ThemedText type='default'>
                {body}
              </ThemedText>

              <View
                style={styles.seperator}
              />

            </ThemedView>
          })
        }

      </View>

    </CustomParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    padding: 20
  },
  viewContainerNewMessage: {
    margin: 10,
    borderColor: 'grey',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white'
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
    color: 'black',
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
    backgroundColor: 'transparent'
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
