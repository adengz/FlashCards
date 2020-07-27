import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useTheme, Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { addDeck } from '../redux/actions/data';
import { getNewDeckMetaData } from '../utils/helpers';
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
        placeholder="Title of new deck"
        placeholderTextColor={gray}
        onChangeText={(value) => setTitle(value)}
        value={title}
        clearButtonMode="while-editing"
      />
      <Button
        style={styles.btn}
        mode="contained"
        icon="plus"
        children="Add"
        compact
        uppercase={false}
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
    alignItems: 'center',
  },
  input: {
    flex: 1,
    margin: 5,
    fontSize: 20,
    height: 40,
  },
  btn: {
    marginRight: 4,
    elevation: 0,
  },
});
