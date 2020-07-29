import React from 'react';
import { Platform, Button, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Button as PaperButton, IconButton } from 'react-native-paper';
import { white } from '../styles/palette';

export const EditBtn = ({ onPress }) =>
  Platform.select({
    ios: <Button color={defaultColor} title="Edit" onPress={onPress} />,
    android: <PaperButton color={defaultColor} children="Edit" onPress={onPress} />,
  });

export const SaveBtn = ({ onPress }) =>
  Platform.select({
    ios: (
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.iosDone}>Done</Text>
      </TouchableOpacity>
    ),
    android: <PaperButton color={defaultColor} children="Save" onPress={onPress} />,
  });

export const CancelBtn = ({ onPress }) =>
  Platform.select({
    ios: <Button color={defaultColor} title="Cancel" onPress={onPress} />,
    android: <IconButton color={defaultColor} icon="close" onPress={onPress} />,
  });

export const MoreBtn = ({ onPress }) => (
  <IconButton
    color={defaultColor}
    icon={`dots-${Platform.OS === 'ios' ? 'horizontal' : 'vertical'}`}
    onPress={onPress}
  />
);

const defaultColor = white;

const styles = StyleSheet.create({
  iosDone: {
    color: defaultColor,
    fontWeight: 'bold',
    margin: 8,
    fontSize: 18,
  },
});
