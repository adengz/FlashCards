import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, Platform, Dimensions, StyleSheet } from 'react-native';
import { Paragraph, withTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import CardFlip from 'react-native-card-flip';
import NewDeckFAB from './NewDeckFAB';
import { Styles } from '../styles/stylesheet';
import { lightColorMap, darkColorMap } from '../styles/palette';

class DeckList extends Component {
  render() {
    const {
      decks,
      theme: { dark },
    } = this.props;
    const colorMap = dark ? darkColorMap : lightColorMap;

    return (
      <View style={[Styles.container, { alignItems: 'center' }]}>
        <FlatList
          data={decks}
          renderItem={({ item, index }) => {
            return (
              <CardFlip style={styles.cardContainer} ref={(card) => (this[`card${index}`] = card)}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={[styles.card, { backgroundColor: colorMap[index % colorMap.length] }]}
                  onPress={() => this[`card${index}`].jiggle()}
                >
                  <Paragraph>{item.title}</Paragraph>
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
        {Platform.OS === 'android' && <NewDeckFAB />}
      </View>
    );
  }
}

const mapStateToProps = ({ data }) => {
  const decks = Object.values(data);
  decks.sort((a, b) => a.timestamp - b.timestamp);

  return { decks };
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
});
