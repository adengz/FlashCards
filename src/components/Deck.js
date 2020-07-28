import React from 'react';
import { View } from 'react-native';
import DeckTitle from './DeckTitle';
import CardList from './CardList';
import Styles from '../styles/stylesheet';

export default function Deck() {
  return (
    <View style={Styles.mainContainer}>
      <DeckTitle />
      <CardList />
    </View>
  );
}
