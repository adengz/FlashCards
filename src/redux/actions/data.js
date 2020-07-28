export const ADD_DECK = 'ADD_DECK';
export const UPDATE_DECK_TITLE = 'UPDATE_DECK_TITLE';
export const DELETE_DECK = 'DELETE_DECK';
export const CLEAR_DATA = 'CLEAR_DATA';

export const addDeck = ({ id, newTitle, timestamp }) => ({
  type: ADD_DECK,
  id,
  newTitle,
  timestamp,
});

export const updateDeckTitle = ({ id, newTitle }) => ({
  type: UPDATE_DECK_TITLE,
  id,
  newTitle,
});

export const deleteDeck = (id) => ({
  type: DELETE_DECK,
  id,
});

export const clearData = () => ({
  type: CLEAR_DATA,
});
