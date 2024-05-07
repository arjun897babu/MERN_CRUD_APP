import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import adminSlice from './adminSlice';

const rootReducer = combineReducers(
  {
    user: authSlice,
    admin: adminSlice
  }
);

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
