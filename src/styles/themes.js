import { DefaultTheme, DarkTheme } from 'react-native-paper';
import { black } from './palette';

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#006A96',
    accent: '#FFCD00',
    statusBar: '#182B49',
  },
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#FFCD00',
    accent: '#006A96',
    surface: '#272727',
    statusBar: black,
  },
};
