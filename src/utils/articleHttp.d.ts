interface IAddArticleBody {
  title: string;
  desription?: string;
  shortDescription?: string;
  icon?: string;
}

interface IUpdateArticleBody {
  title?: string | null;
  description?: string | null;
  shortDescription?: string | null;
  icon?: string | null;
}

interface IArticle {
  author: string;
  title: string;
  createdAt: Date;
  lastModifiedAt: Date;
  description?: string;
  shortDescription?: string;
  icon?: string;
}

interface IFetchedArticle extends IArticle {
  id: string;
}

interface IDeletedArticle {
  status: string;
  message: string;
}

interface IFetchedArticles {
  docs: array | IFetchedArticle[];
  totalDocs: number | null;
  limit: number | null;
  totalPages?: number;
  page?: number;
  pagingCounter?: number;
  hesPrevPage?: boolean;
  hasNextPage?: boolean;
  prevPage?: number | null;
  nextPage?: number | null;
}

type ArticleAction = {
  type: string;
  payload: IArticle;
};

type DispatchType = (args: ArticleAction) => IFetchedArticles;
