import React, { useState } from 'react';
import { SafeAreaView, TextInput, StyleSheet } from 'react-native';
import { useTheme, Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { addDeck } from '../redux/actions/data';
import { getNewDeckMetaData } from '../utils/helpers';
import Styles from '../styles/stylesheet';
import { gray } from '../styles/palette';

export default function NewDeckIOS() {
  const [typedTitle, setTypedTitle] = useState('');
  const dispatch = useDispatch();
  const {
    roundness,
    colors: { surface, text },
  } = useTheme();

  const submit = () => {
    const title = typedTitle.trim();
    if (title !== '') {
      // persist storage
      dispatch(addDeck({ title, ...getNewDeckMetaData() }));
    }
    setTypedTitle('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={[styles.input, { backgroundColor: surface, color: text, borderRadius: roundness }]}
        placeholderTextColor={gray}
        clearButtonMode="while-editing"
        placeholder="Title of new deck"
        onChangeText={(value) => setTypedTitle(value)}
        value={typedTitle}
      />
      <Button
        style={styles.btn}
        mode="contained"
        compact
        uppercase={false}
        icon="plus"
        children="Add"
        onPress={submit}
        disabled={typedTitle === ''}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...Styles.deckTitleContainer,
    alignItems: 'center',
  },
  input: {
    ...Styles.deckTitleInput,
    height: 40,
  },
  btn: {
    marginRight: 4,
    elevation: 0,
  },
});
