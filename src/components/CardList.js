import React, { forwardRef, useState, useImperativeHandle } from 'react';
import { Animated, Dimensions, View, StyleSheet } from 'react-native';
import { useTheme, List, Checkbox, Divider } from 'react-native-paper';
import { SwipeListView } from 'react-native-swipe-list-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCards } from '../redux/actions/data';
import { createTwoButtonnAlert } from '../utils/alerts';
import Styles from '../styles/stylesheet';
import { darkGray, lightGray, white } from '../styles/palette';

const CardList = forwardRef((props, ref) => {
  const { id, navigation, cardsCheckable, checkedCardsCount, setCheckedCardsCount } = props;
  const { cards, decks } = useSelector(({ data }) => data);
  const cardsInDeck =
    typeof decks[id] === 'undefined' ? [] : decks[id].cards.map((cardId) => cards[cardId]);
  const [checkedCards, setCheckedCards] = useState(
    Object.fromEntries(cardsInDeck.map((item) => [item.id, false]))
  );

  const dispatch = useDispatch();
  const {
    dark,
    colors: { primary, surface },
  } = useTheme();

  const toggleCheckbox = (cardId) => {
    setCheckedCardsCount(checkedCardsCount + (checkedCards[cardId] ? -1 : 1));
    setCheckedCards({ ...checkedCards, [cardId]: !checkedCards[cardId] });
  };

  const removeCardsFromStore = (cardIds) => {
    // persist storage
    dispatch(deleteCards({ id, cardIds }));
  };

  useImperativeHandle(ref, () => ({
    uncheckAllCards() {
      setCheckedCards(Object.fromEntries(Object.keys(checkedCards).map((k) => [k, false])));
      setCheckedCardsCount(0);
    },
    removeCheckedCards() {
      const entries = Object.entries(checkedCards);
      const cardIds = entries.filter(([, v]) => v).map(([k]) => k);
      const removeConfirmed = () => {
        setCheckedCards(Object.fromEntries(entries.filter(([, v]) => !v)));
        setCheckedCardsCount(0);
        removeCardsFromStore(cardIds);
      };
      if (cardIds.length > 1) {
        createTwoButtonnAlert({
          title: 'Delete Cards',
          msg: `Are you sure you want to delete these ${cardIds.length} cards? You will lose them permanently.`,
          confirmText: 'Confirm',
          confirmOnPress: removeConfirmed,
        });
      } else if (cardIds.length === 1) {
        removeConfirmed();
      }
    },
  }));

  if (typeof decks[id] === 'undefined') {
    return null;
  }

  const rowTranslateAnimatedValues = {};
  cardsInDeck.forEach((item) => {
    rowTranslateAnimatedValues[item.id] = new Animated.Value(1);
  });

  const onSwipeValueChange = (swipeData) => {
    const { key, value } = swipeData;
    if (value < -Dimensions.get('window').width) {
      // this.animationIsRunning = true;
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        removeCardsFromStore([key]);
        // this.animationIsRunning = false;
      });
    }
  };

  return (
    <View style={Styles.mainContainer}>
      <SwipeListView
        data={cardsInDeck}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
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
                disabled={cardsCheckable}
              />
            </Animated.View>
          );
        }}
        renderHiddenItem={() => (
          <View style={styles.hiddenItem}>
            <View style={styles.hiddenIcon}>
              <MaterialCommunityIcons name="delete" color={white} size={24} />
            </View>
          </View>
        )}
        ListHeaderComponent={Divider}
        ItemSeparatorComponent={Divider}
        ListFooterComponent={Divider}
        disableRightSwipe
        disableLeftSwipe={cardsCheckable}
        rightOpenValue={-Dimensions.get('window').width}
        onSwipeValueChange={onSwipeValueChange}
        useNativeDriver={false}
      />
    </View>
  );
});

export default CardList;

const styles = StyleSheet.create({
  shownItem: {
    flex: 1,
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
