import { ClientProductModel } from "../clientProduct"
import { EmployeeModel } from "../employee/types"

export enum ProductTypes {
  LOAD_REQUEST = '@product/LOAD_REQUEST',
  LOAD_SUCCESS = '@product/LOAD_SUCCESS',
  LOAD_FAILURE = '@product/LOAD_FAILURE',
  CREATE_REQUEST = '@product/CREATE_REQUEST',
  CREATE_SUCCESS = '@product/CREATE_SUCCESS',
  CREATE_FAILURE = '@product/CREATE_FAILURE',
  UPDATE_REQUEST = '@product/UPDATE_REQUEST',
  UPDATE_SUCCESS = '@product/UPDATE_SUCCESS',
  UPDATE_FAILURE = '@product/UPDATE_FAILURE',
  REMOVE_REQUEST = '@product/REMOVE_REQUEST',
  REMOVE_SUCCESS = '@product/REMOVE_SUCCESS',
  REMOVE_FAILURE = '@product/REMOVE_FAILURE',
  LOAD_CLIENT_PRODUCTS_REQUEST = '@product/LOAD_CLIENT_PRODUCTS_REQUEST',
  LOAD_CLIENT_PRODUCTS_SUCCESS = '@product/LOAD_CLIENT_PRODUCTS_SUCCESS',
  LOAD_CLIENT_PRODUCTS_FAILURE = '@product/LOAD_CLIENT_PRODUCTS_FAILURE',
  ADD_CLIENT_REQUEST = '@product/ADD_CLIENT_REQUEST',
  ADD_CLIENT_SUCCESS = '@product/ADD_CLIENT_SUCCESS',
  ADD_CLIENT_FAILURE = '@product/ADD_CLIENT_FAILURE',
  REMOVE_CLIENT_REQUEST = '@product/REMOVE_CLIENT_REQUEST',
  REMOVE_CLIENT_SUCCESS = '@product/REMOVE_CLIENT_SUCCESS',
  REMOVE_CLIENT_FAILURE = '@product/REMOVE_CLIENT_FAILURE',
  LOAD_EMPLOYEES_REQUEST = '@product/LOAD_EMPLOYEES_REQUEST',
  LOAD_EMPLOYEES_SUCCESS = '@product/LOAD_EMPLOYEES_SUCCESS',
  LOAD_EMPLOYEES_FAILURE = '@product/LOAD_EMPLOYEES_FAILURE',
  ADD_EMPLOYEE_REQUEST = '@product/ADD_EMPLOYEE_REQUEST',
  ADD_EMPLOYEE_SUCCESS = '@product/ADD_EMPLOYEE_SUCCESS',
  ADD_EMPLOYEE_FAILURE = '@product/ADD_EMPLOYEE_FAILURE',
  REMOVE_EMPLOYEE_REQUEST = '@product/REMOVE_EMPLOYEE_REQUEST',
  REMOVE_EMPLOYEE_SUCCESS = '@product/REMOVE_EMPLOYEE_SUCCESS',
  REMOVE_EMPLOYEE_FAILURE = '@product/REMOVE_EMPLOYEE_FAILURE',
  CHANGE_CLIENT_EMPLOYEE_REQUEST = '@product/CHANGE_CLIENT_EMPLOYEE_REQUEST',
  CHANGE_CLIENT_EMPLOYEE_SUCCESS = '@product/CHANGE_CLIENT_EMPLOYEE_SUCCESS',
  CHANGE_CLIENT_EMPLOYEE_FAILURE = '@product/CHANGE_CLIENT_EMPLOYEE_FAILURE'
}

export interface ProductData {
  name: string
}

export interface ProductModel {
  id: number,
  name: string
}

export interface ProductState {
  readonly data: { [id: number]: ProductModel },
  readonly loading: boolean,
  readonly error: boolean,
  readonly errMsg: string,
  readonly employees: { [id: number]: EmployeeModel}
  readonly clientProducts: { [id: number]: ClientProductModel}
}
