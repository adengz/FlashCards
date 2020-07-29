import {
  ADD_DECK,
  UPDATE_DECK_TITLE,
  DELETE_DECK,
  ADD_CARD,
  UPDATE_CARD,
  DELETE_CARDS,
  CLEAR_DATA,
} from '../actions/data';
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
      const deletedCardIds = new Set(deletedDeck.cards);
      return {
        ...state,
        decks: remainingDecks,
        cards: Object.fromEntries(
          Object.entries(state.cards).filter(([k]) => !deletedCardIds.has(k))
        ),
      };
    }
    case ADD_CARD: {
      const { id, newCardId, question, answer } = action;
      return {
        ...state,
        decks: {
          ...state.decks,
          [id]: {
            ...state.decks[id],
            cards: state.decks[id].cards.concat([newCardId]),
          },
        },
        cards: {
          ...state.cards,
          [newCardId]: {
            id: newCardId,
            question,
            answer,
          },
        },
      };
    }
    case UPDATE_CARD: {
      const { cardId, question, answer } = action;
      return {
        ...state,
        cards: {
          ...state.cards,
          [cardId]: {
            ...state.cards[cardId],
            question,
            answer,
          },
        },
      };
    }
    case DELETE_CARDS: {
      const { id, cardIds } = action;
      const deletedCardIds = new Set(cardIds);
      return {
        ...state,
        decks: {
          ...state.decks,
          [id]: {
            ...state.decks[id],
            cards: state.decks[id].cards.filter((k) => !deletedCardIds.has(k)),
          },
        },
        cards: Object.fromEntries(
          Object.entries(state.cards).filter(([k]) => !deletedCardIds.has(k))
        ),
      };
    }
    case CLEAR_DATA:
      return { decks: {}, cards: {} };
    default:
      return state;
  }
}
