import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, SafeAreaView, StyleSheet, Platform } from 'react-native';
import { useTheme, Menu, IconButton, Text, Divider, Button } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import { updateDeckTitle, deleteDeck, deleteCards } from '../redux/actions/data';
import { CancelBtn, SaveBtn, MoreBtn } from './HeaderButtons';
import CardList from './CardList';
import { createTwoButtonnAlert } from '../utils/alerts';
import { getFormattedStats } from '../utils/helpers';
import Styles from '../styles/stylesheet';
import { white } from '../styles/palette';

export default function Deck() {
  const { id } = useRoute().params;
  const { title: currTitle = '', cards = [] } = useSelector(({ data }) =>
    typeof data.decks[id] === 'undefined' ? {} : data.decks[id]
  );

  const titleBox = useRef(null);
  const [displayedTitle, setDisplayedTitle] = useState(currTitle);
  const [moreMenuVisible, setMoreMenuVisible] = useState(false);
  const [titleEditable, setTitleEditable] = useState(false);
  const [cardsCheckable, setCardsCheckable] = useState(false);
  const [checkedCards, setCheckedCards] = useState(
    Object.fromEntries(cards.map((cardId) => [cardId, false]))
  );
  const { primary } = useTheme().colors;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const toggleMoreMenu = () => {
    setMoreMenuVisible(!moreMenuVisible);
  };

  const cancelOperations = () => {
    setDisplayedTitle(currTitle);
    setTitleEditable(false);
    setCardsCheckable(false);
    setCheckedCards(Object.fromEntries(cards.map((cardId) => [cardId, false])));
  };

  const startEditTitle = () => {
    setTitleEditable(true);
    setTimeout(() => titleBox.current.focus(), 0);
  };

  const saveNewTitle = () => {
    const title = displayedTitle.trim();
    if (title === '') {
      setDisplayedTitle(currTitle);
    } else if (title !== currTitle) {
      // persist storage
      dispatch(updateDeckTitle({ id, title }));
    }
    setTitleEditable(false);
  };

  const toggleCheckbox = (cardId) => {
    setCheckedCards({ ...checkedCards, [cardId]: !checkedCards[cardId] });
  };

  const removeCards = () => {
    const entries = Object.entries(checkedCards);
    const cardIds = entries.filter(([, v]) => v).map(([k]) => k);
    const removeConfirmed = () => {
      setCheckedCards(Object.fromEntries(entries.filter(([, v]) => !v)));
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

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (props) =>
        titleEditable || cardsCheckable ? (
          <CancelBtn onPress={cancelOperations} />
        ) : (
          <HeaderBackButton {...props} />
        ),
      headerRight: () => (
        <View style={Styles.actionBtnRow}>
          {cardsCheckable && Object.values(checkedCards).filter(Boolean).length > 0 && (
            <IconButton color={white} icon="delete" onPress={removeCards} />
          )}
          {titleEditable ? (
            <SaveBtn onPress={saveNewTitle} />
          ) : (
            <Menu
              visible={moreMenuVisible}
              onDismiss={toggleMoreMenu}
              anchor={
                <MoreBtn
                  onPress={() => {
                    cancelOperations();
                    toggleMoreMenu();
                  }}
                />
              }
            >
              <Menu.Item
                title="Rename deck"
                icon="square-edit-outline"
                onPress={() => {
                  toggleMoreMenu();
                  startEditTitle();
                }}
              />
              <Menu.Item
                title="Select cards"
                icon={`checkbox-multiple-marked${OS === 'ios' ? '-circle-outline' : ''}`}
                onPress={() => {
                  toggleMoreMenu();
                  setCardsCheckable(true);
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
          )}
        </View>
      ),
    });
  });

  return (
    <View style={Styles.mainContainer}>
      <View style={styles.deckTitleContainer}>
        <TextInput
          ref={titleBox}
          style={[styles.deckTitleInput, { color: primary }]}
          editable={titleEditable}
          value={displayedTitle}
          selectTextOnFocus
          onChangeText={(value) => setDisplayedTitle(value)}
          onSubmitEditing={saveNewTitle}
        />
        <Text>
          {cardsCheckable && `${Object.values(checkedCards).filter(Boolean).length} / `}
          {getFormattedStats(cards.length)}
        </Text>
      </View>
      <CardList
        id={id}
        navigation={navigation}
        cardsCheckable={cardsCheckable}
        checkedCards={checkedCards}
        toggleCheckbox={toggleCheckbox}
      />
      <SafeAreaView style={Styles.actionBtnRow}>
        <Button
          {...bottomActionBtnProps}
          mode="outlined"
          icon="plus-circle"
          children="Add a Card"
          onPress={() => navigation.navigate('Card', { id })}
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
  uppercase: OS === 'android',
};

const { OS } = Platform;
