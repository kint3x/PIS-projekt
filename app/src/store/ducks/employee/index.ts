import { Reducer, AnyAction } from 'redux';
import { EmployeeModel, EmployeeState, EmployeeTypes } from './types';
import { meetingsModelToState } from '../meeting';
import { clientModelToState } from '../client';
import { productModelToState } from '../product';

export const INITIAL_STATE: EmployeeState = {
  data: {},
  loading: false,
  errMsg: '',
  error: false,
  meetings: {},
  products: {},
  clients: {},
};

export const employeeModelToState = (
  data: { [key: number]: EmployeeModel },
  item: EmployeeModel
) => {
  return {
    ...data,
    [item.id]: {
      id: item.id,
      username: item.username,
      password: item.password,
      type: item.type,
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

const reducer: Reducer<EmployeeState> = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case EmployeeTypes.CREATE_REQUEST:
    case EmployeeTypes.UPDATE_REQUEST:
    case EmployeeTypes.REMOVE_REQUEST:
    case EmployeeTypes.LOAD_MEETINGS_REQUEST:
    case EmployeeTypes.LOAD_PRODUCTS_REQUEST:
    case EmployeeTypes.LOAD_CLIENTS_REQUEST:
    case EmployeeTypes.ADD_CLIENT_REQUEST:
    case EmployeeTypes.ADD_PRODUCT_REQUEST:
    case EmployeeTypes.REMOVE_PRODUCT_REQUEST:
    case EmployeeTypes.REMOVE_CLIENT_REQUEST:
    case EmployeeTypes.LOAD_REQUEST:
      return { ...state, loading: true }
    case EmployeeTypes.ADD_CLIENT_SUCCESS:
    case EmployeeTypes.LOAD_CLIENTS_SUCCESS:
      var clients = action.payload.data;
      return {
        ...state,
        loading: false,
        error: false,
        clients: clients.reduce(clientModelToState, state.clients)
      }
    case EmployeeTypes.ADD_PRODUCT_SUCCESS:
    case EmployeeTypes.LOAD_PRODUCTS_SUCCESS:
      const products = action.payload.data;
      return {
        ...state,
        loading: false,
        error: false,
        products: products.reduce(productModelToState, state.products)
      }
    case EmployeeTypes.LOAD_MEETINGS_SUCCESS:
      const meetings = action.payload.data;
      return {
        ...state,
        loading: false,
        error: false,
        meetings: meetings.reduce(meetingsModelToState, state.meetings)
      }
    case EmployeeTypes.LOAD_SUCCESS:
      if (action.payload.id === 'all') {
        const employees = action.payload.data;
        return {
          ...state,
          loading: false,
          error: false,
          data: employees.reduce(employeeModelToState, state.data)
        };
      } else {
        return {
          ...state,
          loading: false,
          error: false,
          data: employeeModelToState(state.data, action.payload.data)
        };
      }
    case EmployeeTypes.REMOVE_CLIENT_SUCCESS:
      var { id } = action.payload;
      delete state.clients[id];
      return {
        ...state,
        loading: false,
        error: false
      }
    case EmployeeTypes.REMOVE_PRODUCT_SUCCESS:
      var { id } = action.payload;
      delete state.products[id];
      return {
        ...state,
        loading: false,
        error: false
      };
    case EmployeeTypes.REMOVE_SUCCESS:
      var { id } = action.payload;
      delete state.data[id];
      return {
        ...state,
        loading: false,
        error: false
      };
    case EmployeeTypes.CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: employeeModelToState(state.data, action.payload.data)
      };
    case EmployeeTypes.UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: employeeModelToState(state.data, action.payload.data)
      };
    case EmployeeTypes.LOAD_PRODUCTS_FAILURE:
    case EmployeeTypes.REMOVE_FAILURE:
    case EmployeeTypes.ADD_PRODUCT_FAILURE:
    case EmployeeTypes.REMOVE_PRODUCT_FAILURE:
    case EmployeeTypes.ADD_CLIENT_FAILURE:
    case EmployeeTypes.LOAD_MEETINGS_FAILURE:
    case EmployeeTypes.LOAD_CLIENTS_FAILURE:
    case EmployeeTypes.LOAD_FAILURE:
    case EmployeeTypes.UPDATE_FAILURE:
    case EmployeeTypes.CREATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errMsg: action.payload
      }
    default:
      return state;
  }
};

export default reducer;
