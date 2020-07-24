import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { Styles } from '../styles/stylesheet';

export default function Settings() {
  return (
    <SafeAreaView style={Styles.container}>
      <Text>Settings</Text>
    </SafeAreaView>
  );
}
