import * as actionTypes from '../actionTypes';
import { http } from '../../utils/httpClient';

export const getArticlesAsync = (articles: any) => {
  return { type: actionTypes.GET_ARTICLES, payload: articles };
};

export const getArticles = () => {
  return (dispatch: any) => {
    http!.getArticles({}).then((res: any): void => {
      const articles = res;
      dispatch(getArticlesAsync(articles));
    });
  };
};
