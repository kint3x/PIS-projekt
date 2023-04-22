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
  REMOVE_FAILURE = '@client/REMOVE_FAILURE'
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
  readonly error: boolean
}
