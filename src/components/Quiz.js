import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { ProgressBar, Card, IconButton, withTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import QuizResult from './QuizResult';
import Styles from '../styles/stylesheet';
import { red, green, white } from '../styles/palette';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = { total: 0, correct: 0 };
  }

  showNext = (correct) => {
    this.setState((currState) => ({
      total: currState.total + 1,
      correct: currState.correct + (correct ? 1 : 0),
    }));
  };

  startOver = () => {
    this.setState({ total: 0, correct: 0 });
  };

  render() {
    const {
      cards,
      theme: {
        colors: { primary, surface },
      },
    } = this.props;
    const { total } = this.state;

    if (total === cards.length) {
      return <QuizResult {...this.state} startOver={this.startOver} />;
    }

    return (
      <View style={Styles.quizContainer}>
        <View style={styles.progressBarContainer}>
          <ProgressBar style={styles.progressBar} progress={total / cards.length} />
        </View>
        <Card style={{ margin: 10 }}>
          <Card.Content style={{ height: 400 }} />
        </Card>
        <View style={styles.actionBtnContainer}>
          <AnswerBtn correct={false} onPress={() => this.showNext(false)} />
          <IconButton
            size={30}
            color={surface}
            style={[styles.flipBtn, { backgroundColor: primary }]}
            icon="rotate-3d-variant"
          />
          <AnswerBtn correct onPress={() => this.showNext(true)} />
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
  return { cards: cardIds.map((cardId) => cards[cardId]) };
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
