import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import DeckList from '../components/DeckList';
import Settings from '../components/Settings';

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
  return (
    <Tab.Navigator {...tabNavProps}>
      {Object.entries(screens).map(([k, v]) => (
        <Tab.Screen key={k} {...v} />
      ))}
    </Tab.Navigator>
  );
}

export function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'My Decks';

  switch (routeName) {
    case 'Settings':
      return 'Settings';
    default:
      return 'Flash⚡Cards';
  }
}
