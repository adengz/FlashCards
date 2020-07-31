import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { useTheme, Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Styles from '../styles/stylesheet';
import { green } from '../styles/palette';

export default function QuizResult({ totalCards, correctCount }) {
  const navigation = useNavigation();
  const { surface } = useTheme().colors;
  const percent = Math.round((correctCount / totalCards) * 100);

  return (
    <View style={Styles.quizContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Quiz Completed!</Text>
        <Text style={styles.stats}>
          {correctCount} / {totalCards} correct
        </Text>
      </View>
      <AnimatedCircularProgress
        size={300}
        width={30}
        fill={percent}
        rotation={0}
        tintColor={green}
        children={(fill) => <Text style={styles.fill}>{`${Math.round(fill)}%`}</Text>}
        backgroundColor={surface}
        duration={1000}
      />
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
    paddingBottom: 10,
  },
  stats: {
    fontSize: 24,
  },
  fill: {
    fontSize: 60,
  },
});

const bottomActionBtnProps = {
  style: [Styles.bottomActionBtn, { alignItems: 'flex-start' }],
  labelStyle: { fontSize: 24 },
  uppercase: Platform.OS === 'android',
};
