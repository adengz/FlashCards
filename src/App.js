import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { ActivityIndicator, Provider as PaperProvider } from 'react-native-paper';
import { createStore, applyMiddleware } from 'redux';
import { Provider as StoreProvider, useSelector, useDispatch } from 'react-redux';
import logger from 'redux-logger';
import reducer from './redux/reducers';
import StackNavigator from './navigators/StackNavigator';
import { receiveSettings } from './redux/actions/settings';
import { fetchSettingsAsync, initiateSettingsAsync } from './utils/settings';
import { darkTheme, lightTheme } from './styles/themes';

const store = createStore(reducer, applyMiddleware(logger));

export default function App() {
  return (
    <StoreProvider store={store}>
      <Loader />
    </StoreProvider>
  );
}

const Loader = () => {
  const [ready, setReady] = useState(false);
  const currSettings = useSelector(({ settings }) => settings);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchSettingsAsync().then((cachedSettings) => {
      if (cachedSettings === null) {
        initiateSettingsAsync(currSettings);
      } else {
        dispatch(receiveSettings(cachedSettings));
      }
      setReady(true);
    });
  }, []);

  const theme = currSettings.dark ? darkTheme : lightTheme;
  const { statusBar } = theme.colors;

  if (!ready) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" theme={theme} />;
  }

  return (
    <PaperProvider theme={theme}>
      <StatusBar backgroundColor={statusBar} barStyle="light-content" />
      <StackNavigator />
    </PaperProvider>
  );
};
