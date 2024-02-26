import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import { persistStore, persistReducer } from 'redux-persist'
import logger from 'redux-logger'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { reduxStorage } from '../utils/storage';

const persistConfig = {
    key: 'test',
    storage: reduxStorage,
    stateReconciler: autoMergeLevel2
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
let store: any
if(__DEV__) {
    store = createStore(persistedReducer, applyMiddleware(logger));
} else {
    store = createStore(persistedReducer, applyMiddleware());
}
const persistor = persistStore(store!)

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export {store, persistor};
