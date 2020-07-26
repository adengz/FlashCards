import React, { useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, TextInput, IconButton } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { addDeck } from '../redux/actions/data';
import { generateUID } from '../utils/helpers';
import { gray } from '../styles/palette';

const iconSize = 60;

export default function NewDeck({ postSubmit = () => {} }) {
  const [title, setTitle] = useState('');
  const inputTitleRef = useRef(null);
  const {
    colors: { primary },
  } = useTheme();
  const dispatch = useDispatch();

  const clear = () => {
    setTitle('');
  };

  const submit = () => {
    const deckId = generateUID('deck', 9);
    const timestamp = Date.now();
    // persist storage
    dispatch(addDeck({ deckId, title, timestamp }));
    clear();
    postSubmit();
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputTitleRef}
        style={styles.input}
        mode="outlined"
        label="Add a new deck"
        placeholder="Title"
        onChangeText={(text) => setTitle(text)}
        value={title}
        right={
          title !== '' &&
          inputTitleRef.current.isFocused() && (
            <TextInput.Icon name="close-circle" color={gray} onPress={clear} />
          )
        }
      />
      <IconButton
        style={styles.btn}
        icon="plus-box"
        color={primary}
        size={iconSize}
        onPress={submit}
        disabled={title === ''}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'baseline',
  },
  input: {
    flex: 1,
    margin: 5,
    fontSize: 20,
  },
  btn: {
    margin: 0,
    borderRadius: 0,
    height: iconSize,
    width: iconSize,
  },
});
