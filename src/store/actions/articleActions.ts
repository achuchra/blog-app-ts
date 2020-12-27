import { http } from '../../transfer/httpClient';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

type TThunkAction = ThunkAction<Promise<void>, null, null, AnyAction>;
type TThunkDispatch = ThunkDispatch<null, null, AnyAction>;

export const setFetchingArticles = (setFetching: boolean): ISetFetchingArticles => {
  return { type: 'FETCHING_ARTICLES', payload: setFetching };
};

export const getArticlesAsync = (articles: IFetchedArticles): IGetArticlesAction => {
  return { type: 'GET_ARTICLES', payload: articles };
};

export const setFetchingError = (setFetchingError: boolean): IFetchingError => {
  return { type: 'FETCHING_ERROR', payload: setFetchingError };
};

export const getArticles = (page: number | string | null = 1): TThunkAction => {
  return async (dispatch: TThunkDispatch): Promise<void> => {
    dispatch(setFetchingArticles(true));
    try {
      const res = await (<IFetchedArticles>http.getArticles(page));
      dispatch(getArticlesAsync(res));
    } catch {
      dispatch(setFetchingError(true));
    }
    // http
    //   .getArticles(page)
    //   .then((res: IFetchedArticles): void => {
    //     const articles = res;
    //     dispatch(getArticlesAsync(articles));
    //   })
    //   .catch((): void => {
    //     dispatch(setFetchingError(true));
    //   });
  };
};
