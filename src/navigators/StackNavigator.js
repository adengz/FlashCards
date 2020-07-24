import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TabNavigator, getHeaderTitle } from './HomeNavigator';

const Stack = createStackNavigator();

const screens = {
  Home: {
    name: 'Home',
    component: TabNavigator,
    options: ({ route }) => ({
      headerTitle: getHeaderTitle(route),
    }),
  },
};

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {Object.entries(screens).map(([k, v]) => (
          <Stack.Screen key={k} {...v} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
