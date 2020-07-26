import React, { useEffect } from 'react';
import { View, Platform } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import DeckList from './DeckList';
import NewDeck from './NewDeck';
import { Styles } from '../styles/stylesheet';
import { white } from '../styles/palette';

export default function Home() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton icon="settings" color={white} onPress={() => navigation.navigate('Settings')} />
      ),
    });
  }, [navigation]);

  return (
    <View style={Styles.container}>
      <DeckList />
      {Platform.OS === 'android' && <NewDeck />}
    </View>
  );
}
