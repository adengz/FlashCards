import React, { useState, useRef, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, TextInput, StyleSheet } from 'react-native';
import { useTheme, Card as PaperCard, Title, IconButton } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { HeaderBackButton, useHeaderHeight } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import { addCard, updateCard, deleteCards } from '../redux/actions/data';
import { CancelBtn, SaveBtn, EditBtn } from './HeaderButtons';
import { getNewCardMetaData } from '../utils/helpers';
import Styles from '../styles/stylesheet';

export default function Card() {
  const { id, cardId } = useRoute().params;
  const { question: currQuestion = '', answer: currAnswer = '' } = useSelector(({ data }) =>
    typeof cardId === 'undefined' || typeof data.cards[cardId] === 'undefined'
      ? {}
      : data.cards[cardId]
  );

  const questionBox = useRef(null);
  const [displayedQuestion, setDisplayedQuestion] = useState(currQuestion);
  const [displayedAnswer, setDisplayedAnswer] = useState(currAnswer);
  const [editable, setEditable] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();
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

  const removeCard = () => {
    navigation.goBack();
    // persist storage
    dispatch(deleteCards({ id, cardIds: [cardId] }));
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
    <KeyboardAvoidingView
      style={[Styles.mainContainer, { justifyContent: 'center' }]}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={headerHeight}
    >
      <PaperCard
        style={[styles.card, { backgroundColor: surface }]}
        elevation={Platform.OS === 'ios' ? 0 : 1}
      >
        <PaperCard.Content style={styles.content}>
          <Title style={styles.label}>Question:</Title>
          <ScrollView style={styles.inputContainer}>
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
              maxLength={500}
              onChangeText={(value) => setDisplayedQuestion(value)}
              value={displayedQuestion}
              editable={editable}
            />
          </ScrollView>
        </PaperCard.Content>
        <PaperCard.Content style={styles.content}>
          <Title style={styles.label}>Answer:</Title>
          <ScrollView style={styles.inputContainer}>
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
              maxLength={500}
              onChangeText={(value) => setDisplayedAnswer(value)}
              value={displayedAnswer}
              editable={editable}
            />
          </ScrollView>
        </PaperCard.Content>
        <IconButton
          style={styles.deleteBtn}
          icon={typeof cardId === 'undefined' ? '' : 'delete'}
          size={30}
          color="red"
          disabled={editable}
          onPress={removeCard}
        />
      </PaperCard>
    </KeyboardAvoidingView>
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
  inputContainer: {
    height: 150,
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
    fontSize: 18,
  },
  deleteBtn: {
    alignSelf: 'flex-end',
  },
});
