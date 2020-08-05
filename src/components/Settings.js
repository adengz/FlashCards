import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useTheme, List, Switch, Divider } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDark } from '../redux/actions/settings';
import { clearData } from '../redux/actions/data';
import { toggleDarkAsync } from '../utils/settings';
import { clearDataAsync } from '../utils/data';
import { createTwoButtonnAlert } from '../utils/alerts';
import Styles from '../styles/stylesheet';

export default function Settings() {
  const { dark } = useSelector(({ settings }) => settings);

  const dispatch = useDispatch();
  const { surface } = useTheme().colors;

  const switchDark = () => {
    toggleDarkAsync();
    dispatch(toggleDark());
  };

  const pressClear = () => {
    createTwoButtonnAlert({
      title: 'CLEAR DATA',
      msg: 'Are you sure you want to clear all data? This operation cannot be undone.',
      confirmOnPress: () => {
        clearDataAsync();
        dispatch(clearData());
      },
      confirmText: 'Confirm',
    });
  };

  styles.item = {
    backgroundColor: surface,
  };

  return (
    <View style={Styles.mainContainer}>
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
            style={styles.item}
            titleStyle={styles.titleDanger}
            title="CLEAR DATA"
            onPress={pressClear}
          />
        </List.Section>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  titleDanger: {
    color: 'red',
    fontWeight: 'bold',
  },
});
