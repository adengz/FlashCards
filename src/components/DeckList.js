import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, Platform, Dimensions, StyleSheet } from 'react-native';
import { Paragraph, FAB, withTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import CardFlip from 'react-native-card-flip';
import DeckCover from './DeckCover';
import { Styles } from '../styles/stylesheet';
import { colorMap } from '../styles/palette';

class DeckList extends Component {
  render() {
    const {
      deckList,
      theme: { dark, colors },
    } = this.props;

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
                  style={[styles.card, { backgroundColor: dark ? colors.surface : color }]}
                  onPress={() => this[`card${index}`].jiggle()}
                >
                  <DeckCover id={item.id} titleColor={dark ? color : colors.text} />
                </TouchableOpacity>
                <View style={styles.card} />
              </CardFlip>
            );
          }}
          ListEmptyComponent={
            <View style={styles.msgContainer}>
              <Paragraph>You don't have any decks now.</Paragraph>
              <Paragraph>Create one and it will show up here.</Paragraph>
            </View>
          }
        />
        <FAB
          style={[styles.fab, { backgroundColor: colors.primary }]}
          small={false}
          icon="plus"
          onPress={() => console.log('show modal')}
        />
      </View>
    );
  }
}

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
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4, // android only
  },
  msgContainer: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 0,
    margin: 16,
    ...Platform.select({
      android: {
        right: 0,
      },
      ios: {
        elevation: 0,
      },
    }),
  },
});
