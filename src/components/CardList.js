import React from 'react';
import { View, FlatList } from 'react-native';
import { useTheme, List, Checkbox, Divider } from 'react-native-paper';
import { useSelector } from 'react-redux';
import Styles from '../styles/stylesheet';

export default function CardList({ id, navigation, cardsCheckable, checkedCards, toggleCheckbox }) {
  const { cards, decks } = useSelector(({ data }) => data);
  const { primary } = useTheme().colors;

  if (typeof decks[id] === 'undefined') {
    return null;
  }

  const cardsInDeck = decks[id].cards.map((cardId) => cards[cardId]);

  return (
    <View style={Styles.mainContainer}>
      <FlatList
        data={cardsInDeck}
        renderItem={({ item }) => {
          const { id: cardId, question } = item;
          return (
            <List.Item
              title={question}
              left={() => (
                <Checkbox
                  color={primary}
                  disabled={!cardsCheckable}
                  status={checkedCards[cardId] ? 'checked' : 'unchecked'}
                  onPress={() => toggleCheckbox(cardId)}
                />
              )}
              onPress={() => navigation.navigate('Card', { id, cardId })}
            />
          );
        }}
        ItemSeparatorComponent={() => <Divider />}
        ListHeaderComponent={() => <Divider />}
        ListFooterComponent={() => <Divider />}
      />
    </View>
  );
}
