import React from 'react';
import { useTheme, Portal, Modal, RadioButton } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { updateDeckSorting } from '../redux/actions/settings';
import { updateDeckSortingAsync } from '../utils/settings';

export default function DeckSortingOptions({ visible, hide }) {
  const { by } = useSelector(({ settings }) => settings.sortDecks);

  const dispatch = useDispatch();
  const {
    roundness,
    colors: { surface, primary },
  } = useTheme();

  const select = (value) => {
    updateDeckSortingAsync(value);
    dispatch(updateDeckSorting(value));
    hide();
  };

  return (
    <Portal>
      <Modal
        contentContainerStyle={{ backgroundColor: surface, borderRadius: roundness, margin: 10 }}
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
