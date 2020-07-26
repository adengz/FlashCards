import React from 'react';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { createStore, applyMiddleware } from 'redux';
import { Provider as StoreProvider, useSelector } from 'react-redux';
import logger from 'redux-logger';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import reducer from './redux/reducers';
import StackNavigator from './navigators/StackNavigator';
import { darkTheme, lightTheme } from './styles/themes';

const Loader = () => {
  const { dark } = useSelector(({ settings }) => settings);
  const theme = dark ? darkTheme : lightTheme;
  const { statusBar } = theme.colors;

  return (
    <PaperProvider theme={theme}>
      <StatusBar backgroundColor={statusBar} barStyle="light-content" />
      <StackNavigator />
    </PaperProvider>
  );
};

const store = createStore(reducer, applyMiddleware(logger));

export default function App() {
  return (
    <StoreProvider store={store}>
      <SafeAreaProvider>
        <Loader />
      </SafeAreaProvider>
    </StoreProvider>
  );
}
