import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Headline, Subheading } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { darkGray } from '../styles/palette';

const getFormattedStats = (count) => `${count} card${count !== 1 && 's'}`;

export default function DeckCover({ id }) {
  const deck = useSelector(({ data }) => data.decks[id]);

  return (
    <View style={styles.coverContainer}>
      <Headline>{deck.title}</Headline>
      <Subheading style={styles.stats}>{getFormattedStats(deck.cards.length)}</Subheading>
    </View>
  );
}

const styles = StyleSheet.create({
  coverContainer: {
    alignItems: 'center',
  },
  stats: {
    color: darkGray,
  },
});
