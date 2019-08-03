import { combineReducers } from 'redux'

import grid from './Grid/duck';
import options from './Options/duck';


export default combineReducers({
  grid,
  options,
});
