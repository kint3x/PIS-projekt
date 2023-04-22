import { combineReducers } from 'redux';
import employee from './employee';
import client from './client';

export default combineReducers({
  employee,
  client
});