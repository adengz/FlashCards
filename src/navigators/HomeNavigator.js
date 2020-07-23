import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
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

export default function TabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {Object.entries(screens).map(([k, v]) => (
          <Tab.Screen key={k} {...v} />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
