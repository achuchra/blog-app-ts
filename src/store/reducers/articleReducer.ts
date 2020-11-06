import * as actionTypes from '../actionTypes';

const initialState = {
  articles: [],
};

export const articleReducer = (state: ArticlesState = initialState, action: ArticleAction): ArticlesState => {
  switch (action.type) {
    case actionTypes.GET_ARTICLES:
      return {
        ...state,
        articles: action.payload,
      };
      break;
    default:
      return state;
  }
  return state;
};
