import { combineReducers } from 'redux';
import settings from './settings';
import data from './data';

export default combineReducers({
  settings,
  data,
});
