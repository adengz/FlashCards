import { ADD_DECK, UPDATE_DECK_TITLE, DELETE_DECK, CLEAR_DATA } from '../actions/data';
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
    case UPDATE_DECK_TITLE:
      return {
        ...state,
        decks: {
          ...state.decks,
          [action.deckId]: {
            ...state.decks[action.deckId],
            title: action.title,
          },
        },
      };
    case DELETE_DECK:
      return {
        ...state,
        decks: Object.assign(
          {},
          ...Object.entries(state.decks)
            .filter(([k]) => k !== action.deckId)
            .map(([k, v]) => ({ [k]: v }))
        ),
        cards: Object.assign(
          {},
          ...Object.entries(state.cards)
            .filter(([k]) => !state.decks[action.deckId].cards.includes(k))
            .map(([k, v]) => ({ [k]: v }))
        ),
      };
    case CLEAR_DATA:
      return { decks: {}, cards: {} };
    default:
      return state;
  }
}
