import AsyncStorage from '@react-native-community/async-storage';
import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const persistConfig = {
  key: 'E',
  storage: AsyncStorage,
  version: 0,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
const Store = createStore(persistedReducer, applyMiddleware(...middleware));
const Persistor = persistStore(Store);

sagaMiddleware.run(rootSaga);
export { Persistor, Store };
