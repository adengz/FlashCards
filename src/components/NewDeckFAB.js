import React from 'react';
import { StyleSheet, Platform, Dimensions } from 'react-native';
import { useTheme, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function NewDeckFAB() {
  const navigation = useNavigation();
  const { primary } = useTheme().colors;
  return (
    <FAB
      style={[styles.fab, { backgroundColor: primary }]}
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
