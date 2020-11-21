import { combineReducers } from 'redux';
import { articleReducer } from './articleReducer';
import { userReducer } from './userReducer';

export const rootReducer = combineReducers({
  articlesData: articleReducer,
  currentUser: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
