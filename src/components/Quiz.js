import React, { useState, useRef } from 'react';
import { View, ScrollView, Platform, StyleSheet } from 'react-native';
import { useTheme, Title, Paragraph, Button, ProgressBar, IconButton } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import CardStack from 'react-native-card-stack-swiper';
import CardFlip from 'react-native-card-flip';
import QuizResult from './QuizResult';
import Styles from '../styles/stylesheet';
import { colorMap, red, green, white } from '../styles/palette';

export default function Quiz() {
  const { id } = useRoute().params;
  const cardsInDeck = useSelector(({ data }) => {
    const { decks, cards } = data;
    return decks[id].cards.map((cardId) => cards[cardId]);
  });

  const getShuffledCards = () => cardsInDeck.sort(() => 0.5 - Math.random());

  const swiper = useRef(null);
  const cardList = useRef([]);
  const [total, setTotal] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [cards, setCards] = useState(getShuffledCards());

  const {
    dark,
    roundness,
    colors: { surface, text, primary },
  } = useTheme();

  const flipCard = (index) => {
    cardList.current[index].flip();
  };

  const flipTopCard = () => {
    flipCard(total);
  };

  const showNext = (right) => {
    setTotal(total + 1);
    if (right) {
      setCorrect(correct + 1);
    }
  };

  const startOver = () => {
    setCards(getShuffledCards());
    setTotal(0);
    setCorrect(0);
  };

  if (total === cards.length) {
    return <QuizResult total={total} correct={correct} startOver={startOver} />;
  }

  const renderCard = (item, index) => {
    const { id: cardId, question, answer } = item;
    const colorIndex = (index * 2) % colorMap.length;
    const [frontColor, backColor] = colorMap.slice(colorIndex, colorIndex + 2);
    return (
      <CardFlip
        key={cardId}
        ref={(card) => {
          cardList.current[index] = card;
        }}
        style={[styles.cardContainer]}
      >
        <View
          style={[
            Styles.flipCard,
            { backgroundColor: dark ? surface : frontColor, borderRadius: roundness },
          ]}
        >
          <Title style={{ color: dark ? frontColor : text }}>Question:</Title>
          <ScrollView style={styles.paragraphScroller}>
            <Paragraph style={styles.paragraph}>{question}</Paragraph>
          </ScrollView>
          <Button
            icon={flipIcon}
            uppercase={Platform.OS === 'android'}
            onPress={() => flipCard(index)}
            children="Show Answer"
          />
        </View>
        <View
          style={[
            Styles.flipCard,
            { backgroundColor: dark ? surface : backColor, borderRadius: roundness },
          ]}
        >
          <Title style={{ color: dark ? backColor : text }}>Answer:</Title>
          <ScrollView style={styles.paragraphScroller}>
            <Paragraph style={styles.paragraph}>{answer}</Paragraph>
          </ScrollView>
          <Button
            icon={flipIcon}
            uppercase={Platform.OS === 'android'}
            onPress={() => flipCard(index)}
            children="Show Question"
          />
        </View>
      </CardFlip>
    );
  };

  return (
    <View style={Styles.quizContainer}>
      <View style={styles.progressBarContainer}>
        <Paragraph>Progress:</Paragraph>
        <ProgressBar style={styles.progressBar} progress={(total + 1) / cards.length} />
      </View>
      <CardStack
        ref={(stack) => {
          swiper.current = stack;
        }}
        style={styles.cardStack}
        renderNoMoreCards={() => null}
        onSwipedLeft={() => showNext(false)}
        onSwipedRight={() => showNext(true)}
        verticalSwipe={false}
      >
        {cards.map(renderCard)}
      </CardStack>
      <View style={styles.actionBtnContainer}>
        <AnswerBtn correct={false} onPress={() => swiper.current.swipeLeft()} />
        <IconButton
          size={30}
          color={surface}
          style={[styles.flipBtn, { backgroundColor: primary }]}
          icon={flipIcon}
          onPress={flipTopCard}
        />
        <AnswerBtn correct onPress={() => swiper.current.swipeRight()} />
      </View>
    </View>
  );
}

const AnswerBtn = ({ correct, onPress }) => {
  const color = correct ? green : red;
  const props = {
    size: 40,
    color: white,
    icon: `thumb-${correct ? 'up' : 'down'}`,
    style: {
      ...styles.answerBtn,
      backgroundColor: color,
    },
  };
  return <IconButton {...props} onPress={onPress} />;
};

const flipIcon = 'rotate-3d-variant';

const styles = StyleSheet.create({
  progressBarContainer: {
    paddingHorizontal: 20,
  },
  progressBar: {
    height: 20,
  },
  cardStack: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 100,
  },
  cardContainer: {
    ...Styles.flipCardContainer,
    height: Styles.flipCardContainer.width,
    padding: 20,
  },
  paragraphScroller: {
    flex: 1,
  },
  paragraph: {
    fontSize: 18,
  },
  actionBtnContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    height: 100,
  },
  answerBtn: {
    alignSelf: 'flex-end',
  },
  flipBtn: {
    alignSelf: 'flex-start',
  },
});
