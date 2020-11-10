interface IGetArticlesAction {
  type: 'GET_ARTICLES';
  payload: IFetchedArticles;
}

interface ISetFetchingArticles {
  type: 'FETCHING_ARTICLES';
  payload: boolean;
}

interface IFetchingError {
  type: 'FETCHING_ERROR';
  payload: boolean;
}

interface IState {
  articles: IFetchedArticles | null;
  fetchingArticles: boolean;
  fetchingError: boolean;
}

type TAction = IGetArticlesAction | ISetFetchingArticles | IFetchingError;
