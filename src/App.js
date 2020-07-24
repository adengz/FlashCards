import React from 'react';
import { StatusBar } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider as StoreProvider } from 'react-redux';
import logger from 'redux-logger';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import reducer from './redux/reducers';
import StackNavigator from './navigators/StackNavigator';
import { lightTheme, darkTheme } from './styles/themes';

const store = createStore(reducer, applyMiddleware(logger));

export default function App() {
  const theme = lightTheme;
  const { statusBar } = theme.colors;
  return (
    <StoreProvider store={store}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <StatusBar backgroundColor={statusBar} barStyle="light-content" />
          <StackNavigator />
        </PaperProvider>
      </SafeAreaProvider>
    </StoreProvider>
  );
}
