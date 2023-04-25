import { Reducer, AnyAction } from 'redux';
import { ProductModel, ProductState, ProductTypes } from './types';
import { clientProductToState } from '../clientProduct';
import { employeeModelToState } from '../employee';

export const productModelToState = (
  data: { [key: number]: ProductModel },
  item: ProductModel
) => {
  return {
    ...data,
    [item.id]: {
      id: item.id,
      name: item.name
    }
  }
}

export const INITIAL_STATE: ProductState = {
  data: {},
  loading: false,
  errMsg: '',
  error: false,
  employees: {},
  clientProducts: {}
};

const reducer: Reducer<ProductState> = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case ProductTypes.LOAD_REQUEST:
    case ProductTypes.CREATE_REQUEST:
    case ProductTypes.UPDATE_REQUEST:
    case ProductTypes.REMOVE_REQUEST:
    case ProductTypes.LOAD_CLIENT_PRODUCTS_REQUEST:
    case ProductTypes.ADD_CLIENT_REQUEST:
    case ProductTypes.REMOVE_CLIENT_REQUEST:
    case ProductTypes.LOAD_EMPLOYEES_REQUEST:
    case ProductTypes.ADD_EMPLOYEE_REQUEST:
    case ProductTypes.REMOVE_EMPLOYEE_REQUEST:
      return { ...state, loading: true };
    case ProductTypes.LOAD_SUCCESS:
      if (action.payload.id === 'all') {
        const products = action.payload.data;
        return {
          ...state,
          loading: false,
          error: false,
          data: products.reduce(productModelToState, state.data)
        };
      } else {
        return {
          ...state,
          loading: false,
          error: false,
          data: productModelToState(state.data, action.payload.data)
        };
      }
    case ProductTypes.LOAD_CLIENT_PRODUCTS_SUCCESS:
      const clientProducts = action.payload.data;
      return {
        ...state,
        loading: false,
        error: false,
        clientProducts: clientProducts.reduce(clientProductToState, state.clientProducts)
      };
    case ProductTypes.LOAD_EMPLOYEES_SUCCESS:
      const employees = action.payload.data;
      return {
        ...state,
        loading: false,
        error: false,
        employees: employees.reduce(employeeModelToState, state.employees)
      };
    case ProductTypes.REMOVE_EMPLOYEE_SUCCESS:
      var { id } = action.payload;
      delete state.employees[id];
      return {
        ...state,
        loading: false,
        error: false
      }
    case ProductTypes.REMOVE_SUCCESS:
      var { id } = action.payload;
      delete state.data[id];
      return {
        ...state,
        loading: false,
        error: false
      };
    case ProductTypes.ADD_CLIENT_SUCCESS:
    case ProductTypes.ADD_EMPLOYEE_SUCCESS:
    case ProductTypes.REMOVE_CLIENT_SUCCESS:
    case ProductTypes.UPDATE_SUCCESS:
    case ProductTypes.CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false
      }
    case ProductTypes.LOAD_FAILURE:
    case ProductTypes.CREATE_FAILURE:
    case ProductTypes.UPDATE_FAILURE:
    case ProductTypes.REMOVE_FAILURE:
    case ProductTypes.LOAD_CLIENT_PRODUCTS_FAILURE:
    case ProductTypes.ADD_CLIENT_FAILURE:
    case ProductTypes.REMOVE_CLIENT_FAILURE:
    case ProductTypes.LOAD_EMPLOYEES_FAILURE:
    case ProductTypes.ADD_EMPLOYEE_FAILURE:
    case ProductTypes.REMOVE_EMPLOYEE_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errMsg: action.payload
      };
    default:
      return state;
  }
}

export default reducer;
