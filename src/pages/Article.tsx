import React, { FC, ReactElement, useState, useEffect } from 'react';
import { http } from '../utils/httpClient';
import { useLocation } from 'react-router-dom';

import { parseDate } from '../utils/parseDate';

import { Typography, Divider, Box } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

interface ArticleData {
  fetchedArticle: IFetchedArticle | boolean;
  fetching: boolean;
}

const Article: FC = (): ReactElement => {
  console.log('went into article');
  const [articleData, setArticleData] = useState<ArticleData>({ fetchedArticle: false, fetching: true });
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
      lastModifiedAt,
    } = articleData.fetchedArticle as IFetchedArticle;

    return (
      <>
        <Typography pt={2} pb={1} variant="h3" component={Box}>
          {title}
        </Typography>
        <Typography variant="caption" component={Box} pb={1}>{`by ${author}, created: ${parseDate(createdAt)}${
          createdAt !== lastModifiedAt ? `, edited: ${parseDate(lastModifiedAt)}` : null
        }`}</Typography>
        <Divider />
        <Typography variant="body2" component={Box} p={1}>
          {shortDescription}
        </Typography>
        <Typography variant="body2" component={Box} p={1}>
          {description}
        </Typography>
        {description || shortDescription ? <Divider /> : null}
      </>
    );
  }

  return (
    <>
      <Skeleton component={Box} mt={2} mb={2} variant="rect" height="70px" animation="wave" />
      <Skeleton component={Box} mt={1} variant="rect" height="20px" animation="wave" />
      <Skeleton component={Box} m={1} variant="rect" height="50px" animation="wave" />
      <Skeleton component={Box} m={1} variant="rect" height="300px" animation="wave" />
    </>
  );
};

export default Article;
