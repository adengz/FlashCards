import { TOGGLE_DARK } from '../actions/settings';

export default function settings(state = {}, action) {
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
