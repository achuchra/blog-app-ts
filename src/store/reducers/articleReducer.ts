import * as actionTypes from '../actionTypes';

const initialState = {
  articles: null,
  fetchingArticles: false,
  fetchingError: false,
};

export const articleReducer = (state: IState = initialState, action: TAction): IState => {
  switch (action.type) {
    case actionTypes.GET_ARTICLES:
      return {
        ...state,
        articles: action.payload,
        fetchingArticles: false,
      };
    case actionTypes.FETCHING_ARTICLES:
      return {
        ...state,
        fetchingArticles: action.payload,
      };
    case actionTypes.FETCHING_ERROR:
      return {
        ...state,
        fetchingError: true,
        fetchingArticles: false,
      };
    default:
      return { ...state };
  }
};
