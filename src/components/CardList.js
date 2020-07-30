import React from 'react';
import { Animated, Dimensions, View, StyleSheet } from 'react-native';
import { useTheme, List, Checkbox } from 'react-native-paper';
import { SwipeListView } from 'react-native-swipe-list-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCards } from '../redux/actions/data';
import Styles from '../styles/stylesheet';
import { darkGray, lightGray, white, gray } from '../styles/palette';

export default function CardList({ id, navigation, cardsCheckable, checkedCards, toggleCheckbox }) {
  const { cards, decks } = useSelector(({ data }) => data);
  const dispatch = useDispatch();
  const {
    dark,
    colors: { primary, surface },
  } = useTheme();

  if (typeof decks[id] === 'undefined') {
    return null;
  }

  const cardsInDeck = decks[id].cards.map((cardId) => cards[cardId]);

  const rowTranslateAnimatedValues = {};
  cardsInDeck.forEach((item) => {
    rowTranslateAnimatedValues[item.id] = new Animated.Value(1);
  });

  const onSwipeValueChange = (swipeData) => {
    const { key, value } = swipeData;
    if (value < -Dimensions.get('window').width && !this.animationIsRunning) {
      this.animationIsRunning = true;
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        // persist storage
        dispatch(deleteCards({ id, cardIds: [key] }));
        this.animationIsRunning = false;
      });
    }
  };

  const renderItem = ({ item }) => {
    const { id: cardId, question } = item;
    return (
      <Animated.View
        style={{
          height: rowTranslateAnimatedValues[cardId].interpolate({
            inputRange: [0, 1],
            outputRange: [0, 50],
          }),
        }}
      >
        <List.Item
          style={[styles.shownItem, { backgroundColor: surface }]}
          underlayColor={dark ? darkGray : lightGray}
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
      </Animated.View>
    );
  };

  const renderHiddenItem = () => (
    <View style={styles.hiddenItem}>
      <View style={styles.hiddenIcon}>
        <MaterialCommunityIcons name="delete" color={white} size={24} />
      </View>
    </View>
  );

  return (
    <View style={Styles.mainContainer}>
      <SwipeListView
        data={cardsInDeck}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        disableRightSwipe
        disableLeftSwipe={cardsCheckable}
        rightOpenValue={-Dimensions.get('window').width}
        onSwipeValueChange={onSwipeValueChange}
        useNativeDriver={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  shownItem: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: gray,
  },
  hiddenItem: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  hiddenIcon: {
    paddingHorizontal: 15,
  },
});
