import { ClientModel } from "../client/types"
import { MeetingModel } from "../meeting/types"
import { ProductModel } from "../product/types"

export enum EmployeeTypes {
  AUTH_REQUEST = '@employee/AUTH_REQUEST',
  AUTH_SUCCESS = '@employee/AUTH_SUCCESS',
  AUTH_FAILURE = '@employee/AUTH_FAILURE',
  LOAD_REQUEST = '@employee/LOAD_REQUEST',
  LOAD_SUCCESS = '@employee/LOAD_SUCCESS',
  LOAD_FAILURE = '@employee/LOAD_FAILURE',
  CREATE_REQUEST = '@employee/CREATE_REQUEST',
  CREATE_SUCCESS = '@employee/CREATE_SUCCESS',
  CREATE_FAILURE = '@employee/CREATE_FAILURE',
  UPDATE_REQUEST = '@employee/UPDATE_REQUEST',
  UPDATE_SUCCESS = '@employee/UPDATE_SUCCESS',
  UPDATE_FAILURE = '@employee/UPDATE_FAILURE',
  REMOVE_REQUEST = '@employee/REMOVE_REQUEST',
  REMOVE_SUCCESS = '@employee/REMOVE_SUCCESS',
  REMOVE_FAILURE = '@employee/REMOVE_FAILURE',
  LOAD_MEETINGS_REQUEST = '@employee/LOAD_MEETINGS_REQUEST',
  LOAD_MEETINGS_SUCCESS = '@employee/LOAD_MEETINGS_SUCCESS',
  LOAD_MEETINGS_FAILURE = '@employee/LOAD_MEETINGS_FAILURE',
  LOAD_PRODUCTS_REQUEST = '@employee/LOAD_PRODUCTS_REQUEST',
  LOAD_PRODUCTS_SUCCESS = '@employee/LOAD_PRODUCTS_SUCCESS',
  LOAD_PRODUCTS_FAILURE = '@employee/LOAD_PRODUCTS_FAILURE',
  LOAD_CLIENTS_REQUEST = '@employee/LOAD_CLIENTS_REQUEST',
  LOAD_CLIENTS_SUCCESS = '@employee/LOAD_CLIENTS_SUCCESS',
  LOAD_CLIENTS_FAILURE = '@employee/LOAD_CLIENTS_FAILURE',
  ADD_CLIENT_REQUEST = '@employee/ADD_CLIENT_REQUEST',
  ADD_CLIENT_SUCCESS = '@employee/ADD_CLIENT_SUCCESS',
  ADD_CLIENT_FAILURE = '@employee/ADD_CLIENT_FAILURE',
  REMOVE_CLIENT_REQUEST = '@employee/REMOVE_CLIENT_REQUEST',
  REMOVE_CLIENT_SUCCESS = '@employee/REMOVE_CLIENT_SUCCESS',
  REMOVE_CLIENT_FAILURE = '@employee/REMOVE_CLIENT_FAILURE',
  ADD_PRODUCT_REQUEST = '@employee/ADD_PRODUCT_REQUEST',
  ADD_PRODUCT_SUCCESS = '@employee/ADD_PRODUCT_SUCCESS',
  ADD_PRODUCT_FAILURE = '@employee/ADD_PRODUCT_FAILURE',
  REMOVE_PRODUCT_REQUEST = '@employee/REMOVE_PRODUCT_REQUEST',
  REMOVE_PRODUCT_SUCCESS = '@employee/REMOVE_PRODUCT_SUCCESS',
  REMOVE_PRODUCT_FAILURE = '@employee/REMOVE_PRODUCT_FAILURE',
}

export interface EmployeeData {
  username: string,
  password: string,
  type: string,
  phone: string,
  address: string,
  dob: string,
  name: string,
  surname: string,
  email: string,
  image: string
}

export interface EmployeeModel {
  id: number,
  username: string,
  password: string,
  type: string,
  phone: string,
  address: string,
  dob: string,
  name: string,
  surname: string,
  email: string,
  image: string
}

export interface EmployeeState {
  readonly token: string | null;
  readonly data: { [id: number]: EmployeeModel },
  readonly loading: boolean,
  readonly errMsg: string,
  readonly error: boolean,
  readonly meetings: { [id: number]: MeetingModel },
  readonly products: { [id: number]: ProductModel },
  readonly clients: { [id: number]: ClientModel }
}