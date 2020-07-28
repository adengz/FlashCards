export const ADD_DECK = 'ADD_DECK';
export const UPDATE_DECK_TITLE = 'UPDATE_DECK_TITLE';
export const DELETE_DECK = 'DELETE_DECK';
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

export const clearData = () => ({
  type: CLEAR_DATA,
});
