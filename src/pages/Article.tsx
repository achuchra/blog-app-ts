import React, { FC, ReactElement, useState, useEffect } from 'react';
import { RootState } from '../store/reducers';
import { useSelector } from 'react-redux';
import { http } from '../transfer/httpClient';
import { useLocation } from 'react-router-dom';

import { parseDate } from '../utils/parseDate';

import { Typography, Divider, Box } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import ArticleForm from '../components/articleForm/ArticleForm';

interface ArticleData {
  fetchedArticle: IFetchedArticle | boolean;
  fetching: boolean;
}

const Article: FC = (): ReactElement => {
  const curr = useSelector((state: RootState) => state.currentUser.currentUser) as IFetchedCurrentUser;

  const { pathname, search } = useLocation();
  const params = new URLSearchParams(search.split('?')[1]);
  const [editMode, setEditMode] = useState(params.get('mode') === 'edit');
  const [articleData, setArticleData] = useState<ArticleData>({ fetchedArticle: false, fetching: true });
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
      authorId,
      createdAt,
      lastModifiedAt,
    } = articleData.fetchedArticle as IFetchedArticle;

    return editMode && curr.currentUser && curr.currentUser.id === authorId ? (
      <ArticleForm own defaultData={articleData.fetchedArticle} />
    ) : (
      <>
        <Typography pt={2} pb={1} variant="h3" component={Box}>
          {title}
        </Typography>
        <Typography variant="caption" component={Box} pb={1}>{`by ${author}, created: ${parseDate(createdAt)}${
          createdAt !== lastModifiedAt ? `, edited: ${parseDate(lastModifiedAt)}` : ''
        }`}</Typography>
        <Divider />
        <Typography variant="body2" component={Box} p={1}>
          {shortDescription}
        </Typography>
        <Typography
          variant="body2"
          component={Box}
          p={1}
          dangerouslySetInnerHTML={{ __html: description }}
        ></Typography>
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
