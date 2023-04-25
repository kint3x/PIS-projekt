import { ClientData } from "../client/types"
import { EmployeeData } from "../employee/types"

export enum MeetingTypes {
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
  ADD_EMPLOYEE_REQUEST = '@employee/ADD_EMPLOYEE_REQUEST',
  ADD_EMPLOYEE_SUCCESS = '@employee/ADD_EMPLOYEE_SUCCESS',
  ADD_EMPLOYEE_FAILURE = '@employee/ADD_EMPLOYEE_FAILURE',
  REMOVE_EMPLOYEE_REQUEST = '@employee/REMOVE_EMPLOYEE_REQUEST',
  REMOVE_EMPLOYEE_SUCCESS = '@employee/REMOVE_EMPLOYEE_SUCCESS',
  REMOVE_EMPLOYEE_FAILURE = '@employee/REMOVE_EMPLOYEE_FAILURE'
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
  client: ClientData,
  author: EmployeeData
}

export interface MeetingState {
  readonly data: { [id: number] : MeetingModel },
  readonly loading: boolean,
  readonly errMsg: string,
  readonly error: boolean
}