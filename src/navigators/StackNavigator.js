import React from 'react';
import { useTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DeckList from '../components/DeckList';
import Settings from '../components/Settings';
import { white } from '../styles/palette';

const Stack = createStackNavigator();

const screens = {
  DeckList: {
    name: 'DeckList',
    component: DeckList,
    options: { headerTitle: 'Flash⚡Cards' },
  },
  Settings: {
    name: 'Settings',
    component: Settings,
    options: { title: 'Settings' },
  },
};

const stackNavProps = {
  initialRouteName: 'DeckList',
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
