import React, { useRef } from 'react';
import { TouchableWithoutFeedback, View, FlatList, StyleSheet } from 'react-native';
import { useTheme, Headline, Subheading } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import CardFlip from 'react-native-card-flip';
import { getFormattedStats } from '../utils/helpers';
import Styles from '../styles/stylesheet';
import { colorMap } from '../styles/palette';

export default function DeckList() {
  const deckList = useSelector(({ settings, data }) => {
    const list = Object.values(data.decks);
    const { by, descending } = settings.sortDecks;
    let sortFunc;
    switch (by) {
      case 'title':
        sortFunc = (a, b) => (a.title < b.title ? -1 : 1);
        break;
      case 'cards':
        sortFunc = (a, b) => a.cards.length - b.cards.length;
        break;
      default:
        sortFunc = (a, b) => a.timestamp - b.timestamp;
    }
    list.sort(sortFunc);
    if (descending) {
      list.reverse();
    }
    return list;
  });

  const cardList = useRef([]);

  const navigation = useNavigation();
  const {
    dark,
    roundness,
    colors: { surface, text },
  } = useTheme();

  const renderItem = ({ item, index }) => {
    const { id, title, cards } = item;
    const color = colorMap[index % colorMap.length];
    return (
      <CardFlip
        style={styles.cardContainer}
        ref={(card) => {
          cardList.current[index] = card;
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            cardList.current[index].jiggle();
            setTimeout(() => navigation.navigate('Deck', { id }), 500);
          }}
        >
          <View
            style={[
              Styles.flipCard,
              { backgroundColor: dark ? surface : color, borderRadius: roundness },
            ]}
          >
            <Headline
              style={[
                styles.deckTitle,
                { color: dark ? color : text, fontWeight: dark ? 'bold' : 'normal' },
              ]}
              numberOfLines={1}
            >
              {title}
            </Headline>
            <Subheading>{getFormattedStats(cards.length)}</Subheading>
          </View>
        </TouchableWithoutFeedback>
        <View style={Styles.flipCard} />
      </CardFlip>
    );
  };

  return (
    <View style={[Styles.mainContainer, { alignItems: 'center' }]}>
      <FlatList data={deckList} keyExtractor={(item) => item.id} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    ...Styles.flipCardContainer,
    height: 128,
    marginVertical: 5,
    marginHorizontal: 15,
  },
  deckTitle: {
    paddingHorizontal: 10,
  },
});
