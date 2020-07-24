import { Platform } from 'react-native';
import { DefaultTheme, DarkTheme } from 'react-native-paper';
import { black } from './palette';

const roundness = Platform.OS === 'ios' ? 8 : 4;

export const lightTheme = {
  ...DefaultTheme,
  roundness,
  colors: {
    ...DefaultTheme.colors,
    primary: '#006A96',
    accent: '#FFCD00',
    statusBar: '#182B49',
  },
};

export const darkTheme = {
  ...DarkTheme,
  roundness,
  colors: {
    ...DarkTheme.colors,
    primary: '#FFCD00',
    accent: '#006A96',
    surface: '#272727',
    statusBar: black,
  },
};
