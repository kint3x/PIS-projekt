import { Reducer, AnyAction } from 'redux';
import { ClientData, ClientModel, ClientState, ClientTypes } from './types';
import { EmployeeState } from '../employee/types';

export const INITIAL_STATE: ClientState = {
  data: {},
  loading: false,
  errMsg: '',
  error: false
};

const clientModelToState = (
  data: { [key: number]: ClientModel },
  item: ClientModel
) => {
  return {
    ...data,
    [item.id]: {
      id: item.id,
      notes: item.notes,
      phone: item.phone,
      address: item.address,
      dob: item.dob,
      name: item.name,
      surname: item.surname,
      email: item.email,
      image: item.image,
    }
  }
}

const reducer: Reducer<ClientState> = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case ClientTypes.CREATE_REQUEST:
    case ClientTypes.UPDATE_REQUEST:
    case ClientTypes.REMOVE_REQUEST:
    case ClientTypes.LOAD_REQUEST:
      return { ...state, loading: true }
    case ClientTypes.LOAD_SUCCESS:
      if (action.payload.id === 'all') {
        const clients = action.payload.data;
        return {
          ...state,
          loading: false,
          error: false,
          data: clients.reduce(clientModelToState, state.data)
        };
      } else {
        return {
          ...state,
          loading: false,
          error: false,
          data: clientModelToState(state.data, action.payload.data)
        };
      }
    case ClientTypes.REMOVE_SUCCESS:
    case ClientTypes.UPDATE_SUCCESS:
    case ClientTypes.CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false
      }
    case ClientTypes.REMOVE_FAILURE:
    case ClientTypes.LOAD_FAILURE:
    case ClientTypes.UPDATE_FAILURE:
    case ClientTypes.CREATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errMsg: action.payload
      }
    default:
      return state;
  }
}

export default reducer;
