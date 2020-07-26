import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { Headline, Subheading, withTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import CardFlip from 'react-native-card-flip';
import { Styles } from '../styles/stylesheet';
import { colorMap, darkGray } from '../styles/palette';

class DeckList extends Component {
  render() {
    const {
      deckList,
      theme: { dark, colors, roundness },
    } = this.props;
    styles.title = { fontWeight: dark ? 'bold' : 'normal' };

    return (
      <View style={[Styles.container, { alignItems: 'center' }]}>
        <FlatList
          data={deckList}
          renderItem={({ item, index }) => {
            const color = colorMap[index % colorMap.length];
            return (
              <CardFlip style={styles.cardContainer} ref={(card) => (this[`card${index}`] = card)}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={[
                    styles.card,
                    { backgroundColor: dark ? colors.surface : color, borderRadius: roundness },
                  ]}
                  onPress={() => this[`card${index}`].jiggle()}
                >
                  <View style={styles.coverContainer}>
                    <Headline style={[styles.title, { color: dark ? color : colors.text }]}>
                      {item.title}
                    </Headline>
                    <Subheading style={styles.stats}>
                      {getFormattedStats(item.cards.length)}
                    </Subheading>
                  </View>
                </TouchableOpacity>
                <View style={styles.card} />
              </CardFlip>
            );
          }}
        />
      </View>
    );
  }
}

const getFormattedStats = (count) => `${count} card${count !== 1 && 's'}`;

const mapStateToProps = ({ data }) => {
  const deckList = Object.values(data.decks);
  deckList.sort((a, b) => a.timestamp - b.timestamp);

  return { deckList };
};

export default withTheme(connect(mapStateToProps)(DeckList));

const styles = StyleSheet.create({
  cardContainer: {
    width: Dimensions.get('window').width * 0.9,
    height: 128,
    marginVertical: 5,
    marginHorizontal: 15,
  },
  card: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4, // android only
  },
  coverContainer: {
    alignItems: 'center',
  },
  stats: {
    color: darkGray,
  },
});
