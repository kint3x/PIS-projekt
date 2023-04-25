import { combineReducers } from 'redux';
import employee from './employee';
import client from './client';
import meeting from './meeting';

export default combineReducers({
  employee,
  client,
  meeting
});