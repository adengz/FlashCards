import React, { useState } from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { useTheme, TextInput, Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { addDeck } from '../redux/actions/data';
import { generateUID } from '../utils/helpers';
import { Styles } from '../styles/stylesheet';

export default function NewDeck() {
  const [title, setTitle] = useState('');
  const { dark } = useTheme();
  const dispatch = useDispatch();

  const submit = () => {
    const deckId = generateUID('deck', 9);
    // persist storage
    dispatch(addDeck({ deckId, title }));
    setTitle('');
    // redirect
  };

  return (
    <View style={[Styles.container, { justifyContent: 'center' }]}>
      <TextInput
        style={styles.textInput}
        mode="outlined"
        label="Title of new deck"
        placeholder="Type something"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <Button
        style={styles.btn}
        labelStyle={styles.btnLabel}
        mode="contained"
        dark={!dark}
        disabled={title === ''}
        children="Submit"
        uppercase={Platform.OS === 'android'}
        onPress={submit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 80,
    fontSize: 32,
    margin: 20,
  },
  btn: {
    width: '50%',
    alignSelf: 'center',
    margin: 20,
  },
  btnLabel: {
    fontSize: 24,
  },
});
