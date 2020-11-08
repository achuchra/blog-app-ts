import { combineReducers } from 'redux';
import { articleReducer } from './articleReducer';

export const rootReducer = combineReducers({
  articlesData: articleReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
