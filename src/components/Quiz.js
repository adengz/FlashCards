import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ProgressBar, Title, Paragraph, IconButton, withTheme } from 'react-native-paper';
import CardStack from 'react-native-card-stack-swiper';
import CardFlip from 'react-native-card-flip';
import { connect } from 'react-redux';
import QuizResult from './QuizResult';
import Styles from '../styles/stylesheet';
import { colorMap, red, green, white } from '../styles/palette';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = { total: 0, correct: 0 };
    this.shuffleCards();
  }

  shuffleCards = () => {
    this.props.cardsInDeck.sort(() => 0.5 - Math.random());
  };

  showNext = (correct) => {
    this.setState((currState) => ({
      total: currState.total + 1,
      correct: currState.correct + (correct ? 1 : 0),
    }));
  };

  startOver = () => {
    this.shuffleCards();
    this.setState({ total: 0, correct: 0 });
  };

  render() {
    const {
      cardsInDeck,
      theme: {
        dark,
        roundness,
        colors: { primary, surface, text },
      },
    } = this.props;
    const { total } = this.state;

    if (total === cardsInDeck.length) {
      return <QuizResult {...this.state} startOver={this.startOver} />;
    }

    return (
      <View style={Styles.quizContainer}>
        <View style={styles.progressBarContainer}>
          <ProgressBar style={styles.progressBar} progress={total / cardsInDeck.length} />
        </View>
        <CardStack
          ref={(swiper) => {
            this.swiper = swiper;
          }}
          style={styles.cardStack}
          renderNoMoreCards={() => null}
          onSwipedLeft={() => this.showNext(false)}
          onSwipedRight={() => this.showNext(true)}
          verticalSwipe={false}
        >
          {cardsInDeck.map((item, index) => {
            const { id, question, answer } = item;
            const colorIndex = (index * 2) % colorMap.length;
            const [frontColor, backColor] = colorMap.slice(colorIndex, colorIndex + 2);
            return (
              <CardFlip
                key={id}
                ref={(card) => {
                  this[`card${index}`] = card;
                }}
                style={[styles.cardContainer]}
              >
                <TouchableOpacity
                  activeOpacity={1}
                  style={[
                    Styles.flipCard,
                    { backgroundColor: dark ? surface : frontColor, borderRadius: roundness },
                  ]}
                  onPress={() => this[`card${index}`].flip()}
                >
                  <Title style={{ color: dark ? frontColor : text }}>Question:</Title>
                  <Paragraph style={styles.paragraph}>{question}</Paragraph>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={1}
                  style={[
                    Styles.flipCard,
                    { backgroundColor: dark ? surface : backColor, borderRadius: roundness },
                  ]}
                  onPress={() => this[`card${index}`].flip()}
                >
                  <Title style={{ color: dark ? backColor : text }}>Answer:</Title>
                  <Paragraph style={styles.paragraph}>{answer}</Paragraph>
                </TouchableOpacity>
              </CardFlip>
            );
          })}
        </CardStack>
        <View style={styles.actionBtnContainer}>
          <AnswerBtn correct={false} onPress={() => this.swiper.swipeLeft()} />
          <IconButton
            size={30}
            color={surface}
            style={[styles.flipBtn, { backgroundColor: primary }]}
            icon="rotate-3d-variant"
            onPress={() => this[`card${total}`].flip()}
          />
          <AnswerBtn correct onPress={() => this.swiper.swipeRight()} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ data }, { route }) => {
  const { id } = route.params;
  const {
    decks: {
      [id]: { cards: cardIds },
    },
    cards,
  } = data;
  return { cardsInDeck: cardIds.map((cardId) => cards[cardId]) };
};

export default withTheme(connect(mapStateToProps)(Quiz));

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
  },
  paragraph: {
    fontSize: 18,
    paddingHorizontal: 20,
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
