import React from 'react';
import { View, ScrollView, Switch, StyleSheet } from 'react-native';
import { useTheme, List, Divider } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDark } from '../redux/actions/settings';
import { Styles } from '../styles/stylesheet';
import { red } from '../styles/palette';

export default function Settings() {
  const { dark } = useSelector(({ settings }) => settings);
  const dispatch = useDispatch();

  const switchDark = () => {
    dispatch(toggleDark());
  };

  const { surface } = useTheme().colors;

  styles.item = {
    backgroundColor: surface,
  };

  return (
    <View style={Styles.container}>
      <ScrollView>
        <List.Section>
          <List.Subheader>Appearances</List.Subheader>
          <List.Item
            style={styles.item}
            title="Dark Mode"
            right={() => <Switch value={dark} onChange={switchDark} />}
          />
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
    </View>
  );
}

const styles = StyleSheet.create({
  titleDanger: {
    color: red,
    fontWeight: 'bold',
  },
});
