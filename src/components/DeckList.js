import React, { Component } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
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
