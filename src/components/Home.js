import React, { useState, useEffect } from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import DeckList from './DeckList';
import NewDeck from './NewDeck';
import { Styles } from '../styles/stylesheet';
import { white } from '../styles/palette';

export default function Home() {
  const [newDeckModalVisible, setNewDeckModalVisible] = useState(false);
  const navigation = useNavigation();

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
        </View>
      ),
    });
  }, [navigation]);

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
