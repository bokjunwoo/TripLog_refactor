import { combineReducers } from 'redux';
import { persistReducer } from "redux-persist";
import storageSession from 'redux-persist/lib/storage/session';

import users from './modules/users';
import review from './modules/review';
import like from './modules/like';

const persistConfig = {
  key: "user",
  storage: storageSession,
  whitelist: ["users"]
};

export const rootReducer = combineReducers({
  users, review, like
});

export default persistReducer(persistConfig, rootReducer);