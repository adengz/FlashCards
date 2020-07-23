import React, { Component } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Styles } from '../styles/stylesheet';

export default class DeckList extends Component {
  render() {
    return (
      <SafeAreaView style={Styles.container}>
        <Text>Deck List</Text>
      </SafeAreaView>
    );
  }
}
