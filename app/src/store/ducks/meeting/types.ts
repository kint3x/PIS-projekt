import { ClientData } from "../client/types"
import { EmployeeData } from "../employee/types"

export enum MeetingTypees {
  
};

export interface MeetingData {
  subject: string,
  start: string,
  end: string,
  notes: string,
  employeeIds: number[],
  clientId: number[],
  authorId: number[]
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