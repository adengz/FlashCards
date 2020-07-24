import React from 'react';
import { StyleSheet, Platform, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FAB } from 'react-native-paper';

export default function NewDeckFAB() {
  const navigation = useNavigation();
  return (
    <FAB
      style={styles.fab}
      small={false}
      icon="plus"
      onPress={() => navigation.navigate('New Deck')}
    />
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    ...Platform.select({
      android: {
        right: 0,
        bottom: 0,
        margin: 16,
      },
      ios: {
        bottom: '50%',
        left: Dimensions.get('window').width / 2 - 28,
        elevation: 0,
      },
    }),
  },
});
