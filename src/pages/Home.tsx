import React, { ReactElement, FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getArticles } from '../store/actions/articleActions';
import { RootState } from '../store/reducers';
import { List, ListItem, ListItemText, Grid, Box } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { parseDate } from '../utils/parseDate';
import Pagination from '@material-ui/lab/Pagination';
import { history } from '../App';

const Home: FC = (): ReactElement => {
  const query = useLocation();
  const queryParams = new URLSearchParams(query.search);
  const [page, setPage] = useState(queryParams.get('page') || 1);

  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  console.log(state);
  useEffect(() => {
    dispatch(getArticles(page));
    history.push({
      pathname: '/',
      search: `?page=${page}`,
    });
  }, [page]);

  const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

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
        <>
          <Grid>
            <List>{state.articlesData.articles.docs.map(singleItem)}</List>
          </Grid>
          <Pagination
            count={state.articlesData.articles.totalPages}
            page={state.articlesData.articles.page}
            onChange={handlePageChange}
          />
        </>
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
