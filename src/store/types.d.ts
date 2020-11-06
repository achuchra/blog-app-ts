interface IArticle {
  author: string;
  title: string;
  createdAt: Date;
  lastModifiedAt: Date;
  description?: string;
  shortDescription?: string;
  icon?: string;
}

type ArticlesState = {
  articles: IArticle[] | any;
};

type ArticleAction = {
  type: string;
  payload: IArticle;
};

type DispatchType = (args: ArticleAction) => ArticleAction;
