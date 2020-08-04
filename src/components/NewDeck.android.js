import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, TextInput, IconButton } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { addDeck } from '../redux/actions/data';
import { getNewDeckMetaData } from '../utils/helpers';
import Styles from '../styles/stylesheet';

export default function NewDeckAndroid() {
  const [typedTitle, setTypedTitle] = useState('');

  const dispatch = useDispatch();
  const { primary } = useTheme().colors;

  const submit = () => {
    const title = typedTitle.trim();
    if (title !== '') {
      // persist storage
      dispatch(addDeck({ title, ...getNewDeckMetaData() }));
    }
    setTypedTitle('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={Styles.deckTitleInput}
        label="Add a new deck"
        placeholder="Title"
        onChangeText={(value) => setTypedTitle(value)}
        value={typedTitle}
      />
      <IconButton
        style={styles.btn}
        color={primary}
        size={iconSize}
        icon="plus-box"
        onPress={submit}
        disabled={typedTitle === ''}
      />
    </View>
  );
}

const iconSize = 60;

const styles = StyleSheet.create({
  container: {
    ...Styles.deckTitleContainer,
    alignItems: 'baseline',
  },
  btn: {
    margin: 0,
    borderRadius: 0,
    height: iconSize,
    width: iconSize,
  },
});
