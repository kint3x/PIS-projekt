import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import * as actions from './actions';
import { AnyAction } from 'redux';
import { EmployeeTypes } from './types';

const endpoint = 'employees';

function* auth(action: AnyAction) {
  const { username, password } = action.payload;
  try {
    const response: { [key: string]: any } = yield call(api.post, `/auth`, { "username": username, "password": password });
    const token = response.data
    yield put(actions.authSuccess(token));
  } catch (err) {
    yield put(actions.createFailure(err as any));
  }
}

function* load(action: AnyAction) {
  const { id } = action.payload;
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
    const data = response.data
    yield put(actions.createSuccess(data));
  } catch (err) {
    yield put(actions.createFailure(err as any));
  }
}

function* update(action: AnyAction) {
  const { id, payload } = action.payload;
  try {
    const response: { [key: string]: any } = yield call(api.put, `/${endpoint}/${id}`, payload);
    const data = response.data
    yield put(actions.updateSuccess(data));
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

function* loadMeetings(action: AnyAction) {
  const { id } = action.payload;
  try {
    const response: { [key: string]: any } = yield call(api.get, `/${endpoint}/${id}/meetings`);
    const data = response.data;
    yield put(actions.loadMeetingsSuccess(id, data));
  } catch (err) {
    yield put(actions.loadMeetingsFailure(err as any));
  }
}

function* loadProducts(action: AnyAction) {
  const { id } = action.payload;
  try {
    const response: { [key: string]: any } = yield call(api.get, `/${endpoint}/${id}/products`);
    const data = response.data;
    yield put(actions.loadProductsSuccess(id, data));
  } catch (err) {
    yield put(actions.loadProductsFailure(err as any));
  }
}

function* loadClients(action: AnyAction) {
  const { id } = action.payload;
  try {
    const response: { [key: string]: any } = yield call(api.get, `/${endpoint}/${id}/clients`);
    const data = response.data;
    yield put(actions.loadClientSuccess(id, data));
  } catch (err) {
    yield put(actions.loadClientFailure(err as any));
  }
}

function* addClient(action: AnyAction) {
  const { employee_id, client_id } = action.payload;
  try {
    const response: { [key: string]: any } = yield call(
      api.post, `/${endpoint}/${employee_id}/add_client`,
      { "clientId": client_id }
    );
    const data = response.data;
    yield put(actions.addClientSuccess(data));
  } catch (err) {
    yield put(actions.addClientFailure(err as any));
  }
}

function* removeClient(action: AnyAction) {
  const { employee_id, client_id } = action.payload;
  try {
    yield call(api.delete, `/${endpoint}/${employee_id}/remove_client`, { "data": { "clientId": client_id } });
    yield put(actions.removeClientSuccess(client_id));
  } catch (err) {
    yield put(actions.addClientFailure(err as any));
  }
}

function* addProduct(action: AnyAction) {
  const { employee_id, product_id } = action.payload;
  try {
    const response: { [key: string]: any } = yield call(api.post, `/${endpoint}/${employee_id}/add_product`, { "productId": product_id });
    const data = response.data;
    yield put(actions.addProductSuccess(data));
  } catch (err) {
    yield put(actions.addProductFailure(err as any));
  }
}

function* removeProduct(action: AnyAction) {
  const { employee_id, product_id } = action.payload;
  try {
    yield call(api.delete, `/${endpoint}/${employee_id}/remove_product`, { "data": { "productId": product_id } });
    yield put(actions.removeProductSuccess(product_id));
  } catch (err) {
    yield put(actions.removeProductFailure(err as any));
  }
}

function* loadClientProducts(action: AnyAction) {
  const { id } = action.payload;
  try {
    const response: { [key: string]: any } = yield call(api.get, `${endpoint}/${id}/client_products`);
    const data = response.data;
    yield put(actions.loadClientProductsSuccess(id, data));
  } catch (err) {
    yield put(actions.loadClientProductFailure(err as any));
  }
}

const employeeSagas = [
  takeLatest(EmployeeTypes.AUTH_REQUEST, auth),
  takeLatest(EmployeeTypes.LOAD_REQUEST, load),
  takeLatest(EmployeeTypes.CREATE_REQUEST, create),
  takeLatest(EmployeeTypes.UPDATE_REQUEST, update),
  takeLatest(EmployeeTypes.REMOVE_REQUEST, remove),
  takeLatest(EmployeeTypes.LOAD_MEETINGS_REQUEST, loadMeetings),
  takeLatest(EmployeeTypes.LOAD_PRODUCTS_REQUEST, loadProducts),
  takeLatest(EmployeeTypes.LOAD_CLIENTS_REQUEST, loadClients),
  takeLatest(EmployeeTypes.ADD_CLIENT_REQUEST, addClient),
  takeLatest(EmployeeTypes.REMOVE_CLIENT_REQUEST, removeClient),
  takeLatest(EmployeeTypes.ADD_PRODUCT_REQUEST, addProduct),
  takeLatest(EmployeeTypes.REMOVE_PRODUCT_REQUEST, removeProduct),
  takeLatest(EmployeeTypes.LOAD_CLIENT_PRODUCTS_REQUEST, loadClientProducts)
];

export default employeeSagas;
