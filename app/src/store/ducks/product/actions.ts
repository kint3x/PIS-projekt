import { action } from 'typesafe-actions';
import { ProductTypes, ProductModel, ProductData } from './types';
import { ClientProductModel } from '../clientProduct';
import { EmployeeModel } from '../employee/types';

export const loadRequest = (
  id: number | 'all'
) => action(ProductTypes.LOAD_REQUEST, { id });

export const loadSuccess = (
  id: number,
  data: ProductModel | ProductModel[]
) => action(ProductTypes.LOAD_SUCCESS, { id, data });

export const loadFailure = (err: any) => action(ProductTypes.LOAD_FAILURE, err);

export const createRequest = (
  payload: ProductData
) => action(ProductTypes.CREATE_REQUEST, { payload });

export const createSuccess = (
  data: ProductModel
) => action(ProductTypes.CREATE_SUCCESS, { data });

export const createFailure = (err: any) => action(ProductTypes.CREATE_FAILURE, err);

export const updateRequest = (
  id: number,
  payload: ProductData
) => action(ProductTypes.UPDATE_REQUEST, { id, payload });

export const updateSuccess = (
  data: ProductModel
) => action(ProductTypes.UPDATE_SUCCESS, { data });

export const updateFailure = (err: any) => action(ProductTypes.UPDATE_FAILURE, err);

export const removeRequest = (
  id: number
) => action(ProductTypes.REMOVE_REQUEST, { id });

export const removeSuccess = (id: number) => action(ProductTypes.REMOVE_SUCCESS, { id });

export const removeFailure = (err: any) => action(ProductTypes.REMOVE_FAILURE, err);

export const loadEmployeesRequest = (id: number) => action(ProductTypes.LOAD_EMPLOYEES_REQUEST, { id })

export const loadEmplyoeesSuccess = (
  id: number,
  data: EmployeeModel[]
) => action(ProductTypes.LOAD_EMPLOYEES_SUCCESS, { id, data })

export const loadEmployeesFailure = (err: any) => action(ProductTypes.LOAD_EMPLOYEES_FAILURE, err);

export const addEmployeeRequest = (
  product_id: number,
  employee_id: number
) => action(ProductTypes.ADD_EMPLOYEE_REQUEST, { employee_id, product_id });

export const addEmployeeSuccess = (
  data: EmployeeModel[]
) => action(ProductTypes.ADD_EMPLOYEE_SUCCESS, { data });

export const addEmployeeFailure = (err: any) => action(ProductTypes.ADD_EMPLOYEE_FAILURE, err);

export const removeEmployeeRequest = (
  product_id: number,
  employee_id: number
) => action(ProductTypes.REMOVE_EMPLOYEE_REQUEST, { employee_id, product_id });

export const removeEmployeeSuccess = (id: number) => action(ProductTypes.REMOVE_EMPLOYEE_SUCCESS, { id });

export const removeEmployeeFailure = (err: any) => action(ProductTypes.REMOVE_EMPLOYEE_FAILURE, err);

export const loadClientProductsRequest = (id: number) => action(ProductTypes.LOAD_CLIENT_PRODUCTS_REQUEST, { id })

export const loadClientProductsSuccess = (
  id: number,
  data: ClientProductModel[]
) => action(ProductTypes.LOAD_CLIENT_PRODUCTS_SUCCESS, { id, data })

export const loadClientProductFailure = (err: any) => action(ProductTypes.LOAD_CLIENT_PRODUCTS_FAILURE, err);

export const addClientRequest = (
  product_id: number,
  client_id: number,
  employee_id: number
) => action(ProductTypes.ADD_CLIENT_REQUEST, { product_id, client_id, employee_id });

export const addClientSuccess = (
  data: ClientProductModel
) => action(ProductTypes.ADD_CLIENT_SUCCESS, { data });

export const addClientFailure = (err: any) => action(ProductTypes.ADD_CLIENT_FAILURE, err);

export const removeClientRequest = (
  product_id: number,
  client_id: number
) => action(ProductTypes.REMOVE_CLIENT_REQUEST, { product_id, client_id });

export const removeClientSuccess = (
  data: ClientProductModel
) => action(ProductTypes.REMOVE_CLIENT_SUCCESS, { data });

export const removeClientFailure = (err: any) => action(ProductTypes.REMOVE_CLIENT_FAILURE, err);

export const changeClientEmployeeRequest = (
  product_id: number,
  client_id: number,
  employee_id: number
) => action(ProductTypes.CHANGE_CLIENT_EMPLOYEE_REQUEST, { product_id, client_id, employee_id });

export const changeClientEmployeeSuccess = (
  data: ClientProductModel
) => action(ProductTypes.CHANGE_CLIENT_EMPLOYEE_SUCCESS, { data });

export const changeClientEmployeeFailure = (err: any) => action(ProductTypes.CHANGE_CLIENT_EMPLOYEE_FAILURE, err);
