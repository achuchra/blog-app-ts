import React, { ReactElement, FC, useEffect, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getArticles } from '../store/actions/articleActions';
import { RootState } from '../store/reducers';
import { List, ListItem, ListItemText, Grid, Box } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { parseDate } from '../utils/parseDate';

const Home: FC = (): ReactElement => {
  const query = useLocation();
  const queryParams = new URLSearchParams(query.search);
  const page = queryParams.get('page') || 1;

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
        [0, 1, 2, 3].map((elem, idx) => {
          return (
            <Box key={idx} margin={2}>
              <Skeleton variant="rect" width="100%" height="50px" animation="wave" />
            </Box>
          );
        })
      )}
    </div>
  );
};

export default Home;
