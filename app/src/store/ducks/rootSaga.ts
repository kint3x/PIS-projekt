import { all } from 'redux-saga/effects';

import employeeSagas from './employee/sagas';
import clientSagas from './client/sagas';

export default function* rootSaga(): Generator {
  return yield all([
    ...employeeSagas,
    ...clientSagas,
  ]);
};
