import { ADD_DECK, CLEAR_DATA } from '../actions/data';
import { colorMap } from '../../styles/palette';

const now = Date.now();
const defaultState = {
  decks: {
    deck_colors: {
      id: 'deck_colors',
      title: 'colors',
      timestamp: now,
      cards: colorMap.map((color) => `card_${color}`),
    },
  },
  cards: {},
};
for (let i = 0; i < colorMap.length; i++) {
  defaultState.cards[`card_${colorMap[i]}`] = {
    id: `card_${colorMap[i]}`,
    question: colorMap[i],
    answer: 'answer',
  };
}

export default function data(state = defaultState, action) {
  switch (action.type) {
    case ADD_DECK:
      return {
        ...state,
        decks: {
          ...state.decks,
          [action.deckId]: {
            id: action.deckId,
            title: action.title,
            timestamp: action.timestamp,
            cards: [],
          },
        },
      };
    case CLEAR_DATA:
      return { decks: {}, cards: {} };
    default:
      return state;
  }
}
