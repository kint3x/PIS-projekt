import { Reducer, AnyAction } from 'redux';
import { EmployeeModel, EmployeeState, EmployeeTypes } from './types';

export const INITIAL_STATE: EmployeeState = {
  data: {},
  loading: false,
  errMsg: '',
  error: false
};

const employeeModelToState = (
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
    case EmployeeTypes.LOAD_REQUEST:
      return { ...state, loading: true }
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
    case EmployeeTypes.REMOVE_SUCCESS:
    case EmployeeTypes.UPDATE_SUCCESS:
    case EmployeeTypes.CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false
      }
    case EmployeeTypes.REMOVE_FAILURE:
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
