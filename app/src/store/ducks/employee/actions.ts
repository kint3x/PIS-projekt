import { action } from 'typesafe-actions';
import { EmployeeTypes, EmployeeModel } from './types';

export const loadRequest = (
  id: number | 'all',
) => action(EmployeeTypes.LOAD_REQUEST, id);

export const loadSuccess = (
  id: number,
  data: EmployeeModel | EmployeeModel[]
) => action(EmployeeTypes.LOAD_SUCCESS, { id, data });

export const loadFailure = (err: any) => action(EmployeeTypes.LOAD_FAILURE, err);
