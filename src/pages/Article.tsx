import React, { FC, ReactElement, useState, useEffect } from 'react';
import { http } from '../utils/httpClient';
import { useLocation } from 'react-router-dom';

import { parseDate } from '../utils/parseDate';

import Typography from '@material-ui/core/Typography';

interface Article {
  fetchedArticle: IFetchedArticle | boolean;
  fetching: boolean;
}

const Article: FC = (): ReactElement => {
  console.log('went into article');
  const [articleData, setArticleData] = useState<Article>({ fetchedArticle: false, fetching: true });
  const { pathname } = useLocation();
  const id = pathname.split('/')[2];

  useEffect(() => {
    const getSingleArticle = async () => {
      try {
        const article = await http.getArticle(id);
        setArticleData((state) => ({
          ...state,
          fetchedArticle: article,
        }));
      } catch (err) {
        console.log(err);
      }
    };
    getSingleArticle();
  }, []);

  if (articleData.fetchedArticle) {
    const {
      title,
      shortDescription = '',
      description = '',
      author,
      createdAt,
    } = articleData.fetchedArticle as IFetchedArticle;

    return (
      <>
        <Typography>
          <div>{title}</div>
          <div>{shortDescription}</div>
          <div>{description}</div>
          <div>{author}</div>
          <div>{parseDate(createdAt)}</div>
        </Typography>
      </>
    );
  }

  return <span>textField</span>;
};

export default Article;
