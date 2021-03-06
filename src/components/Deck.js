import React, { useRef, useState, useEffect } from 'react';
import { View, Platform, ScrollView, TextInput, SafeAreaView, StyleSheet } from 'react-native';
import { useTheme, Menu, IconButton, Divider, Text, Button } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import { updateDeckTitle, deleteDeck } from '../redux/actions/data';
import { updateDeckTitleAsync, deleteDeckAsync } from '../utils/data';
import { CancelBtn, SaveBtn, MoreBtn } from './HeaderButtons';
import CardList from './CardList';
import { createTwoButtonnAlert } from '../utils/alerts';
import { getFormattedStats } from '../utils/helpers';
import Styles from '../styles/stylesheet';
import { white } from '../styles/palette';

export default function Deck() {
  const { id } = useRoute().params;
  const { title: currTitle = '', cards: totalCards = [] } = useSelector(({ data }) =>
    typeof data.decks[id] === 'undefined' ? {} : data.decks[id]
  );

  const titleBox = useRef(null);
  const cardList = useRef();
  const [displayedTitle, setDisplayedTitle] = useState(currTitle);
  const [moreMenuVisible, setMoreMenuVisible] = useState(false);
  const [titleEditable, setTitleEditable] = useState(false);
  const [cardsCheckable, setCardsCheckable] = useState(false);
  const [checkedCardsCount, setCheckedCardsCount] = useState(0);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { primary, text, background } = useTheme().colors;

  const toggleMoreMenu = () => {
    setMoreMenuVisible(!moreMenuVisible);
  };

  const cancelOperations = () => {
    setDisplayedTitle(currTitle);
    setTitleEditable(false);
    setCardsCheckable(false);
    cardList.current.uncheckAllCards();
  };

  const saveNewTitle = () => {
    const title = displayedTitle.trim();
    if (title === '') {
      setDisplayedTitle(currTitle);
    } else if (title !== currTitle) {
      const deck = { id, title };
      updateDeckTitleAsync(deck);
      dispatch(updateDeckTitle(deck));
    }
    setTitleEditable(false);
  };

  const removeDeck = () => {
    createTwoButtonnAlert({
      title: `Delete ${currTitle}`,
      msg: `Are you sure you want to delete ${currTitle}? You will lose all its cards permanently.`,
      confirmText: 'Confirm',
      confirmOnPress: () => {
        navigation.navigate('Home');
        deleteDeckAsync(id);
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
          {cardsCheckable && checkedCardsCount > 0 && (
            <IconButton
              color={white}
              icon="delete"
              onPress={() => cardList.current.removeCheckedCards()}
            />
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
                  setTitleEditable(true);
                  setTimeout(() => titleBox.current.focus(), 0);
                }}
              />
              <Menu.Item
                title="Select cards"
                icon={`checkbox-multiple-marked${Platform.OS === 'ios' ? '-circle-outline' : ''}`}
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
        <ScrollView style={styles.deckTitleScroller} horizontal>
          <TextInput
            ref={titleBox}
            style={[styles.deckTitleInput, { color: primary }]}
            editable={titleEditable}
            value={displayedTitle}
            selectTextOnFocus
            onChangeText={(value) => setDisplayedTitle(value)}
            onSubmitEditing={saveNewTitle}
          />
        </ScrollView>
        <Text style={[styles.checkedCount, { color: cardsCheckable ? text : background }]}>
          {`${checkedCardsCount}/`}
        </Text>
        <Text>{getFormattedStats(totalCards.length)}</Text>
      </View>
      <CardList
        ref={cardList}
        id={id}
        cardsCheckable={cardsCheckable}
        checkedCardsCount={checkedCardsCount}
        setCheckedCardsCount={setCheckedCardsCount}
      />
      <SafeAreaView style={Styles.actionBtnRow}>
        <Button
          {...bottomActionBtnProps}
          mode="outlined"
          icon="plus-circle"
          children="Add a Card"
          onPress={() => {
            cancelOperations();
            navigation.navigate('Card', { id });
          }}
        />
        <Button
          {...bottomActionBtnProps}
          mode="contained"
          icon="cards"
          children="Start Quiz"
          onPress={() => {
            cancelOperations();
            navigation.navigate('Quiz', { id });
          }}
          disabled={totalCards.length === 0}
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
  deckTitleScroller: {
    flex: 1,
  },
  deckTitleInput: {
    ...Styles.deckTitleInput,
    fontSize: 40,
    paddingHorizontal: 0,
    marginHorizontal: 0,
  },
  checkedCount: {
    width: 40,
    textAlign: 'right',
  },
});

const bottomActionBtnProps = {
  style: [Styles.bottomActionBtn, { flex: 1 }],
  labelStyle: { fontSize: 18 },
  uppercase: Platform.OS === 'android',
};
