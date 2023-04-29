import { createStore, Store, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './ducks/rootReducer';
import rootSaga from './ducks/rootSaga';

import { EmployeeState } from './ducks/employee/types';
import { ClientState } from './ducks/client/types';
import { ProductState } from './ducks/product/types';
import { MeetingState } from './ducks/meeting/types';

export interface AppState {
  employee: EmployeeState;
  client: ClientState;
  product: ProductState;
  meeting: MeetingState;
};

const sagaMiddleware = createSagaMiddleware();

const store: Store<AppState> = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
