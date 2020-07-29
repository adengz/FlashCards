import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useTheme, Card as PaperCard, Title, IconButton } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import { addCard, updateCard } from '../redux/actions/data';
import { CancelBtn, SaveBtn, EditBtn } from './HeaderButtons';
import { getNewCardMetaData } from '../utils/helpers';
import Styles from '../styles/stylesheet';

export default function Card() {
  const { id, cardId } = useRoute().params;
  const [editable, setEditable] = useState(false);
  const { question: currQuestion = '', answer: currAnswer = '' } = useSelector(({ data }) =>
    typeof cardId === 'undefined' ? {} : data.cards[cardId]
  );
  const questionBox = useRef(null);
  const [displayedQuestion, setDisplayedQuestion] = useState(currQuestion);
  const [displayedAnswer, setDisplayedAnswer] = useState(currAnswer);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    roundness,
    colors: { text, background, surface },
  } = useTheme();

  const startEdit = () => {
    setEditable(true);
    setTimeout(() => questionBox.current.focus(), 0);
  };

  const cancelEdit = () => {
    setEditable(false);
    setDisplayedQuestion(currQuestion);
    setDisplayedAnswer(currAnswer);
    if (typeof cardId === 'undefined') {
      navigation.goBack();
    }
  };

  const saveEdit = () => {
    setEditable(false);
    const question = displayedQuestion.trim();
    const answer = displayedAnswer.trim();
    if (typeof cardId === 'undefined') {
      const metaData = getNewCardMetaData();
      navigation.setParams({ cardId: metaData.newCardId });
      // persist storage
      dispatch(addCard({ id, question, answer, ...metaData }));
    } else {
      // persist storage
      dispatch(updateCard({ cardId, question, answer }));
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (props) =>
        editable ? <CancelBtn onPress={cancelEdit} /> : <HeaderBackButton {...props} />,
      headerRight: () =>
        editable ? (
          <SaveBtn
            onPress={saveEdit}
            disabled={displayedQuestion.trim() === '' || displayedAnswer.trim() === ''}
          />
        ) : (
          <EditBtn onPress={startEdit} />
        ),
    });
  });

  useEffect(() => {
    if (typeof cardId === 'undefined') {
      startEdit();
    }
  }, []);

  return (
    <View style={Styles.mainContainer}>
      <PaperCard style={[styles.card, { backgroundColor: surface }]}>
        <PaperCard.Content style={styles.content}>
          <Title style={styles.label}>Question:</Title>
          <TextInput
            ref={questionBox}
            style={[
              styles.input,
              {
                backgroundColor: editable ? background : surface,
                color: text,
                borderRadius: roundness,
              },
            ]}
            multiline
            onChangeText={(value) => setDisplayedQuestion(value)}
            value={displayedQuestion}
            editable={editable}
          />
        </PaperCard.Content>
        <PaperCard.Content style={styles.content}>
          <Title style={styles.label}>Answer:</Title>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: editable ? background : surface,
                color: text,
                borderRadius: roundness,
              },
            ]}
            multiline
            onChangeText={(value) => setDisplayedAnswer(value)}
            value={displayedAnswer}
            editable={editable}
          />
        </PaperCard.Content>
        {typeof cardId !== 'undefined' && (
          <IconButton
            style={styles.deleteBtn}
            icon="delete"
            size={30}
            color="red"
            disabled={editable}
            onPress={() => console.log('delete card')}
          />
        )}
      </PaperCard>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 20,
  },
  content: {
    padding: 16,
  },
  label: {
    textDecorationLine: 'underline',
  },
  input: {
    paddingVertical: 5,
    marginHorizontal: 5,
    fontSize: 18,
  },
  deleteBtn: {
    alignSelf: 'flex-end',
  },
});
