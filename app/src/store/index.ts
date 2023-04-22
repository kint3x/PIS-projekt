import { createStore, Store, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './ducks/rootReducer';
import rootSaga from './ducks/rootSaga';

import { EmployeeState } from './ducks/employee/types';
import { ClientState } from './ducks/client/types';

export interface AppState {
  employee: EmployeeState;
  client: ClientState;
};

const sagaMiddleware = createSagaMiddleware();

const store: Store<AppState> = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;
