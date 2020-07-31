import React from 'react';
import { useTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../components/Home';
import Settings from '../components/Settings';
import Deck from '../components/Deck';
import Card from '../components/Card';
import Quiz from '../components/Quiz';
import { white } from '../styles/palette';

const Stack = createStackNavigator();

const screens = {
  Home: {
    name: 'Home',
    component: Home,
    options: { headerTitle: 'Flash⚡Cards' },
  },
  Settings: {
    name: 'Settings',
    component: Settings,
    options: { title: 'Settings' },
  },
  Deck: {
    name: 'Deck',
    component: Deck,
    options: { headerTitle: null },
  },
  Card: {
    name: 'Card',
    component: Card,
    options: { headerTitle: null },
  },
  Quiz: {
    name: 'Quiz',
    component: Quiz,
    options: { title: 'Quiz' },
  },
};

const stackNavProps = {
  initialRouteName: 'Home',
  screenOptions: {
    headerTintColor: white,
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
        {Object.entries(screens).map(([k, v]) => (
          <Stack.Screen key={k} {...v} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
