import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, SafeAreaView, StyleSheet, Platform } from 'react-native';
import { useTheme, Menu, IconButton, Divider, Button } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import CardList from './CardList';
import Styles from '../styles/stylesheet';
import { white } from '../styles/palette';

export default function Deck() {
  const { id } = useRoute().params;
  const { title } = useSelector(({ data }) => data.decks[id]);
  const [displayTitle, setDisplayTitle] = useState(title);
  const titleBox = useRef(null);
  const [moreMenuVisible, setMoreMenuVisible] = useState(false);
  const { text } = useTheme().colors;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const toggleMoreMenu = () => {
    setMoreMenuVisible(!moreMenuVisible);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Menu
          visible={moreMenuVisible}
          onDismiss={toggleMoreMenu}
          anchor={
            <IconButton
              color={white}
              icon={`dots-${OS === 'ios' ? 'horizontal' : 'vertical'}`}
              onPress={toggleMoreMenu}
            />
          }
        >
          <Menu.Item
            title="Rename deck"
            icon="square-edit-outline"
            onPress={() => {
              toggleMoreMenu();
              titleBox.current.focus();
            }}
          />
          <Divider />
          <Menu.Item
            title="DELETE DECK"
            icon="delete-outline"
            onPress={() => {
              toggleMoreMenu();
              console.log('delete deck');
            }}
          />
        </Menu>
      ),
    });
  });

  return (
    <View style={Styles.mainContainer}>
      <View style={[Styles.newDeckContainer, { paddingTop: 10 }]}>
        <TextInput
          ref={titleBox}
          style={[Styles.newDeckInput, { color: text, fontSize: 40 }]}
          value={displayTitle}
          selectTextOnFocus
          onChangeText={(value) => setDisplayTitle(value)}
          onEndEditing={() => console.log('Setting new title: ' + displayTitle)}
        />
      </View>
      <CardList id={id} />
      <SafeAreaView style={styles.actionBtnRow}>
        <Button
          {...actionBtnProps}
          mode="outlined"
          icon="plus-circle"
          children="Add a Card"
          onPress={() => console.log('add a card')}
        />
        <Button
          {...actionBtnProps}
          mode="contained"
          icon="cards"
          children="Start Quiz"
          onPress={() => console.log('start quiz')}
        />
      </SafeAreaView>
    </View>
  );
}

const { OS } = Platform;

const styles = StyleSheet.create({
  actionBtnRow: {
    flexDirection: 'row',
  },
  actionBtn: {
    flex: 1,
    margin: 10,
    ...Platform.select({
      ios: {
        elevation: 0,
      },
    }),
  },
  actionBtnLabel: {
    fontSize: 18,
  },
});

const actionBtnProps = {
  style: styles.actionBtn,
  labelStyle: styles.actionBtnLabel,
  uppercase: OS === 'android',
};
