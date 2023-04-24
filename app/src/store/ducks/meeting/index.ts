import { Reducer, AnyAction } from 'redux';
import { MeetingState } from './types';
import { MeetingModel } from './types';
import { MeetingTypes } from './types';

export const meetingsModelToState = (
  data: { [key: number]: MeetingModel },
  item: MeetingModel
) => {
  return {
    ...data,
    [item.id]: {
      id: item.id,
      subject: item.subject,
      start: item.start,
      end: item.end,
      notes: item.notes,
      employees: item.employees,
      client: item.client,
      author: item.author,
    }
  }
}

export const INITIAL_STATE: MeetingState = {
  data: {},
  loading: false,
  error: false,
  errMsg: ''
}

const reducer: Reducer<MeetingState> = (state=INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case MeetingTypes.LOAD_REQUEST:
    case MeetingTypes.CREATE_REQUEST:
    case MeetingTypes.UPDATE_REQUEST:
    case MeetingTypes.REMOVE_REQUEST:
    case MeetingTypes.ADD_EMPLOYEE_REQUEST:
    case MeetingTypes.REMOVE_EMPLOYEE_REQUEST:
      return {...state, loading: true };
    case MeetingTypes.LOAD_SUCCESS:
      if (action.payload.id === 'all') {
        const meetings = action.payload.data;
        return {
          ...state,
          loading: false,
          error: false,
          data: meetings.reduce(meetingsModelToState, state.data)
        };
      } else {
        return {
          ...state,
          loading: false,
          error: false,
          data: meetingsModelToState(state.data, action.payload.data)
        };
      }
    case MeetingTypes.CREATE_SUCCESS:
    case MeetingTypes.UPDATE_SUCCESS:
    case MeetingTypes.ADD_EMPLOYEE_SUCCESS:
    case MeetingTypes.REMOVE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        error:false
      }
    case MeetingTypes.REMOVE_SUCCESS:
      var { id } = action.payload;
      delete state.data[id];
      return {
        ...state,
        loading: false,
        error: false
      }
    case MeetingTypes.LOAD_FAILURE:
    case MeetingTypes.CREATE_FAILURE:
    case MeetingTypes.UPDATE_FAILURE:
    case MeetingTypes.REMOVE_FAILURE:
    case MeetingTypes.ADD_EMPLOYEE_FAILURE:
    case MeetingTypes.REMOVE_EMPLOYEE_FAILURE:
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
