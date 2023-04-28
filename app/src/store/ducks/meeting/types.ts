import { ClientData, ClientModel } from "../client/types"
import { EmployeeData } from "../employee/types"

export enum MeetingTypes {
  LOAD_REQUEST = '@meeting/LOAD_REQUEST',
  LOAD_SUCCESS = '@meeting/LOAD_SUCCESS',
  LOAD_FAILURE = '@meeting/LOAD_FAILURE',
  CREATE_REQUEST = '@meeting/CREATE_REQUEST',
  CREATE_SUCCESS = '@meeting/CREATE_SUCCESS',
  CREATE_FAILURE = '@meeting/CREATE_FAILURE',
  UPDATE_REQUEST = '@meeting/UPDATE_REQUEST',
  UPDATE_SUCCESS = '@meeting/UPDATE_SUCCESS',
  UPDATE_FAILURE = '@meeting/UPDATE_FAILURE',
  REMOVE_REQUEST = '@meeting/REMOVE_REQUEST',
  REMOVE_SUCCESS = '@meeting/REMOVE_SUCCESS',
  REMOVE_FAILURE = '@meeting/REMOVE_FAILURE',
  ADD_EMPLOYEE_REQUEST = '@meeting/ADD_EMPLOYEE_REQUEST',
  ADD_EMPLOYEE_SUCCESS = '@meeting/ADD_EMPLOYEE_SUCCESS',
  ADD_EMPLOYEE_FAILURE = '@meeting/ADD_EMPLOYEE_FAILURE',
  REMOVE_EMPLOYEE_REQUEST = '@meeting/REMOVE_EMPLOYEE_REQUEST',
  REMOVE_EMPLOYEE_SUCCESS = '@meeting/REMOVE_EMPLOYEE_SUCCESS',
  REMOVE_EMPLOYEE_FAILURE = '@meeting/REMOVE_EMPLOYEE_FAILURE'
};

export interface MeetingData {
  subject: string,
  start: string,
  end: string,
  notes: string,
  employeeIds: number[],
  clientId: number,
  authorId: number
}

export interface MeetingModel {
  id: number,
  subject: string,
  start: string,
  end: string,
  notes: string,
  employees: EmployeeData[],
  client: ClientModel,
  author: EmployeeData
}

export interface MeetingState {
  readonly data: { [id: number] : MeetingModel },
  readonly loading: boolean,
  readonly errMsg: string,
  readonly error: boolean
}