import { combineReducers } from 'redux';
import { persistReducer } from "redux-persist";
import storageSession from 'redux-persist/lib/storage/session';

import users from './modules/users';
import detail from './modules/detail';

const persistConfig = {
  key: "user",
  storage: storageSession,
  whitelist: ["users"]
};

export const rootReducer = combineReducers({
  users, detail
});

export default persistReducer(persistConfig, rootReducer);