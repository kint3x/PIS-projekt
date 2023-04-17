export enum EmployeeTypes {
  LOAD_REQUEST = '@employee/LOAD_REQUEST',
  LOAD_SUCCESS = '@employee/LOAD_SUCCESS',
  LOAD_FAILURE = '@employee/LOAD_FAILURE'
}

enum EmployeeType {
  EmployeeType_1,
  EmployeeType_2,
  EmployeeType_3
}

export interface EmployeeModel {
  id: number,
  username: string,
  password: string,
  type: EmployeeType
  // meetings: 
  phone: string,
  address: string,
  date: Date,
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
