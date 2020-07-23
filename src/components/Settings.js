import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Styles } from '../styles/stylesheet';

export default function Settings() {
  return (
    <SafeAreaView style={Styles.container}>
      <Text>Settings</Text>
    </SafeAreaView>
  );
}
