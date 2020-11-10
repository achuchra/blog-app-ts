import React, { ReactElement, FC, useEffect, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getArticles } from '../store/actions/articleActions';
import { RootState } from '../store/reducers';
import { List, ListItem, ListItemText, Grid } from '@material-ui/core';
import { parseDate } from '../utils/parseDate';

const Home: FC = (): ReactElement => {
  const query = useLocation();
  const queryParams = new URLSearchParams(query.search);
  const page = queryParams.get('page');

  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  console.log(state);
  useEffect(() => {
    dispatch(getArticles(page));
  }, []);

  const singleItem = (item: IFetchedArticle) => {
    return (
      <ListItem key={item.id} button>
        <ListItemText primary={item.title} secondary={parseDate(item.createdAt)}></ListItemText>
      </ListItem>
    );
  };

  return (
    <div>
      {state.articlesData.articles ? (
        <Grid>
          <List>{state.articlesData.articles.docs.map(singleItem)}</List>
        </Grid>
      ) : state.articlesData.fetchingError ? (
        <p>Fetching failed :(</p>
      ) : (
        <p>Fetching...</p>
      )}
    </div>
  );
};

export default Home;
