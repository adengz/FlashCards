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
    case ADD_DECK: {
      const { id, title, timestamp } = action;
      return {
        ...state,
        decks: {
          ...state.decks,
          [id]: {
            id,
            title,
            timestamp,
            cards: [],
          },
        },
      };
    }
    case UPDATE_DECK_TITLE: {
      const { id, title } = action;
      return {
        ...state,
        decks: {
          ...state.decks,
          [id]: {
            ...state.decks[id],
            title,
          },
        },
      };
    }
    case DELETE_DECK: {
      const { id } = action;
      const { [id]: deletedDeck, ...remainingDecks } = state.decks;
      const cardIds = new Set(deletedDeck.cards);
      return {
        ...state,
        decks: remainingDecks,
        // not sure if there is a better way to remove mutiple computed properties
        cards: Object.fromEntries(Object.entries(state.cards).filter(([k]) => !cardIds.has(k))),
      };
    }
    case CLEAR_DATA:
      return { decks: {}, cards: {} };
    default:
      return state;
  }
}
