import * as actionTypes from '../actionTypes';

const initialState: IFetchedArticles = {
  docs: [],
  totalDocs: null,
  limit: null,
};

export const articleReducer = (state = initialState, action: ArticleAction): IFetchedArticles => {
  switch (action.type) {
    case actionTypes.GET_ARTICLES:
      return {
        ...state,
        ...action.payload,
      };
      break;
    default:
      return state;
  }
  return state;
};
