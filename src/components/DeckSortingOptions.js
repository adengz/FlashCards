import React from 'react';
import { useTheme, Portal, Modal, RadioButton } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { updateDeckSorting } from '../redux/actions/settings';

export default function DeckSortingOptions({ visible, hide }) {
  const {
    roundness,
    colors: { surface, primary },
  } = useTheme();
  const { by } = useSelector(({ settings }) => settings.sortDecks);
  const dispatch = useDispatch();

  const select = (value) => {
    // persist storage
    dispatch(updateDeckSorting(value));
    hide();
  };

  return (
    <Portal>
      <Modal
        contentContainerStyle={{ backgroundColor: surface, margin: 10, borderRadius: roundness }}
        visible={visible}
        onDismiss={hide}
      >
        <RadioButton.Group value={by} onValueChange={(value) => select(value)}>
          <RadioButton.Item label="Creation Time" color={primary} value="timestamp" />
          <RadioButton.Item label="Title Alphabet" color={primary} value="title" />
          <RadioButton.Item label="Total Cards" color={primary} value="cards" />
        </RadioButton.Group>
      </Modal>
    </Portal>
  );
}
