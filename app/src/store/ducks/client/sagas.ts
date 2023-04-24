import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import * as actions from './actions';
import { AnyAction } from 'redux';
import { ClientTypes } from './types';

const endpoint = 'clients';

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

function* load_employees(action: AnyAction) {
  const { id } = action.payload;
  try {
    const response: { [key: string] : any } = yield call(api.get, `/${endpoint}/${id}/employees`);
    const data = response.data;
    yield put(actions.loadEmplyoeesSuccess(id, data));
  } catch (err) {
    yield put(actions.loadEmployeesFailure(err as any));
  }
}

function* add_employee(action: AnyAction) {
  const { employee_id, client_id } = action.payload;
  try {
    yield call(api.post, `/${endpoint}/${client_id}/add_employee`, { "employeeId": employee_id });
    yield put(actions.addEmployeeSuccess());
  } catch (err) {
    yield put(actions.addEmployeeFailure(err as any));
  }
}

function* remove_employee(action: AnyAction) {
  const { employee_id, client_id } = action.payload;
  try {
    yield call(api.delete, `/${endpoint}/${client_id}/remove_employee`, { "data": {"employeeId": employee_id }});
    yield put(actions.removeEmployeeSuccess(employee_id));
  } catch (err) {
    yield put(actions.removeEmployeeFailure(err as any));
  }
}

function* load_client_products(action: AnyAction) {
  const { id } = action.payload;
  try {
    const response: { [key: string] : any } = yield call(api.get, `/${endpoint}/${id}/client_products`);
    const data = response.data;
    yield put(actions.loadClientProductsSuccess(id, data));
  } catch (err) {
    yield put(actions.loadClientProductFailure(err as any));
  }
}

function* add_product(action: AnyAction) {
  const { product_id, client_id } = action.payload;
  try {
    yield call(api.post, `/${endpoint}/${client_id}/add_product`, { "productId": product_id });
    yield put(actions.addProductSuccess());
  } catch (err) {
    yield put(actions.addProductFailure(err as any));
  }
}

function* remove_product(action: AnyAction) {
  const { product_id, client_id } = action.payload;
  try {
    yield call(api.delete, `/${endpoint}/${client_id}/remove_product`, { "data": {"productId": product_id }});
    yield put(actions.removeProductSuccess(product_id));
  } catch (err) {
    yield put(actions.removeProductFailure(err as any));
  }
}

const clientSagas = [
  takeLatest(ClientTypes.LOAD_REQUEST, load),
  takeLatest(ClientTypes.CREATE_REQUEST, create),
  takeLatest(ClientTypes.UPDATE_REQUEST, update),
  takeLatest(ClientTypes.REMOVE_REQUEST, remove),
  takeLatest(ClientTypes.LOAD_MEETINGS_REQUEST, load_meetings),
  takeLatest(ClientTypes.LOAD_EMPLOYEES_REQUEST, load_employees),
  takeLatest(ClientTypes.ADD_EMPLOYEE_REQUEST, add_employee),
  takeLatest(ClientTypes.LOAD_CLIENT_PRODUCTS_REQUEST, load_client_products),
  takeLatest(ClientTypes.ADD_PRODUCT_REQUEST, add_product),
  takeLatest(ClientTypes.REMOVE_PRODUCT_REQUEST, remove_product)
];

export default clientSagas;
