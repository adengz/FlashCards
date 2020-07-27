import React, { useState, useEffect } from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import DeckList from './DeckList';
import NewDeck from './NewDeck';
import { reverseDeckOrder } from '../redux/actions/settings';
import { Styles } from '../styles/stylesheet';
import { white } from '../styles/palette';

export default function Home() {
  const [newDeckModalVisible, setNewDeckModalVisible] = useState(false);
  const navigation = useNavigation();
  const { by, descending } = useSelector(({ settings }) => settings.sortDecks);
  const dispatch = useDispatch();

  const toggleOrder = () => {
    // persist storage
    dispatch(reverseDeckOrder());
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
              icon="plus"
              color={iconColor}
              onPress={() => setNewDeckModalVisible(true)}
            />
          )}
          <IconButton
            icon={`arrow-${descending ? 'down' : 'up'}-thick`}
            color={iconColor}
            onPress={toggleOrder}
          />
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
});
