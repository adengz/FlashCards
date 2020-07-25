import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, Headline, Subheading } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { darkGray } from '../styles/palette';

const getFormattedStats = (count) => `${count} card${count !== 1 && 's'}`;

export default function DeckCover({ id, titleColor = null }) {
  const deck = useSelector(({ data }) => data.decks[id]);
  const { dark } = useTheme();
  styles.title = { fontWeight: dark ? 'bold' : 'normal' };
  if (titleColor !== null) {
    styles.title.color = titleColor;
  }

  return (
    <View style={styles.coverContainer}>
      <Headline style={styles.title}>{deck.title}</Headline>
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
