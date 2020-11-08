type PossibleError = any;

interface Http {
  getCurrent(): Promise<IFetchedCurrentUser, PossibleError>;
  getArticles(): Promise<IFetchedArticles, PossibleError>;
  getArticle(id: string): Promise<IFetchedArticle, PossibleError>;
  addArticle(body: IArticle): Promise<IFetchedArticle, PossibleError>;
  updateArticle(id: string, body: IUpdateArticleBody): Promise<IFetchedArticle, PossibleError>;
  deleteArticle(id: string): Promise<IDeletedArticle, PossibleError>;
  userLogin(body: IUserLoginBody): Promise<IFetchedUser, PossibleError>;
  userUpdate(id: string, body: IUserUpdateBody): Promise<IFetchedUser, PossibleError>;
  userLogout(): Promise<{}, PossibleError>;
  userRegister(body: IUserRegisterBody): Promise<IFetchedUser, PossibleError>;
}

type IPossibleArgs = IArticle | IUpdateArticleBody | IUserLoginBody | IUserUpdateBody | IUserRegisterBody | null;

type IHttpParams = Array<string & string> | Array<string & string & IPossibleArgs>;

type IPossibleRes = Promise<
  IFetchedCurrentUser | IFetchedArticles | IFetchedArticle | IDeletedArticle | IFetchedUser | null
>;

type IHttpRequest = (arg0: string, arg1: string, arg2?: IPossibleArgs) => IPossibleRes;
