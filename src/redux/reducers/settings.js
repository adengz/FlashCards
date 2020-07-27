import { TOGGLE_DARK, REVERSE_DECK_ORDER, UPDATE_DECK_SORTING } from '../actions/settings';

const defaultState = {
  dark: false,
  sortDecks: {
    by: 'timestamp',
    descending: false,
  },
};

export default function settings(state = defaultState, action) {
  switch (action.type) {
    case TOGGLE_DARK:
      return {
        ...state,
        dark: !state.dark,
      };
    case REVERSE_DECK_ORDER:
      return {
        ...state,
        sortDecks: {
          ...state.sortDecks,
          descending: !state.sortDecks.descending,
        },
      };
    case UPDATE_DECK_SORTING:
      return {
        ...state,
        sortDecks: {
          ...state.sortDecks,
          by: action.by,
        },
      };
    default:
      return state;
  }
}
