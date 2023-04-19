import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import { loadSuccess, loadFailure } from './actions';
import { AnyAction } from 'redux';
import { EmployeeTypes } from './types';

function* load(action: AnyAction) {
  const { id } = action.payload;
  const queryString = `/employees${id === 'all' ? '' : `/${id}`}`;
  try {
    const response: { [key: string] : any } = yield call(api.get, queryString);
    // TODO: handle lists
    const data = id === 'all' ? response.data.data : response.data;
    yield put(loadSuccess(id, data));
  } catch (err) {
    yield put(loadFailure(err as any));
  }
}

const employeeSagas = [
  takeLatest(EmployeeTypes.LOAD_REQUEST, load),
];

export default employeeSagas;
