import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { IconButton, Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import { reverseDeckOrder } from '../redux/actions/settings';
import { MoreBtn } from './HeaderButtons';
import DeckList from './DeckList';
import NewDeck from './NewDeck';
import DeckSortingOptions from './DeckSortingOptions';
import Styles from '../styles/stylesheet';
import { white } from '../styles/palette';

export default function Home() {
  const { descending } = useSelector(({ settings }) => settings.sortDecks);

  const [moreMenuVisible, setMoreMenuVisible] = useState(false);
  const [sortingOptionsVisible, setSortingOptionsVisible] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();

  const toggleOrder = () => {
    // persist storage
    dispatch(reverseDeckOrder());
  };

  const toggleMoreMenu = () => {
    setMoreMenuVisible(!moreMenuVisible);
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton color={white} icon="settings" onPress={() => navigation.navigate('Settings')} />
      ),
      headerRight: () => (
        <View style={Styles.actionBtnRow}>
          <IconButton
            color={white}
            icon={`arrow-${descending ? 'down' : 'up'}-thick`}
            onPress={toggleOrder}
          />
          <Menu
            visible={moreMenuVisible}
            onDismiss={toggleMoreMenu}
            anchor={<MoreBtn onPress={toggleMoreMenu} />}
          >
            <Menu.Item
              title="Sort decks by..."
              icon="sort"
              onPress={() => {
                toggleMoreMenu();
                setSortingOptionsVisible(true);
              }}
            />
          </Menu>
        </View>
      ),
    });
  });

  return (
    <KeyboardAvoidingView
      style={Styles.mainContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={headerHeight}
    >
      <DeckList />
      <NewDeck />
      <DeckSortingOptions
        visible={sortingOptionsVisible}
        hide={() => setSortingOptionsVisible(false)}
      />
    </KeyboardAvoidingView>
  );
}
