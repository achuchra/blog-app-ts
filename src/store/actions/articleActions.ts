import * as actionTypes from '../actionTypes';
import { http } from '../../utils/httpClient';

export const getArticlesAsync = (articles: IFetchedArticles) => {
  return { type: actionTypes.GET_ARTICLES, payload: articles };
};

export const getArticles = () => {
  return (dispatch) => {
    http.getArticles().then((res: IFetchedArticles): void => {
      const articles = res;
      dispatch(getArticlesAsync(articles));
    });
  };
};
