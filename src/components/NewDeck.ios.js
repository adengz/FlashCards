import React, { useState } from 'react';
import Dialog from 'react-native-dialog';
import { useDispatch } from 'react-redux';
import { addDeck } from '../redux/actions/data';
import { getNewDeckMetaData } from '../utils/helpers';

export default function NewDeckIOS({ visible, hide }) {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const exit = () => {
    setTitle('');
    hide();
  };

  const submit = () => {
    const newDeckData = {
      title,
      ...getNewDeckMetaData(),
    };
    // persist storage
    dispatch(addDeck(newDeckData));
    exit();
  };

  return (
    <Dialog.Container visible={visible} onBackdropPress={exit}>
      <Dialog.Title>Add a new deck</Dialog.Title>
      <Dialog.Description>Enter the title of your new deck</Dialog.Description>
      <Dialog.Input value={title} onChangeText={(text) => setTitle(text)} placeholder="Title" />
      <Dialog.Button label="Cancel" onPress={exit} />
      <Dialog.Button label="Add" onPress={submit} disabled={title === ''} />
    </Dialog.Container>
  );
}
