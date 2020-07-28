import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, SafeAreaView, StyleSheet, Platform } from 'react-native';
import { useTheme, Menu, IconButton, Text, Divider, Button } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { updateDeckTitle, deleteDeck } from '../redux/actions/data';
import CardList from './CardList';
import { createTwoButtonnAlert } from '../utils/alerts';
import Styles from '../styles/stylesheet';
import { white } from '../styles/palette';

export default function Deck() {
  const { id } = useRoute().params;
  const deck = useSelector(({ data }) => data.decks[id]);
  let title;
  let cards;
  if (typeof deck === 'undefined') {
    title = '';
    cards = [];
  } else {
    ({ title, cards } = deck);
  }

  const [displayTitle, setDisplayTitle] = useState(title);
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
    const newTitle = displayTitle.trim();
    if (newTitle === '') {
      setDisplayTitle(title);
    } else if (newTitle !== title) {
      // persist storage
      dispatch(updateDeckTitle({ id, newTitle }));
    }
  };

  const remove = () => {
    createTwoButtonnAlert({
      title: `Delete ${title}`,
      msg: `Are you sure you want to delete ${title}? You will lose all its cards permanently.`,
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

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={Styles.actionBtnRow}>
          {Object.values(selectedCards).filter(Boolean).length > 0 && (
            <IconButton
              color={iconColor}
              icon="delete"
              onPress={() => console.log('batch delete cards')}
            />
          )}
          <Menu
            visible={moreMenuVisible}
            onDismiss={toggleMoreMenu}
            anchor={
              <IconButton
                color={iconColor}
                icon={`dots-${OS === 'ios' ? 'horizontal' : 'vertical'}`}
                onPress={toggleMoreMenu}
              />
            }
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
                remove();
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
          value={displayTitle}
          selectTextOnFocus
          onChangeText={(value) => setDisplayTitle(value)}
          onEndEditing={updateTitle}
        />
        <Text>
          {Object.values(selectedCards).filter(Boolean).length} / {cards.length}
        </Text>
      </View>
      <CardList id={id} selectedCards={selectedCards} toggleCheckbox={toggleCheckbox} />
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

const iconColor = white;
const { OS } = Platform;

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
  uppercase: OS === 'android',
};
