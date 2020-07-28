import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, TextInput, IconButton } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { addDeck } from '../redux/actions/data';
import { getNewDeckMetaData } from '../utils/helpers';
import Styles from '../styles/stylesheet';

export default function NewDeckAndroid() {
  const [title, setTitle] = useState('');
  const { primary } = useTheme().colors;
  const dispatch = useDispatch();

  const submit = () => {
    const newTitle = title.trim();
    if (newTitle !== '') {
      // persist storage
      dispatch(addDeck({ title: newTitle, ...getNewDeckMetaData() }));
    }
    setTitle('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={Styles.newDeckInput}
        label="Add a new deck"
        placeholder="Title"
        onChangeText={(value) => setTitle(value)}
        value={title}
      />
      <IconButton
        style={styles.btn}
        color={primary}
        size={iconSize}
        icon="plus-box"
        onPress={submit}
        disabled={title === ''}
      />
    </View>
  );
}

const iconSize = 60;

const styles = StyleSheet.create({
  container: {
    ...Styles.newDeckContainer,
    alignItems: 'baseline',
  },
  btn: {
    margin: 0,
    borderRadius: 0,
    height: iconSize,
    width: iconSize,
  },
});
