interface IArticle {
  author: string;
  title: string;
  createdAt: Date;
  lastModifiedAt: Date;
  description?: string;
  shortDescription?: string;
  icon?: string;
}

interface IFetchedArticles {
  docs: array | IArticle[];
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

type DispatchType = (args: ArticleAction) => ArticleAction;
