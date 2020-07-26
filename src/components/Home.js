import React, { useState, useEffect } from 'react';
import { View, Platform } from 'react-native';
import { IconButton, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import DeckList from './DeckList';
import { NewDeckAndroid } from './NewDeck';
import { Styles } from '../styles/stylesheet';
import { white } from '../styles/palette';

export default function Home() {
  // const [newDeckModalVisible, setNewDeckModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton icon="settings" color={white} onPress={() => navigation.navigate('Settings')} />
      ),
    });
  }, [navigation]);

  // const showNewDeckModal = () => {
  //   setNewDeckModalVisible(true);
  // };

  // const hideNewDeckModal = () => {
  //   setNewDeckModalVisible(false);
  // };

  return (
    <View style={Styles.container}>
      <DeckList />
      {Platform.select({
        android: <NewDeckAndroid />,
        ios: null,
      })}
    </View>
  );
}
