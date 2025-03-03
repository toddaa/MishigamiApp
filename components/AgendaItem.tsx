import React, { useCallback } from 'react';
import { StyleSheet, Alert, View, Text, TouchableOpacity, Button } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

interface ItemProps {
  item: any;
  onPress: any;
}

function isEmpty (obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
}

const AgendaItem = (props: ItemProps) => {
  const colorScheme = useColorScheme();
  const { item, onPress } = props;
  // console.log(item)

  const styles = StyleSheet.create({
    item: {
      padding: 20,
      backgroundColor: (colorScheme === 'light' ? 'white' : 'black'),
      borderBottomWidth: 1,
      borderBottomColor: 'lightgrey',
      flexDirection: 'row'
    },
    itemHourText: {
      color: (colorScheme === 'light' ? 'black' : 'white')
    },
    itemDurationText: {
      color: 'grey',
      fontSize: 12,
      marginTop: 4,
      marginLeft: 4
    },
    itemTitleText: {
      color: (colorScheme === 'light' ? 'black' : 'white'),
      marginLeft: 16,
      fontWeight: 'bold',
      fontSize: 16
    },
    itemButtonContainer: {
      flex: 1,
      alignItems: 'flex-end'
    },
    emptyItem: {
      paddingLeft: 20,
      height: 52,
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: 'lightgrey',
      // borderBottomColor: (colorScheme === 'light' ? 'lightgrey' : 'darkgrey'),
    },
    emptyItemText: {
      color: 'lightgrey',
      fontSize: 14
    }
  });

  const itemPressed = useCallback(() => {
    onPress(item)
  }, []);

  if (isEmpty(item)) {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned Today</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={itemPressed} style={styles.item} testID='item'>
      <View>
        <Text style={styles.itemHourText}>{item.hour}</Text>
        {/* <Text style={styles.itemDurationText}>{item.duration} m</Text> */}
      </View>
      <Text style={styles.itemTitleText}>{item.name}</Text>
      {/* <View style={styles.itemButtonContainer}>
        <Button color={'grey'} title={'Info'} onPress={buttonPressed} />
      </View> */}
    </TouchableOpacity>
  );
};

export default React.memo(AgendaItem);
