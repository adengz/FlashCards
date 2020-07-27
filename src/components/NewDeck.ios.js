import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useTheme, Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { addDeck } from '../redux/actions/data';
import { getNewDeckMetaData } from '../utils/helpers';
import { Styles } from '../styles/stylesheet';
import { gray } from '../styles/palette';

export default function NewDeckIOS() {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const {
    roundness,
    colors: { surface, text },
  } = useTheme();

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
        style={[styles.input, { backgroundColor: surface, color: text, borderRadius: roundness }]}
        placeholderTextColor={gray}
        clearButtonMode="while-editing"
        placeholder="Title of new deck"
        onChangeText={(value) => setTitle(value)}
        value={title}
      />
      <Button
        style={styles.btn}
        mode="contained"
        compact
        uppercase={false}
        icon="plus"
        children="Add"
        onPress={submit}
        disabled={title === ''}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...Styles.newDeckContainer,
    alignItems: 'center',
  },
  input: {
    ...Styles.newDeckInput,
    height: 40,
  },
  btn: {
    marginRight: 4,
    elevation: 0,
  },
});
