import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import * as actions from './actions'; 
import { AnyAction } from 'redux';
import { EmployeeTypes } from './types';
import { productModelToState } from '../product';

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

function* load_meetings(action: AnyAction) {
  const { id } = action.payload;
  try {
    const response: { [key: string] : any } = yield call(api.get, `/${endpoint}/${id}/meetings`);
    const data = response.data;
    yield put(actions.loadMeetingsSuccess(id, data));
  } catch (err) {
    yield put(actions.loadMeetingsFailure(err as any));
  }
}

function* load_products(action: AnyAction) {
  const { id } = action.payload;
  try {
    const response: { [key: string] : any } = yield call(api.get, `/${endpoint}/${id}/products`);
    const data = response.data;
    yield put(actions.loadProductsSuccess(id, data));
  } catch (err) {
    yield put(actions.loadProductsFailure(err as any));
  }
}

function* load_clients(action: AnyAction) {
  const { id } = action.payload;
  try {
    const response: { [key: string] : any } = yield call(api.get, `/${endpoint}/${id}/clients`);
    const data = response.data;
    yield put(actions.loadClientSuccess(id, data));
  } catch (err) {
    yield put(actions.loadClientFailure(err as any));
  }
}

function* add_client(action: AnyAction) {
  const { employee_id, client_id } = action.payload;
  try {
    yield call(api.post, `/${endpoint}/${employee_id}/add_client`, { "clientId": client_id });
    yield put(actions.addClientSuccess());
  } catch (err) {
    yield put(actions.addClientFailure(err as any));
  }
}

function* remove_client(action: AnyAction) {
  const { employee_id, client_id } = action.payload;
  try {
    yield call(api.delete, `/${endpoint}/${employee_id}/remove_client`, { "data": {"clientId": client_id }});
    yield put(actions.removeClientSuccess(client_id));
  } catch (err) {
    yield put(actions.addClientFailure(err as any));
  }
}

function* add_product(action: AnyAction) {
  const { employee_id, product_id } = action.payload;
  try {
    yield call(api.post, `/${endpoint}/${employee_id}/add_product`, { "productId": product_id });
    yield put(actions.addProductSuccess());
  } catch (err) {
    yield put(actions.addProductFailure(err as any));
  }
}

function* remove_product(action: AnyAction) {
  const { employee_id, product_id } = action.payload;
  try {
    yield call(api.delete, `/${endpoint}/${employee_id}/remove_product`, { "data": {"productId": product_id }});
    yield put(actions.removeProductSuccess(product_id));
  } catch (err) {
    yield put(actions.removeProductFailure(err as any));
  }
}

const employeeSagas = [
  takeLatest(EmployeeTypes.LOAD_REQUEST, load),
  takeLatest(EmployeeTypes.CREATE_REQUEST, create),
  takeLatest(EmployeeTypes.UPDATE_REQUEST, update),
  takeLatest(EmployeeTypes.REMOVE_REQUEST, remove),
  takeLatest(EmployeeTypes.LOAD_MEETINGS_REQUEST, load_meetings),
  takeLatest(EmployeeTypes.LOAD_PRODUCTS_REQUEST, load_products),
  takeLatest(EmployeeTypes.LOAD_CLIENTS_REQUEST, load_clients),
  takeLatest(EmployeeTypes.ADD_CLIENT_REQUEST, add_client),
  takeLatest(EmployeeTypes.REMOVE_CLIENT_REQUEST, remove_client),
  takeLatest(EmployeeTypes.ADD_PRODUCT_REQUEST, add_product),
  takeLatest(EmployeeTypes.REMOVE_PRODUCT_REQUEST, remove_product)
];

export default employeeSagas;
