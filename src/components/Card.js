import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';
import { CancelBtn, SaveBtn, EditBtn } from './HeaderButtons';

export default function Card() {
  const { id, cardId } = useRoute().params;
  const [editable, setEditable] = useState(cardId === null);
  const navigation = useNavigation();

  const cancelEdit = () => {
    setEditable(false);
    console.log('cancel edit');
  };

  const saveEdit = () => {
    setEditable(false);
    console.log('save edit');
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (props) =>
        editable ? <CancelBtn onPress={cancelEdit} /> : <HeaderBackButton {...props} />,
      headerRight: () =>
        editable ? <SaveBtn onPress={saveEdit} /> : <EditBtn onPress={() => setEditable(true)} />,
    });
  });

  return (
    <View>
      <Text>Card</Text>
    </View>
  );
}
