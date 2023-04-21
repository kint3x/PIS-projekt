export enum EmployeeTypes {
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
  REMOVE_FAILURE = '@employee/REMOVE_FAILURE'
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
  // meetings: ...
  phone: string,
  address: string,
  dob: string,
  name: string,
  surname: string,
  email: string,
  image: string
}

export interface EmployeeState {
  readonly data: { [id: number]: EmployeeModel},
  readonly loading: boolean,
  readonly errMsg: string, 
  readonly error: boolean,
}
