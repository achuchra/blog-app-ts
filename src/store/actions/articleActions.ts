import * as actionTypes from '../actionTypes';
import { http } from '../../utils/httpClient';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export const setFetchingArticles = (setFetching: boolean): ISetFetchingArticles => {
  return { type: 'FETCHING_ARTICLES', payload: setFetching };
};

export const getArticlesAsync = (articles: IFetchedArticles): IGetArticlesAction => {
  return { type: 'GET_ARTICLES', payload: articles };
};

export const getArticles = (): ThunkAction<Promise<void>, null, null, AnyAction> => {
  return async (dispatch: ThunkDispatch<null, null, AnyAction>): Promise<void> => {
    dispatch(setFetchingArticles(true));
    http.getArticles().then((res: IFetchedArticles): void => {
      const articles = res;
      dispatch(getArticlesAsync(articles));
      dispatch(setFetchingArticles(false));
    });
  };
};
