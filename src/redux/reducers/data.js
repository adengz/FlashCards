import { CLEAR_DATA } from '../actions/data';

export default function data(state = {}, action) {
  switch (action.type) {
    case CLEAR_DATA:
      return {};
    default:
      return state;
  }
}
