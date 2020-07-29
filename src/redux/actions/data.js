export const ADD_DECK = 'ADD_DECK';
export const UPDATE_DECK_TITLE = 'UPDATE_DECK_TITLE';
export const DELETE_DECK = 'DELETE_DECK';
export const ADD_CARD = 'ADD_CARD';
export const UPDATE_CARD = 'UPDATE_CARD';
export const DELETE_CARDS = 'DELETE_CARDS';
export const CLEAR_DATA = 'CLEAR_DATA';

export const addDeck = ({ id, title, timestamp }) => ({
  type: ADD_DECK,
  id,
  title,
  timestamp,
});

export const updateDeckTitle = ({ id, title }) => ({
  type: UPDATE_DECK_TITLE,
  id,
  title,
});

export const deleteDeck = (id) => ({
  type: DELETE_DECK,
  id,
});

export const addCard = ({ id, newCardId, question, answer }) => ({
  type: ADD_CARD,
  id,
  newCardId,
  question,
  answer,
});

export const updateCard = ({ cardId, question, answer }) => ({
  type: UPDATE_CARD,
  cardId,
  question,
  answer,
});

export const deleteCards = ({ id, cardIds }) => ({
  type: DELETE_CARDS,
  id,
  cardIds,
});

export const clearData = () => ({
  type: CLEAR_DATA,
});
