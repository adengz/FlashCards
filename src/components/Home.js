import React, { useState, useEffect } from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { IconButton, Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import DeckList from './DeckList';
import NewDeck from './NewDeck';
import { reverseDeckOrder } from '../redux/actions/settings';
import { Styles } from '../styles/stylesheet';
import { white } from '../styles/palette';

export default function Home() {
  const [newDeckModalVisible, setNewDeckModalVisible] = useState(false);
  const [moreMenuVisible, setMoreMenuVisible] = useState(false);
  const navigation = useNavigation();
  const { by, descending } = useSelector(({ settings }) => settings.sortDecks);
  const dispatch = useDispatch();

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
        <IconButton
          icon="settings"
          color={iconColor}
          onPress={() => navigation.navigate('Settings')}
        />
      ),
      headerRight: () => (
        <View style={styles.actionBtnRow}>
          {Platform.OS === 'ios' && (
            <IconButton
              style={styles.actionBtn}
              icon="plus"
              color={iconColor}
              onPress={() => setNewDeckModalVisible(true)}
            />
          )}
          <IconButton
            style={styles.actionBtn}
            icon={`arrow-${descending ? 'down' : 'up'}-thick`}
            color={iconColor}
            onPress={toggleOrder}
          />
          <Menu
            visible={moreMenuVisible}
            onDismiss={toggleMoreMenu}
            anchor={
              <IconButton
                style={styles.actionBtn}
                icon={`dots-${Platform.OS === 'ios' ? 'horizontal' : 'vertical'}`}
                color={iconColor}
                onPress={toggleMoreMenu}
              />
            }
          >
            <Menu.Item
              title="Sort decks by..."
              icon="sort"
              onPress={() => console.log('open sorting options')}
            />
          </Menu>
        </View>
      ),
    });
  });

  return (
    <View style={Styles.container}>
      <DeckList />
      <NewDeck visible={newDeckModalVisible} hide={() => setNewDeckModalVisible(false)} />
    </View>
  );
}

const iconColor = white;

const styles = StyleSheet.create({
  actionBtnRow: {
    flexDirection: 'row',
  },
  actionBtn: {
    margin: 0,
  },
});
