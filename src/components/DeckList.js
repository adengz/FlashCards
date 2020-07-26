import React, { Component } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { IconButton, withTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import CardFlip from 'react-native-card-flip';
import DeckCover from './DeckCover';
import { Styles } from '../styles/stylesheet';
import { white, colorMap } from '../styles/palette';

class DeckList extends Component {
  componentDidMount() {
    const { navigation } = this.props;
    navigation.setOptions({
      headerLeft: () => (
        <IconButton icon="settings" color={white} onPress={() => navigation.navigate('Settings')} />
      ),
    });
  }

  render() {
    const {
      deckList,
      theme: { dark, colors, roundness },
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
                  style={[
                    styles.card,
                    { backgroundColor: dark ? colors.surface : color, borderRadius: roundness },
                  ]}
                  onPress={() => this[`card${index}`].jiggle()}
                >
                  <DeckCover id={item.id} titleColor={dark ? color : colors.text} />
                </TouchableOpacity>
                <View style={styles.card} />
              </CardFlip>
            );
          }}
        />
        <SafeAreaView />
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
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4, // android only
  },
});
