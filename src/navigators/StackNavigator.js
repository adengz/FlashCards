import React from 'react';
import { Platform } from 'react-native';
import { useTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TabNavigator, getHeaderTitle } from './HomeNavigator';
import NewDeck from '../components/NewDeck';
import { white } from '../styles/palette';

const Stack = createStackNavigator();

const screens = {
  Home: {
    name: 'Home',
    component: TabNavigator,
    options: ({ route }) => ({
      headerTitle: getHeaderTitle(route),
    }),
  },
  NewDeck:
    Platform.OS === 'ios'
      ? null
      : {
          name: 'New Deck',
          component: NewDeck,
          options: { title: 'Create a New Deck' },
        },
};

const stackNavProps = {
  initialRouteName: 'Home',
  screenOptions: {
    headerTitleStyle: { color: white },
  },
};

export default function StackNavigator() {
  const theme = useTheme();
  const { dark, colors } = theme;
  stackNavProps.screenOptions.headerStyle = {
    backgroundColor: dark ? colors.surface : colors.primary,
  };
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator {...stackNavProps}>
        {Object.entries(screens)
          .filter(([k, v]) => v !== null)
          .map(([k, v]) => (
            <Stack.Screen key={k} {...v} />
          ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
