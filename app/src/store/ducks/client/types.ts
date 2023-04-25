import { ClientProductModel } from "../clientProduct"
import { EmployeeModel } from "../employee/types"
import { MeetingModel } from "../meeting/types"

export enum ClientTypes {
  LOAD_REQUEST = '@client/LOAD_REQUEST',
  LOAD_SUCCESS = '@client/LOAD_SUCCESS',
  LOAD_FAILURE = '@client/LOAD_FAILURE',
  CREATE_REQUEST = '@client/CREATE_REQUEST',
  CREATE_SUCCESS = '@client/CREATE_SUCCESS',
  CREATE_FAILURE = '@client/CREATE_FAILURE',
  UPDATE_REQUEST = '@client/UPDATE_REQUEST',
  UPDATE_SUCCESS = '@client/UPDATE_SUCCESS',
  UPDATE_FAILURE = '@client/UPDATE_FAILURE',
  REMOVE_REQUEST = '@client/REMOVE_REQUEST',
  REMOVE_SUCCESS = '@client/REMOVE_SUCCESS',
  REMOVE_FAILURE = '@client/REMOVE_FAILURE',
  LOAD_MEETINGS_REQUEST = '@client/LOAD_MEETINGS_REQUEST',
  LOAD_MEETINGS_SUCCESS = '@client/LOAD_MEETINGS_SUCCESS',
  LOAD_MEETINGS_FAILURE = '@client/LOAD_MEETINGS_FAILURE',
  LOAD_CLIENT_PRODUCTS_REQUEST = '@client/LOAD_CLIENT_PRODUCTS_REQUEST',
  LOAD_CLIENT_PRODUCTS_SUCCESS = '@client/LOAD_CLIENT_PRODUCTS_SUCCESS',
  LOAD_CLIENT_PRODUCTS_FAILURE = '@client/LOAD_CLIENT_PRODUCTS_FAILURE',
  ADD_PRODUCT_REQUEST = '@client/ADD_PRODUCT_REQUEST',
  ADD_PRODUCT_SUCCESS = '@client/ADD_PRODUCT_SUCCESS',
  ADD_PRODUCT_FAILURE = '@client/ADD_PRODUCT_FAILURE',
  REMOVE_PRODUCT_REQUEST = '@client/REMOVE_PRODUCT_REQUEST',
  REMOVE_PRODUCT_SUCCESS = '@client/REMOVE_PRODUCT_SUCCESS',
  REMOVE_PRODUCT_FAILURE = '@client/REMOVE_PRODUCT_FAILURE',
  LOAD_EMPLOYEES_REQUEST = '@client/LOAD_EMPLOYEES_REQUEST',
  LOAD_EMPLOYEES_SUCCESS = '@client/LOAD_EMPLOYEES_SUCCESS',
  LOAD_EMPLOYEES_FAILURE = '@client/LOAD_EMPLOYEES_FAILURE',
  ADD_EMPLOYEE_REQUEST = '@client/ADD_EMPLOYEE_REQUEST',
  ADD_EMPLOYEE_SUCCESS = '@client/ADD_EMPLOYEE_SUCCESS',
  ADD_EMPLOYEE_FAILURE = '@client/ADD_EMPLOYEE_FAILURE',
  REMOVE_EMPLOYEE_REQUEST = '@client/REMOVE_EMPLOYEE_REQUEST',
  REMOVE_EMPLOYEE_SUCCESS = '@client/REMOVE_EMPLOYEE_SUCCESS',
  REMOVE_EMPLOYEE_FAILURE = '@client/REMOVE_EMPLOYEE_FAILURE'
}

export interface ClientData {
  notes: string,
  phone: string,
  address: string,
  dob: string,
  name: string,
  surname: string,
  email: string,
  image: string
}

export interface ClientModel {
  id: number,
  notes: string,
  phone: string,
  address: string,
  dob: string,
  name: string,
  surname: string,
  email: string,
  image: string
}

export interface ClientState {
  readonly data: { [id: number]: ClientModel },
  readonly loading: boolean,
  readonly errMsg: string,
  readonly error: boolean,
  readonly meetings: { [id: number]: MeetingModel},
  readonly employees: { [id: number]: EmployeeModel}
  readonly clientProducts: { [id: number]: ClientProductModel}
}
