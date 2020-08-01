import {
  ADD_DECK,
  UPDATE_DECK_TITLE,
  DELETE_DECK,
  ADD_CARD,
  UPDATE_CARD,
  DELETE_CARDS,
  CLEAR_DATA,
} from '../actions/data';
import { jsQAs, reactQAs, reactNativeQAs } from '../../utils/mock';

const now = Date.now();
const defaultState = {
  decks: {
    deck_js: {
      id: 'deck_js',
      title: 'JavaScript',
      timestamp: now,
      cards: jsQAs.map((qa, index) => `card_js${index}`),
    },
    deck_rn: {
      id: 'deck_rn',
      title: 'React Native',
      timestamp: now + 1,
      cards: reactNativeQAs.map((qa, index) => `card_rn${index}`),
    },
    deck_react: {
      id: 'deck_react',
      title: 'React',
      timestamp: now + 2,
      cards: reactQAs.map((qa, index) => `card_react${index}`),
    },
    deck_es6: {
      id: 'deck_es6',
      title: 'ES6',
      timestamp: now + 3,
      cards: [],
    },
    deck_vue: {
      id: 'deck_vue',
      title: 'Vue',
      timestamp: now + 5,
      cards: [],
    },
    deck_ng: {
      id: 'deck_ng',
      title: 'Angular',
      timestamp: now + 6,
      cards: [],
    },
    deck_uiux: {
      id: 'deck_uiux',
      title: 'UI/UX',
      timestamp: now + 7,
      cards: [],
    },
    deck_node: {
      id: 'deck_node',
      title: 'Node.js',
      timestamp: now + 8,
      cards: [],
    },
    deck_fe: {
      id: 'deck_fe',
      title: 'Frontend',
      timestamp: now + 9,
      cards: [],
    },
  },
  cards: {},
};
jsQAs.forEach((qa, index) => {
  defaultState.cards[`card_js${index}`] = {
    id: `card_js${index}`,
    question: qa[0],
    answer: qa[1],
  };
});
reactNativeQAs.forEach((qa, index) => {
  defaultState.cards[`card_rn${index}`] = {
    id: `card_rn${index}`,
    question: qa[0],
    answer: qa[1],
  };
});
reactQAs.forEach((qa, index) => {
  defaultState.cards[`card_react${index}`] = {
    id: `card_react${index}`,
    question: qa[0],
    answer: qa[1],
  };
});

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
