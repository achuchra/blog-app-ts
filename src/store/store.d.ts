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

interface IGetCurrentUser {
  type: 'GET_CURRENT_USER';
  payload: IFetchedCurrentUser | Record<string, unknown>;
}

interface IToggleDrawer {
  type: 'TOGGLE_DRAWER';
  payload: boolean;
}

type TAction = IGetArticlesAction | ISetFetchingArticles | IFetchingError | IGetCurrentUser | IToggleDrawer;

interface IState {
  articles: IFetchedArticles | null;
  fetchingArticles: boolean;
  fetchingError: boolean;
}

interface IUserState {
  currentUser: IFetchedCurrentUser | Record<string, unknown>;
}

interface IDrawerState {
  open: boolean;
}
