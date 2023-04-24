import { action } from 'typesafe-actions';
import { ClientTypes, ClientData, ClientModel } from './types';
import { MeetingData } from '../meeting/types';
import { EmployeeModel } from '../employee/types';
import { ClientProductModel } from '../clientProduct';

export const loadRequest = (
  id: number | 'all'
) => action(ClientTypes.LOAD_REQUEST, { id });

export const loadSuccess = (
  id: number,
  data: ClientModel | ClientModel[]
) => action(ClientTypes.LOAD_SUCCESS, { id, data });

export const loadFailure = (err: any) => action(ClientTypes.LOAD_FAILURE, err);

export const createRequest = (
  payload: ClientData
) => action(ClientTypes.CREATE_REQUEST, { payload });

export const createSuccess = () => action(ClientTypes.CREATE_SUCCESS);

export const createFailure = (err: any) => action(ClientTypes.CREATE_FAILURE, err);

export const updateRequest = (
  id: number,
  payload: ClientData
) => action(ClientTypes.UPDATE_REQUEST, { id, payload });

export const updateSuccess = () => action(ClientTypes.UPDATE_SUCCESS);

export const updateFailure = (err: any) => action(ClientTypes.UPDATE_FAILURE, err);

export const removeRequest = (
  id: number
) => action(ClientTypes.REMOVE_REQUEST, { id });

export const removeSuccess = (id: number) => action(ClientTypes.REMOVE_SUCCESS, { id });

export const removeFailure = (err: any) => action(ClientTypes.REMOVE_FAILURE, err);

export const loadMeetingsRequest = (id: number) => action(ClientTypes.LOAD_MEETINGS_REQUEST, { id });

export const loadMeetingsSuccess = (
  id: number,
  data: MeetingData[]
) => action(ClientTypes.LOAD_MEETINGS_SUCCESS, { id, data })

export const loadMeetingsFailure = (err: any) => action(ClientTypes.LOAD_MEETINGS_FAILURE, err);

export const loadEmployeesRequest = (id: number) => action(ClientTypes.LOAD_EMPLOYEES_REQUEST, { id })

export const loadEmplyoeesSuccess = (
  id: number,
  data: EmployeeModel[]
) => action(ClientTypes.LOAD_EMPLOYEES_SUCCESS, { id, data })

export const loadEmployeesFailure = (err: any) => action(ClientTypes.LOAD_EMPLOYEES_FAILURE, err);

export const addEmployeeRequest = (
  client_id: number,
  employee_id: number
) => action(ClientTypes.ADD_EMPLOYEE_REQUEST, { employee_id, client_id });

export const addEmployeeSuccess = () => action(ClientTypes.ADD_EMPLOYEE_SUCCESS);

export const addEmployeeFailure = (err: any) => action(ClientTypes.ADD_EMPLOYEE_FAILURE, err);

export const removeEmployeeRequest = (
  client_id: number,
  employee_id: number
) => action(ClientTypes.REMOVE_EMPLOYEE_REQUEST, { employee_id, client_id });

export const removeEmployeeSuccess = (id: number) => action(ClientTypes.REMOVE_EMPLOYEE_SUCCESS, { id });

export const removeEmployeeFailure = (err: any) => action(ClientTypes.REMOVE_EMPLOYEE_FAILURE, err);

export const loadClientProductsRequest = (id: number) => action(ClientTypes.LOAD_CLIENT_PRODUCTS_REQUEST, { id })

export const loadClientProductsSuccess = (
  id: number,
  data: ClientProductModel[]
) => action(ClientTypes.LOAD_CLIENT_PRODUCTS_SUCCESS, { id, data })

export const loadClientProductFailure = (err: any) => action(ClientTypes.LOAD_CLIENT_PRODUCTS_FAILURE, err);

export const addProductRequest = (
  client_id: number,
  product_id: number
) => action(ClientTypes.ADD_PRODUCT_REQUEST, { product_id, client_id });

export const addProductSuccess = () => action(ClientTypes.ADD_PRODUCT_SUCCESS);

export const addProductFailure = (err: any) => action(ClientTypes.ADD_PRODUCT_FAILURE, err);

export const removeProductRequest = (
  client_id: number,
  product_id: number
) => action(ClientTypes.REMOVE_PRODUCT_REQUEST, { client_id, product_id });

export const removeProductSuccess = (id: number) => action(ClientTypes.REMOVE_PRODUCT_SUCCESS, { id });

export const removeProductFailure = (err: any) => action(ClientTypes.REMOVE_PRODUCT_FAILURE, err);
