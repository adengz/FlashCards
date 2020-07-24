import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider as StoreProvider } from 'react-redux';
import logger from 'redux-logger';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import reducer from './redux/reducers';
import StackNavigator from './navigators/StackNavigator';

const store = createStore(reducer, applyMiddleware(logger));

export default function App() {
  return (
    <StoreProvider store={store}>
      <SafeAreaProvider>
        <StackNavigator />
      </SafeAreaProvider>
    </StoreProvider>
  );
}
