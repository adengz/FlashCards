import React from 'react';
import { Platform } from 'react-native';
import { useTheme } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import DeckList from '../components/DeckList';
import Settings from '../components/Settings';
import NewDeck from '../components/NewDeck';
import { white } from '../styles/palette';

const { OS } = Platform;
const Tab = OS === 'ios' ? createBottomTabNavigator() : createMaterialBottomTabNavigator();
const iconPrefix = OS === 'ios' ? 'ios' : 'md';
const iconSize = 25;

const screens = {
  DeckList: {
    name: 'My Decks',
    component: DeckList,
    options: {
      tabBarIcon: ({ color }) => (
        <Ionicons name={`${iconPrefix}-albums`} size={iconSize} color={color} />
      ),
    },
  },
  NewDeck:
    OS === 'android'
      ? null
      : {
          name: 'New Deck',
          component: NewDeck,
          options: {
            tabBarIcon: () => <Ionicons name="ios-add-circle" size={iconSize} color={white} />,
          },
        },
  Settings: {
    name: 'Settings',
    component: Settings,
    options: {
      tabBarIcon: ({ color }) => (
        <Ionicons name={`${iconPrefix}-settings`} size={iconSize} color={color} />
      ),
    },
  },
};

const tabNavProps = {
  initialRouteName: 'My Decks',
  tabBarOptions: { inactiveTintColor: '#939393' },
  // tabBarOptions only applies on createBottomTabNavigator, i.e., iOS only
};

export function TabNavigator() {
  const { dark } = useTheme();
  tabNavProps.tabBarOptions.tabStyle = dark ? { backgroundColor: '#272727' } : null;

  return (
    <Tab.Navigator {...tabNavProps}>
      {Object.entries(screens)
        .filter(([k, v]) => v !== null)
        .map(([k, v]) => (
          <Tab.Screen key={k} {...v} />
        ))}
    </Tab.Navigator>
  );
}

export function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'My Decks';

  switch (routeName) {
    case 'My Decks':
      return 'Flash⚡Cards';
    case 'New Deck':
      return 'Create a New Deck';
    case 'Settings':
      return 'Settings';
    default:
      return 'Home';
  }
}
