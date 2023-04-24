import { action } from 'typesafe-actions';
import { EmployeeTypes, EmployeeModel, EmployeeData } from './types';
import { MeetingModel } from '../meeting/types';
import { ProductModel } from '../product/types';
import { ClientModel } from '../client/types';

export const loadRequest = (
  id: number | 'all',
) => action(EmployeeTypes.LOAD_REQUEST, { id });

export const loadSuccess = (
  id: number,
  data: EmployeeModel | EmployeeModel[]
) => action(EmployeeTypes.LOAD_SUCCESS, { id, data });

export const loadFailure = (err: any) => action(EmployeeTypes.LOAD_FAILURE, err);

export const createRequest = (
  payload: EmployeeData
) => action(EmployeeTypes.CREATE_REQUEST, { payload });

export const createSuccess = () => action(EmployeeTypes.CREATE_SUCCESS);

export const createFailure = (err: any) => action(EmployeeTypes.CREATE_FAILURE, err);

export const updateRequest = (
  id: number,
  payload: EmployeeData
) => action(EmployeeTypes.UPDATE_REQUEST, { id, payload });

export const updateSuccess = () => action(EmployeeTypes.UPDATE_SUCCESS);

export const updateFailure = (err: any) => action(EmployeeTypes.UPDATE_FAILURE, err);

export const removeRequest = (
  id: number
) => action(EmployeeTypes.REMOVE_REQUEST, { id });

export const removeSuccess = (
  id: number
) => action(EmployeeTypes.REMOVE_SUCCESS,{ id });

export const removeFailure = (err: any) => action(EmployeeTypes.REMOVE_FAILURE, err);

export const loadMeetingsRequest = (id: number) => action(EmployeeTypes.LOAD_MEETINGS_REQUEST, { id })

export const loadMeetingsSuccess = (
  id: number,
  data: MeetingModel[]
) => action(EmployeeTypes.LOAD_MEETINGS_SUCCESS, { id, data })

export const loadMeetingsFailure = (err: any) => action(EmployeeTypes.LOAD_MEETINGS_FAILURE, err);

export const loadProductsRequest = (id: number) => action(EmployeeTypes.LOAD_PRODUCTS_REQUEST, { id })

export const loadProductsSuccess = (
  id: number,
  data: ProductModel[]
) => action(EmployeeTypes.LOAD_PRODUCTS_SUCCESS, { id, data })

export const loadProductsFailure = (err: any) => action(EmployeeTypes.LOAD_PRODUCTS_FAILURE, err);

export const loadClientRequest = (id: number) => action(EmployeeTypes.LOAD_CLIENTS_REQUEST, { id })

export const loadClientSuccess = (
  id: number,
  data: ClientModel[]
) => action(EmployeeTypes.LOAD_CLIENTS_SUCCESS, { id, data })

export const loadClientFailure = (err: any) => action(EmployeeTypes.LOAD_CLIENTS_SUCCESS, err);

export const addClientRequest = (
  employee_id: number,
  client_id: number
) => action(EmployeeTypes.ADD_CLIENT_REQUEST, { employee_id, client_id });

export const addClientSuccess = () => action(EmployeeTypes.ADD_CLIENT_SUCCESS);

export const addClientFailure = (err: any) => action(EmployeeTypes.ADD_CLIENT_FAILURE, err);

export const removeClientRequest = (
  employee_id: number,
  client_id: number
) => action(EmployeeTypes.REMOVE_CLIENT_REQUEST, { employee_id, client_id });

export const removeClientSuccess = (id: number) => action(EmployeeTypes.REMOVE_CLIENT_SUCCESS, { id });

export const removeClientFailure = (err: any) => action(EmployeeTypes.REMOVE_CLIENT_FAILURE, err);

export const addProductRequest = (
  employee_id: number,
  product_id: number
) => action(EmployeeTypes.ADD_PRODUCT_REQUEST, { employee_id, product_id });

export const addProductSuccess = () => action(EmployeeTypes.ADD_PRODUCT_REQUEST);

export const addProductFailure = (err: any) => action(EmployeeTypes.ADD_PRODUCT_FAILURE, err);

export const removeProductRequest = (
  employee_id: number,
  product_id: number
) => action(EmployeeTypes.REMOVE_PRODUCT_REQUEST, { employee_id, product_id });

export const removeProductSuccess = (id: number) => action(EmployeeTypes.REMOVE_PRODUCT_SUCCESS, { id });

export const removeProductFailure = (err: any) => action(EmployeeTypes.REMOVE_PRODUCT_FAILURE, err);
