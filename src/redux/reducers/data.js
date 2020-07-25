import { CLEAR_DATA } from '../actions/data';
import { lightColorMap as colorMap } from '../../styles/palette';

const defaultState = { decks: {}, cards: {} };
const now = Date.now();
for (let i = 0; i < colorMap.length; i++) {
  defaultState.decks[colorMap[i]] = {
    id: colorMap[i],
    title: colorMap[i],
    timestamp: now + i,
    questions: [],
  };
}

export default function data(state = defaultState, action) {
  switch (action.type) {
    case CLEAR_DATA:
      return { decks: {}, cards: {} };
    default:
      return state;
  }
}
