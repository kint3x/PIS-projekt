import { Reducer, AnyAction } from 'redux';
import { ClientData, ClientModel, ClientState, ClientTypes } from './types';
import { EmployeeState } from '../employee/types';
import { meetingsModelToState } from '../meeting';
import { employeeModelToState } from '../employee';
import { clientProductToState } from '../clientProduct';

export const INITIAL_STATE: ClientState = {
  data: {},
  loading: false,
  errMsg: '',
  error: false,
  employees: {},
  meetings: {},
  clientProducts: {}
};

export const clientModelToState = (
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
    case ClientTypes.ADD_EMPLOYEE_REQUEST:
    case ClientTypes.REMOVE_EMPLOYEE_REQUEST:
    case ClientTypes.LOAD_EMPLOYEES_REQUEST:
    case ClientTypes.LOAD_MEETINGS_REQUEST:
    case ClientTypes.LOAD_CLIENT_PRODUCTS_REQUEST:
    case ClientTypes.ADD_PRODUCT_REQUEST:
    case ClientTypes.REMOVE_PRODUCT_REQUEST:
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
    case ClientTypes.LOAD_CLIENT_PRODUCTS_SUCCESS:
      const clientProducts = action.payload.data;
      return {
        ...state,
        loading: false,
        error: false,
        clientProducts: clientProducts.reduce(clientProductToState, state.clientProducts)
      };
    case ClientTypes.LOAD_MEETINGS_SUCCESS:
      const meetings = action.payload.data;
      return {
        ...state,
        loading: false,
        error: false,
        meetings: meetings.reduce(meetingsModelToState, state.meetings)
      };
    case ClientTypes.LOAD_EMPLOYEES_SUCCESS:
      const employees = action.payload.data;
      return {
        ...state,
        loading: false,
        error: false,
        employees: employees.reduce(employeeModelToState, state.employees)
      };
    case ClientTypes.REMOVE_EMPLOYEE_SUCCESS:
      var { id } = action.payload;
      delete state.employees[id];
      return {
        ...state,
        loading: false,
        error: false
      }
    case ClientTypes.REMOVE_SUCCESS:
      var { id } = action.payload;
      delete state.data[id];
      return {
        ...state,
        loading: false,
        error: false
      };
    case ClientTypes.ADD_PRODUCT_SUCCESS:
    case ClientTypes.ADD_EMPLOYEE_SUCCESS:
    case ClientTypes.REMOVE_PRODUCT_SUCCESS:
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
    case ClientTypes.ADD_EMPLOYEE_FAILURE:
    case ClientTypes.REMOVE_EMPLOYEE_FAILURE:
    case ClientTypes.LOAD_EMPLOYEES_FAILURE:
    case ClientTypes.LOAD_MEETINGS_FAILURE:
    case ClientTypes.ADD_PRODUCT_FAILURE:
    case ClientTypes.REMOVE_PRODUCT_FAILURE:
    case ClientTypes.LOAD_CLIENT_PRODUCTS_FAILURE:
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
