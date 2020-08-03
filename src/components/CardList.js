import React, { forwardRef, useState, useImperativeHandle } from 'react';
import { Animated, Dimensions, View, StyleSheet } from 'react-native';
import { useTheme, List, Checkbox, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCards } from '../redux/actions/data';
import { createTwoButtonnAlert } from '../utils/alerts';
import Styles from '../styles/stylesheet';
import { darkGray, lightGray, white } from '../styles/palette';

const rowTranslateAnimatedValues = {};

const CardList = forwardRef((props, ref) => {
  const { id, cardsCheckable, checkedCardsCount, setCheckedCardsCount } = props;
  const { cards, decks } = useSelector(({ data }) => data);
  const cardsInDeck =
    typeof decks[id] === 'undefined' ? [] : decks[id].cards.map((cardId) => cards[cardId]);
  const [checkedCards, setCheckedCards] = useState(
    Object.fromEntries(cardsInDeck.map((item) => [item.id, false]))
  );

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    dark,
    colors: { primary, surface },
  } = useTheme();
  const [animationIsRunning, setAnimationIsRunning] = useState(false);

  cardsInDeck.forEach((item) => {
    rowTranslateAnimatedValues[item.id] = new Animated.Value(1);
  });

  const toggleCheckbox = (cardId) => {
    setCheckedCardsCount(checkedCardsCount + (checkedCards[cardId] ? -1 : 1));
    setCheckedCards({ ...checkedCards, [cardId]: !checkedCards[cardId] });
  };

  const removeCards = (cardIds) => {
    setAnimationIsRunning(true);
    Animated.parallel(
      cardIds.map((cardId) =>
        Animated.timing(rowTranslateAnimatedValues[cardId], {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        })
      )
    ).start(() => {
      // persist storage
      dispatch(deleteCards({ id, cardIds }));
      setAnimationIsRunning(false);
    });
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
        removeCards(cardIds);
      };
      if (cardIds.length > 1) {
        createTwoButtonnAlert({
          title: 'Delete Cards',
          msg: `Are you sure you want to delete these ${cardIds.length} cards? You will lose them permanently.`,
          confirmText: 'Confirm',
          confirmOnPress: removeConfirmed,
        });
      } else if (cardIds.length === 1) {
        setTimeout(removeConfirmed, 0);
      }
    },
  }));

  if (typeof decks[id] === 'undefined') {
    return null;
  }

  const onSwipeValueChange = (swipeData) => {
    const { key, value } = swipeData;
    if (value < -Dimensions.get('window').width && !animationIsRunning) {
      removeCards([key]);
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
                  <View style={{ display: cardsCheckable ? 'flex' : 'none' }}>
                    <Checkbox
                      color={primary}
                      status={checkedCards[cardId] ? 'checked' : 'unchecked'}
                      onPress={() => toggleCheckbox(cardId)}
                    />
                  </View>
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
        previewRowKey={cardsInDeck.length > 0 ? cardsInDeck[0].id : null}
        previewOpenValue={-55}
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
