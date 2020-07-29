import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, SafeAreaView, StyleSheet, Platform } from 'react-native';
import { useTheme, Menu, IconButton, Text, Divider, Button } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { updateDeckTitle, deleteDeck, deleteCards } from '../redux/actions/data';
import { MoreBtn } from './HeaderButtons';
import CardList from './CardList';
import { createTwoButtonnAlert } from '../utils/alerts';
import Styles from '../styles/stylesheet';
import { white } from '../styles/palette';

export default function Deck() {
  const { id } = useRoute().params;
  const deck = useSelector(({ data }) => data.decks[id]);
  let currTitle;
  let cards;
  if (typeof deck === 'undefined') {
    currTitle = '';
    cards = [];
  } else {
    ({ title: currTitle, cards } = deck);
  }

  const [displayedTitle, setDisplayedTitle] = useState(currTitle);
  const titleBox = useRef(null);
  const [moreMenuVisible, setMoreMenuVisible] = useState(false);
  const [selectedCards, setSelectedCards] = useState(
    Object.fromEntries(cards.map((cardId) => [cardId, false]))
  );
  const { text } = useTheme().colors;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const toggleMoreMenu = () => {
    setMoreMenuVisible(!moreMenuVisible);
  };

  const updateTitle = () => {
    const title = displayedTitle.trim();
    if (title === '') {
      setDisplayedTitle(currTitle);
    } else if (title !== currTitle) {
      // persist storage
      dispatch(updateDeckTitle({ id, title }));
    }
  };

  const removeDeck = () => {
    createTwoButtonnAlert({
      title: `Delete ${currTitle}`,
      msg: `Are you sure you want to delete ${currTitle}? You will lose all its cards permanently.`,
      confirmText: 'Confirm',
      confirmOnPress: () => {
        navigation.navigate('Home');
        // persist storage
        dispatch(deleteDeck(id));
      },
    });
  };

  const toggleCheckbox = (cardId) => {
    setSelectedCards({ ...selectedCards, [cardId]: !selectedCards[cardId] });
  };

  const removeCards = () => {
    const entries = Object.entries(selectedCards);
    const cardIds = entries.filter(([, v]) => v).map(([k]) => k);
    const removeConfirmed = () => {
      setSelectedCards(Object.fromEntries(entries.filter(([, v]) => !v)));
      // persist storage
      dispatch(deleteCards({ id, cardIds }));
    };
    if (cardIds.length > 1) {
      createTwoButtonnAlert({
        title: 'Delete Cards',
        msg: `Are you sure you want to delete these ${cardIds.length} cards? You will lose them permanently.`,
        confirmText: 'Confirm',
        confirmOnPress: removeConfirmed,
      });
    } else {
      removeConfirmed();
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={Styles.actionBtnRow}>
          {Object.values(selectedCards).filter(Boolean).length > 0 && (
            <IconButton color={white} icon="delete" onPress={removeCards} />
          )}
          <Menu
            visible={moreMenuVisible}
            onDismiss={toggleMoreMenu}
            anchor={<MoreBtn onPress={toggleMoreMenu} />}
          >
            <Menu.Item
              title="Rename deck"
              icon="square-edit-outline"
              onPress={() => {
                toggleMoreMenu();
                titleBox.current.focus();
              }}
            />
            <Divider />
            <Menu.Item
              title="DELETE DECK"
              icon="delete"
              onPress={() => {
                toggleMoreMenu();
                removeDeck();
              }}
            />
          </Menu>
        </View>
      ),
    });
  });

  return (
    <View style={Styles.mainContainer}>
      <View style={styles.deckTitleContainer}>
        <TextInput
          ref={titleBox}
          style={[styles.deckTitleInput, { color: text }]}
          value={displayedTitle}
          selectTextOnFocus
          onChangeText={(value) => setDisplayedTitle(value)}
          onEndEditing={updateTitle}
        />
        <Text>
          {Object.values(selectedCards).filter(Boolean).length} / {cards.length}
        </Text>
      </View>
      <CardList
        id={id}
        navigation={navigation}
        selectedCards={selectedCards}
        toggleCheckbox={toggleCheckbox}
      />
      <SafeAreaView style={Styles.actionBtnRow}>
        <Button
          {...bottomActionBtnProps}
          mode="outlined"
          icon="plus-circle"
          children="Add a Card"
          onPress={() => console.log('add a card')}
        />
        <Button
          {...bottomActionBtnProps}
          mode="contained"
          icon="cards"
          children="Start Quiz"
          onPress={() => console.log('start quiz')}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  deckTitleContainer: {
    ...Styles.deckTitleContainer,
    alignItems: 'flex-end',
    paddingTop: 10,
  },
  deckTitleInput: {
    ...Styles.deckTitleInput,
    fontSize: 40,
  },
  bottomActionBtn: {
    flex: 1,
    margin: 10,
    ...Platform.select({
      ios: {
        elevation: 0,
      },
    }),
  },
  bottomActionBtnLabel: {
    fontSize: 18,
  },
});

const bottomActionBtnProps = {
  style: styles.bottomActionBtn,
  labelStyle: styles.bottomActionBtnLabel,
  uppercase: Platform.OS === 'android',
};
