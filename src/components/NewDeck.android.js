import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, TextInput, IconButton } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { addDeck } from '../redux/actions/data';
import { getNewDeckMetaData } from '../utils/helpers';

export default function NewDeckAndroid() {
  const [title, setTitle] = useState('');
  const {
    colors: { primary },
  } = useTheme();
  const dispatch = useDispatch();

  const submit = () => {
    const newDeckData = {
      title,
      ...getNewDeckMetaData(),
    };
    // persist storage
    dispatch(addDeck(newDeckData));
    setTitle('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        label="Add a new deck"
        placeholder="Title"
        onChangeText={(text) => setTitle(text)}
        value={title}
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

const iconSize = 60;

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
