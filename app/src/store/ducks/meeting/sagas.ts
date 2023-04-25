import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import * as actions from './actions'; 
import { AnyAction } from 'redux';
import { MeetingTypes } from './types';

const endpoint = 'meetings';

function* load(action: AnyAction) {
  const { id } = action.payload
  const queryString = `/${endpoint}${id === 'all' ? '' : `/${id}`}`;
  try {
    const response: { [key: string]: any } = yield call(api.get, queryString);
    const data = response.data;
    yield put(actions.loadSuccess(id, data));
  } catch (err) {
    yield put(actions.loadFailure(err as any));
  }
}

function* create(action: AnyAction) {
  const { payload } = action.payload;
  try {
    const response: { [key: string]: any } = yield call(api.post, `/${endpoint}`, payload);
    const data = response.data;
    yield put(actions.createSuccess(data));
  } catch (err) {
    yield put(actions.createFailure(err as any));
  }
}

function* update(action: AnyAction) {
  const { id, payload } = action.payload;
  try {
    const response: { [key: string]: any } = yield call(api.put, `/${endpoint}/${id}`, payload);
    const data = response.data;
    yield put(actions.updateSuccess(data));
  } catch (err) {
    yield put(actions.updateFailure(err as any));
  }
}

function* remove(action: AnyAction) {
  const { id } = action.payload;
  try {
    const response: { [key: string]: any } = yield call(api.delete, `/${endpoint}/${id}`);
    const data = response.data;
    yield put(actions.removeSuccess(data));
  } catch (err) {
    yield put(actions.removeFailure(err as any));
  }
}

function* addEmployee(action: AnyAction) {
  const { employee_id, meeting_id } = action.payload;
  try {
    const response: { [key: string]: any } = yield call(api.put, `/${endpoint}/${meeting_id}/add_employee`, { "employeeId": employee_id });
    const data = response.data;
    yield put(actions.addEmployeeSuccess(data));
  } catch (err) {
    yield put(actions.addEmployeeFailure(err as any));
  }
}

function* removeEmployee(action: AnyAction) {
  const { employee_id, meeting_id } = action.payload;
  try {
    yield call(api.delete, `/${endpoint}/${meeting_id}/remove_employee`, { "data": {"employeeId": employee_id}});
    yield put(actions.removeEmployeeSuccess(employee_id));
  } catch (err) {
    yield put(actions.removeEmployeeFailure(err as any));
  }
}

const meetingSagas = [
  takeLatest(MeetingTypes.LOAD_REQUEST, load),
  takeLatest(MeetingTypes.CREATE_REQUEST, create),
  takeLatest(MeetingTypes.UPDATE_REQUEST, update),
  takeLatest(MeetingTypes.REMOVE_REQUEST, remove),
  takeLatest(MeetingTypes.ADD_EMPLOYEE_REQUEST, addEmployee),
  takeLatest(MeetingTypes.REMOVE_EMPLOYEE_REQUEST, removeEmployee),
]

export default meetingSagas;
