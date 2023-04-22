import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import * as actions from './actions'; 
import { AnyAction } from 'redux';
import { EmployeeTypes } from './types';

const endpoint = 'employees';

function* load(action: AnyAction) {
  const { id } = action.payload;
  const queryString = `/${endpoint}${id === 'all' ? '' : `/${id}`}`;
  try {
    const response: { [key: string] : any } = yield call(api.get, queryString);
    const data = response.data;
    yield put(actions.loadSuccess(id, data));
  } catch (err) {
    yield put(actions.loadFailure(err as any));
  }
}

function* create(action: AnyAction) {
  const { payload } = action.payload;
  try {
    yield call(api.post, `/${endpoint}`, payload);
    yield put(actions.createSuccess());
  } catch (err) {
    yield put(actions.createFailure(err as any));
  }
}

function* update(action: AnyAction) {
  const { id, payload } = action.payload;
  try {
    yield call(api.put, `/${endpoint}/${id}`, payload);
    yield put(actions.updateSuccess());
  } catch (err) {
    yield put(actions.updateFailure(err as any));
  }
}

function* remove(action: AnyAction) {
  const { id } = action.payload;
  try {
    yield call(api.delete, `/${endpoint}/${id}`);
    yield put(actions.removeSuccess(id));
  } catch (err) {
    yield put(actions.removeFailure(err as any));
  }
}

const employeeSagas = [
  takeLatest(EmployeeTypes.LOAD_REQUEST, load),
  takeLatest(EmployeeTypes.CREATE_REQUEST, create),
  takeLatest(EmployeeTypes.UPDATE_REQUEST, update),
  takeLatest(EmployeeTypes.REMOVE_REQUEST, remove)
];

export default employeeSagas;
