import React from 'react';
import { View, SafeAreaView, StyleSheet, Platform } from 'react-native';
import { Button } from 'react-native-paper';
import DeckTitle from './DeckTitle';
import CardList from './CardList';
import Styles from '../styles/stylesheet';

export default function Deck() {
  return (
    <View style={Styles.mainContainer}>
      <DeckTitle />
      <CardList />
      <SafeAreaView style={styles.actionBtnRow}>
        <Button
          {...actionBtnProps}
          mode="outlined"
          icon="plus-circle"
          children="Add a Card"
          onPress={() => console.log('add a card')}
        />
        <Button
          {...actionBtnProps}
          mode="contained"
          icon="cards"
          children="Start Quiz"
          onPress={() => console.log('start quiz')}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  actionBtnRow: {
    flexDirection: 'row',
  },
  actionBtn: {
    flex: 1,
    margin: 10,
    ...Platform.select({
      ios: {
        elevation: 0,
      },
    }),
  },
  actionBtnLabel: {
    fontSize: 18,
  },
});

const actionBtnProps = {
  style: styles.actionBtn,
  labelStyle: styles.actionBtnLabel,
  uppercase: Platform.OS === 'android',
};
