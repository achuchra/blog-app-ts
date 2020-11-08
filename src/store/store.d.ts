interface IGetArticlesAction {
  type: 'GET_ARTICLES';
  payload: IFetchedArticles;
}

interface ISetFetchingArticles {
  type: 'FETCHING_ARTICLES';
  payload: boolean;
}

interface IState {
  articles: IFetchedArticles | null;
  fetchingArticles: boolean;
}

type TAction = IGetArticlesAction | ISetFetchingArticles;
