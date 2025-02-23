import { useEffect, useState } from 'react';
import { Image, StyleSheet, Platform, Text, View, SafeAreaView, ScrollView, FlatList, Animated, TextInput, TouchableOpacity, } from 'react-native';
import CustomParallaxScrollView from '@/components/CustomParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useDataContext } from '@/components/DataContext'
import { useBoolVariation } from '@launchdarkly/react-native-client-sdk'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header, Icon } from '@rneui/base';
import { router } from 'expo-router';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { CustomHeader } from '@/components/CustomHeader';
import SelectDropdown from 'react-native-select-dropdown'
import { Badge, ListItem } from '@rneui/themed'
import { useColorScheme } from '@/hooks/useColorScheme';

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
  const colorScheme = useColorScheme();
  const messageFlag = useBoolVariation('message', false)
  const { dataState, sendMessage } = useDataContext()
  const [messages, setMessages] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSubmitable, setIsSubmitable] = useState(false)
  const [subscriptions, setSubscriptions] = useState([])
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    target: '',
  })

  useEffect(() => {
    console.log({ messageFlag })
  }, [messageFlag])

  useEffect(() => {
    if (dataState.messages !== null) {
      setMessages(dataState.messages)
    }
    setSubscriptions(Object.keys(dataState.subscriptions).filter(key => dataState.subscriptions[key]))
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

  const handleTextFieldChange = event => {
    const { name, text } = event;
    setFormData({
      ...formData,
      [name]: text
    })
  }

  const handleSelectFieldChange = event => {
    const { value } = event;
    setFormData({
      ...formData,
      target: value
    })
  }

  const emojisWithIcons = [
    { title: 'All Lodge', value: 'lodge' },
    { title: 'North Area', value: 'north' },
    { title: 'South Area', value: 'south' },
    { title: 'East Area', value: 'east' },
    { title: 'West Area', value: 'west' },
    { title: 'Central Area', value: 'central' },
  ];

  const listTheme = {
    messageList: {
      backgroundColor: (colorScheme === 'light' ? 'white' : '#131617'),
      marginLeft: -20,
      marginRight: -20,

    },
    title: {
      color: (colorScheme === 'light' ? 'black' : 'white'),
      fontWeight: "bold"
    },
    body: {
      color: (colorScheme === 'light' ? 'black' : 'white'),
    },
    badge: {
      width: 30,
      height: 30,
      borderWidth: 0
    },
    badgeText: {
      fontWeight: 'bold',
      fontSize: 16
    },
  }

  return (
    <SafeAreaProvider>
      <CustomHeader />
      <ScrollView>
        <ThemedView style={styles.container}>
          {messageFlag
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
                onChange={handleTextFieldChange}
                value={formData.subject} />

              <MyTextInput
                style={styles.inputStyle}
                // multiline
                placeholderTextColor={'#808080'}
                placeholder='Message'
                name='message'
                onChange={handleTextFieldChange}
                value={formData.message} />

              <SelectDropdown
                data={emojisWithIcons}
                // onSelect={(selectedItem, index) => {
                //   console.log(selectedItem, index);
                // }}
                onSelect={handleSelectFieldChange}
                renderButton={(selectedItem, isOpened) => {
                  return (
                    <View style={styles1.dropdownButtonStyle}>
                      {/* {selectedItem && (
                      <Icon name={selectedItem.icon} style={styles1.dropdownButtonIconStyle} />
                    )} */}
                      <Text style={styles1.dropdownButtonTxtStyle}>
                        {(selectedItem && selectedItem.title) || 'Target Group'}
                      </Text>
                      {/* <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles1.dropdownButtonArrowStyle} /> */}
                    </View>
                  );
                }}
                renderItem={(item, index, isSelected) => {
                  return (
                    <View style={{ ...styles1.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                      {/* <Icon name={item.icon} style={styles1.dropdownItemIconStyle} /> */}
                      <Text style={styles1.dropdownItemTxtStyle}>{item.title}</Text>
                    </View>
                  );
                }}
                showsVerticalScrollIndicator={false}
              // dropdownStyle={styles.dropdownMenuStyle}
              />

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
              messages
                .filter(m => {
                  if (subscriptions.includes(m.target)) {
                    return true
                  }
                  return false
                })
                .map((e, i) => {
                  const title = e?.title
                  const body = e?.body
                  const target = e?.target.charAt(0).toUpperCase()

                  return <ListItem key={i} bottomDivider containerStyle={listTheme.messageList}>
                    <Badge value={target} status="error" badgeStyle={listTheme.badge} textStyle={listTheme.badgeText} />
                    <ListItem.Content>
                      <ListItem.Title style={listTheme.title}>{title}</ListItem.Title>
                      <ListItem.Subtitle style={listTheme.body}>{body}</ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>

                  // return <ThemedView key={i}>

                  //   <Badge value="3" status="success" />
                  //   <ThemedText type='subtitle'>
                  //     {title}
                  //   </ThemedText>
                  //   <ThemedText type='default'>
                  //     {body}
                  //   </ThemedText>

                  //   <View
                  //     style={styles.seperator}
                  //   />

                  // </ThemedView>
                })
            }

          </View>
        </ThemedView>
      </ScrollView>
    </SafeAreaProvider >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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

});

const styles1 = StyleSheet.create({
  dropdownButtonStyle: {
    width: 200,
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
