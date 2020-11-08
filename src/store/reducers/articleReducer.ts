import * as actionTypes from '../actionTypes';

const initialState = {
  articles: null,
  fetchingArticles: false,
};

export const articleReducer = (state: IState = initialState, action: TAction): IState => {
  switch (action.type) {
    case actionTypes.GET_ARTICLES:
      return {
        ...state,
        articles: action.payload,
      };
    case actionTypes.FETCHING_ARTICLES:
      return {
        ...state,
        fetchingArticles: action.payload,
      };
    default:
      return { ...state };
  }
};
