import React from 'react';
import { View, FlatList } from 'react-native';
import { useTheme, List, Checkbox, Divider } from 'react-native-paper';
import { useSelector } from 'react-redux';
import Styles from '../styles/stylesheet';

export default function CardList({ id }) {
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
        renderItem={({ item }) => (
          <List.Item
            title={item.question}
            left={() => (
              <Checkbox
                color={primary}
                status="checked"
                onPress={() => console.log('checkbox pressed')}
              />
            )}
            onPress={() => console.log('go to card')}
          />
        )}
        ItemSeparatorComponent={() => <Divider />}
        ListHeaderComponent={() => <Divider />}
        ListFooterComponent={() => <Divider />}
      />
    </View>
  );
}
