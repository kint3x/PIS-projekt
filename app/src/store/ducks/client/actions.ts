import { action } from 'typesafe-actions';
import { ClientTypes, ClientData, ClientModel } from './types';

export const loadRequest = (
  id: number | 'all'
) => action(ClientTypes.LOAD_REQUEST, { id });

export const loadSuccess = (
  id: number,
  data: ClientModel | ClientModel[]
) => action(ClientTypes.LOAD_SUCCESS, { id, data });

export const loadFailure = (err: any) => action(ClientTypes.LOAD_FAILURE, err);

export const createRequest = (
  payload: ClientData
) => action(ClientTypes.CREATE_REQUEST, { payload });

export const createSuccess = () => action(ClientTypes.CREATE_SUCCESS);

export const createFailure = (err: any) => action(ClientTypes.CREATE_FAILURE, err);

export const updateRequest = (
  id: number,
  payload: ClientData
) => action(ClientTypes.UPDATE_REQUEST, { id, payload });

export const updateSuccess = () => action(ClientTypes.UPDATE_SUCCESS);

export const updateFailure = (err: any) => action(ClientTypes.UPDATE_FAILURE, err);

export const removeRequest = (
  id: number
) => action(ClientTypes.REMOVE_REQUEST, { id });

export const removeSuccess = () => action(ClientTypes.REMOVE_SUCCESS);

export const removeFailure = (err: any) => action(ClientTypes.REMOVE_FAILURE, err);
