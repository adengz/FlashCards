import { ADD_DECK, CLEAR_DATA } from '../actions/data';
import { colorMap } from '../../styles/palette';

const defaultState = { decks: {}, cards: {} };
const now = Date.now();
for (let i = 0; i < colorMap.length; i++) {
  defaultState.decks[`deck_${colorMap[i]}`] = {
    id: `deck_${colorMap[i]}`,
    title: colorMap[i],
    timestamp: now + i,
    cards: Array(colorMap[i].length),
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
