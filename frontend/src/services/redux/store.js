import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth'
import sidebarReducer from './features/sidebar'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
}
const rootReducer = combineReducers({
  auth: authReducer,
  sidebar: sidebarReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
  devTools: true,
})

export const persistor = persistStore(store)

