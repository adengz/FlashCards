import { UPDATE_DECK_SORTING } from "./settings";

export const ADD_DECK = 'ADD_DECK';
export const UPDATE_DECK_TITLE = 'UPDATE_DECK_TITLE';
export const DELETE_DECK = 'DELETE_DECK';
export const CLEAR_DATA = 'CLEAR_DATA';

export const addDeck = ({ deckId, title, timestamp }) => ({
  type: ADD_DECK,
  deckId,
  title,
  timestamp,
});

export const updateDeckTitle = ({ deckId, title }) => ({
  type: UPDATE_DECK_TITLE,
  deckId,
  title,
});

export const deleteDeck = ({ deckId }) => ({
  type: DELETE_DECK,
  deckId,
});

export const clearData = () => ({
  type: CLEAR_DATA,
});
