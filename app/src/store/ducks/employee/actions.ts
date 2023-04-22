import { action } from 'typesafe-actions';
import { EmployeeTypes, EmployeeModel, EmployeeData } from './types';

export const loadRequest = (
  id: number | 'all',
) => action(EmployeeTypes.LOAD_REQUEST, { id });

export const loadSuccess = (
  id: number,
  data: EmployeeModel | EmployeeModel[]
) => action(EmployeeTypes.LOAD_SUCCESS, { id, data });

export const loadFailure = (err: any) => action(EmployeeTypes.LOAD_FAILURE, err);

export const createRequest = (
  payload: EmployeeData
) => action(EmployeeTypes.CREATE_REQUEST, { payload });

export const createSuccess = () => action(EmployeeTypes.CREATE_SUCCESS);

export const createFailure = (err: any) => action(EmployeeTypes.CREATE_FAILURE, err);

export const updateRequest = (
  id: number,
  payload: EmployeeData
) => action(EmployeeTypes.UPDATE_REQUEST, { id, payload });

export const updateSuccess = () => action(EmployeeTypes.UPDATE_SUCCESS);

export const updateFailure = (err: any) => action(EmployeeTypes.UPDATE_FAILURE, err);

export const removeRequest = (
  id: number
) => action(EmployeeTypes.REMOVE_REQUEST, { id });

export const removeSuccess = () => action(EmployeeTypes.REMOVE_SUCCESS);

export const removeFailure = (err: any) => action(EmployeeTypes.REMOVE_FAILURE, err);
