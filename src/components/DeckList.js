import React, { Component } from 'react';
import { View, FlatList, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Headline, Subheading, withTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import CardFlip from 'react-native-card-flip';
import { getFormattedStats } from '../utils/helpers';
import Styles from '../styles/stylesheet';
import { colorMap } from '../styles/palette';

class DeckList extends Component {
  render() {
    const {
      deckList,
      navigation,
      theme: { dark, colors, roundness },
    } = this.props;

    return (
      <View style={[Styles.mainContainer, { alignItems: 'center' }]}>
        <FlatList
          data={deckList}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            const { id, title, cards } = item;
            const color = colorMap[index % colorMap.length];
            return (
              <CardFlip
                style={styles.cardContainer}
                ref={(card) => {
                  this[`card${index}`] = card;
                }}
              >
                <TouchableWithoutFeedback
                  onPress={() => {
                    this[`card${index}`].jiggle();
                    setTimeout(() => navigation.navigate('Deck', { id }), 500);
                  }}
                >
                  <View
                    style={[
                      Styles.flipCard,
                      { backgroundColor: dark ? colors.surface : color, borderRadius: roundness },
                    ]}
                  >
                    <Headline
                      style={[
                        styles.deckTitle,
                        { color: dark ? color : colors.text, fontWeight: dark ? 'bold' : 'normal' },
                      ]}
                      numberOfLines={1}
                    >
                      {title}
                    </Headline>
                    <Subheading>{getFormattedStats(cards.length)}</Subheading>
                  </View>
                </TouchableWithoutFeedback>
                <View style={styles.card} />
              </CardFlip>
            );
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ settings, data }) => {
  const deckList = Object.values(data.decks);
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
  deckList.sort(sortFunc);
  if (descending) {
    deckList.reverse();
  }

  return { deckList };
};

export default withTheme(connect(mapStateToProps)(DeckList));

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
