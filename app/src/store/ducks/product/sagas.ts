import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import * as actions from './actions';
import { AnyAction } from 'redux';
import { ProductTypes } from './types';

const endpoint = 'products';

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

function* loadEmployees(action: AnyAction) {
  const { id } = action.payload;
  try {
    const response: { [key: string] : any } = yield call(api.get, `/${endpoint}/${id}/employees`);
    const data = response.data;
    yield put(actions.loadEmplyoeesSuccess(id, data));
  } catch (err) {
    yield put(actions.loadEmployeesFailure(err as any));
  }
}

function* addEmployee(action: AnyAction) {
  const { employee_id, product_id } = action.payload;
  try {
    yield call(api.post, `/${endpoint}/${product_id}/add_employee`, { "employeeId": employee_id });
    yield put(actions.addEmployeeSuccess());
  } catch (err) {
    yield put(actions.addEmployeeFailure(err as any));
  }
}

function* removeEmployee(action: AnyAction) {
  const { employee_id, product_id } = action.payload;
  try {
    yield call(api.delete, `/${endpoint}/${product_id}/remove_employee`, { "data": {"employeeId": employee_id }});
    yield put(actions.removeEmployeeSuccess(employee_id));
  } catch (err) {
    yield put(actions.removeEmployeeFailure(err as any));
  }
}

function* loadClientProducts(action: AnyAction) {
  const { id } = action.payload;
  try {
    const response: { [key: string] : any } = yield call(api.get, `/${endpoint}/${id}/client_products`);
    const data = response.data;
    yield put(actions.loadClientProductsSuccess(id, data));
  } catch (err) {
    yield put(actions.loadClientProductFailure(err as any));
  }
}

function* addClient(action: AnyAction) {
  const { product_id, client_id } = action.payload;
  try {
    yield call(api.post, `/${endpoint}/${product_id}/add_client`, { "clientId": client_id });
    yield put(actions.addClientSuccess());
  } catch (err) {
    yield put(actions.addClientFailure(err as any));
  }
}

function* removeClient(action: AnyAction) {
  const { product_id, client_id } = action.payload;
  try {
    yield call(api.delete, `/${endpoint}/${product_id}/remove_client`, { "data": {"clientId": client_id }});
    yield put(actions.removeClientSuccess(client_id));
  } catch (err) {
    yield put(actions.addClientFailure(err as any));
  }
}

const productSagas = [
  takeLatest(ProductTypes.LOAD_REQUEST, load),
  takeLatest(ProductTypes.CREATE_REQUEST, create),
  takeLatest(ProductTypes.UPDATE_REQUEST, update),
  takeLatest(ProductTypes.REMOVE_REQUEST, remove),
  takeLatest(ProductTypes.LOAD_EMPLOYEES_REQUEST, loadEmployees),
  takeLatest(ProductTypes.ADD_EMPLOYEE_REQUEST, addEmployee),
  takeLatest(ProductTypes.REMOVE_EMPLOYEE_REQUEST, removeEmployee),
  takeLatest(ProductTypes.LOAD_CLIENT_PRODUCTS_REQUEST, loadClientProducts),
  takeLatest(ProductTypes.ADD_CLIENT_REQUEST, addClient),
  takeLatest(ProductTypes.REMOVE_CLIENT_REQUEST, removeClient)
]

export default productSagas;
