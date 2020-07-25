export const ADD_DECK = 'ADD_DECK';
export const CLEAR_DATA = 'CLEAR_DATA';

export const addDeck = ({ deckId, title }) => ({
  type: ADD_DECK,
  deckId,
  title,
});

export const clearData = () => ({
  type: CLEAR_DATA,
});
