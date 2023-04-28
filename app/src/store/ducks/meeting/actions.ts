import { action } from 'typesafe-actions';
import { MeetingModel, MeetingData, MeetingTypes } from './types';
import { EmployeeModel } from '../employee/types';

export const loadRequest = (
  id: number | 'all'
) => action(MeetingTypes.LOAD_REQUEST, { id });

export const loadSuccess = (
  id: number,
  data: MeetingModel | MeetingModel[]
) => action(MeetingTypes.LOAD_SUCCESS, {id, data});

export const loadFailure = (err: any) => action(MeetingTypes.LOAD_FAILURE, err);

export const createRequest = (
  payload: MeetingData
) => action(MeetingTypes.CREATE_REQUEST, { payload });

export const createSuccess = (
  data: MeetingData
) => action(MeetingTypes.CREATE_SUCCESS, { data });

export const createFailure = (err: any) => action(MeetingTypes.CREATE_FAILURE, err);

export const updateRequest = (
  id: number,
  payload: MeetingData
) => action(MeetingTypes.UPDATE_REQUEST, { id, payload });

export const updateSuccess = (
  data: MeetingModel
) => action(MeetingTypes.UPDATE_SUCCESS, { data });

export const updateFailure = (err: any) => action(MeetingTypes.UPDATE_FAILURE, err);

export const removeRequest = (
  id: number
) => action(MeetingTypes.REMOVE_REQUEST, { id })

export const removeSuccess = (id: number) => action(MeetingTypes.REMOVE_SUCCESS, { id });

export const removeFailure = (err: any) => action(MeetingTypes.REMOVE_EMPLOYEE_FAILURE, err);

export const addEmployeeRequest = (
  meeting_id: number,
  employee_id: number
) => action(MeetingTypes.ADD_EMPLOYEE_REQUEST, { meeting_id, employee_id });

export const addEmployeeSuccess = (
  data: MeetingModel
) => action(MeetingTypes.ADD_EMPLOYEE_SUCCESS, { data });

export const addEmployeeFailure = (err: any) => action(MeetingTypes.ADD_EMPLOYEE_FAILURE, err);

export const removeEmployeeRequest = (
  meeting_id: number,
  employee_id: number
) => action(MeetingTypes.REMOVE_EMPLOYEE_REQUEST, { meeting_id, employee_id });

export const removeEmployeeSuccess = (
  data: MeetingModel
) => action(MeetingTypes.REMOVE_EMPLOYEE_SUCCESS, { data });

export const removeEmployeeFailure = (err: any) => action(MeetingTypes.REMOVE_EMPLOYEE_FAILURE, err);
