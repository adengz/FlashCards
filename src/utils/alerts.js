import { Alert } from 'react-native';

export const createTwoButtonnAlert = ({
  title,
  msg,
  confirmOnPress,
  confirmText = 'OK',
  cancelOnPress = () => null,
  cancelText = 'Cancel',
}) =>
  Alert.alert(title, msg, [
    {
      text: cancelText,
      onPress: cancelOnPress,
      style: 'cancel',
    },
    {
      text: confirmText,
      onPress: confirmOnPress,
    },
  ]);
