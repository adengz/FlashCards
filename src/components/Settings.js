import React from 'react';
import { StyleSheet, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, List, Divider } from 'react-native-paper';
import { Styles } from '../styles/stylesheet';
import { red } from '../styles/palette';

export default function Settings() {
  const { surface } = useTheme().colors;

  const styles = StyleSheet.create({
    item: {
      backgroundColor: surface,
    },
    titleDanger: {
      color: red,
      fontWeight: 'bold',
    },
  });

  return (
    <SafeAreaView style={Styles.container}>
      <ScrollView>
        <List.Section>
          <List.Subheader>Appearances</List.Subheader>
          <List.Item style={styles.item} title="Dark Mode" right={() => <Switch value={false} />} />
        </List.Section>
        <Divider />
        <List.Section>
          <List.Subheader>DANGER ZONE</List.Subheader>
          <List.Item
            title="CLEAR DATA"
            style={styles.item}
            titleStyle={styles.titleDanger}
            onPress={() => console.log('CLEAR DATA')}
          />
        </List.Section>
      </ScrollView>
    </SafeAreaView>
  );
}
