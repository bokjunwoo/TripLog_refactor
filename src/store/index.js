import { combineReducers } from 'redux';
import { persistReducer } from "redux-persist";
import storageSession from 'redux-persist/lib/storage/session';

import users from './modules/users';

const persistConfig = {
  key: "user",
  storage: storageSession,
  whitelist: ["users"]
};

export const rootReducer = combineReducers({
  users,
});

export default persistReducer(persistConfig, rootReducer);