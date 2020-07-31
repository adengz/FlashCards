import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Styles from '../styles/stylesheet';

export default function QuizResult({ totalCards, correctCount }) {
  const navigation = useNavigation();

  return (
    <View style={Styles.quizContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Quiz Completed!</Text>
        <Text style={styles.stats}>
          {correctCount} / {totalCards} correct
        </Text>
      </View>
      <View>
        <Button
          {...bottomActionBtnProps}
          mode="outlined"
          icon="keyboard-backspace"
          children="Back to Deck"
          onPress={() => navigation.goBack()}
        />
        <Button
          {...bottomActionBtnProps}
          mode="contained"
          icon="restart"
          children="Start Over"
          onPress={() => console.log('start over')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
  },
  header: {
    fontSize: 40,
  },
  stats: {
    fontSize: 24,
  },
});

const bottomActionBtnProps = {
  style: [Styles.bottomActionBtn, { alignItems: 'flex-start' }],
  labelStyle: { fontSize: 24 },
  uppercase: Platform.OS === 'android',
};
