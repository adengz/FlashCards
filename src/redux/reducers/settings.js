import { TOGGLE_DARK } from '../actions/settings';

const defaultState = { dark: false };

export default function settings(state = defaultState, action) {
  switch (action.type) {
    case TOGGLE_DARK:
      return {
        ...state,
        dark: !state.dark,
      };
    default:
      return state;
  }
}
