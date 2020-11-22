import { combineReducers } from 'redux';
import { articleReducer } from './articleReducer';
import { userReducer } from './userReducer';
import { drawerReducer } from './drawerReducer';

export const rootReducer = combineReducers({
  articlesData: articleReducer,
  currentUser: userReducer,
  drawer: drawerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
