import React, { useState, useEffect, FC, ReactElement, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { getArticles } from '../store/actions/articleActions';
import { RootState } from '../store/reducers';
import { history } from '../App';

import { parseDate } from '../utils/parseDate';

import { List, ListItem, ListItemText, Grid, Box } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import Pagination from '@material-ui/lab/Pagination';

interface Props {
  own?: string;
}

const ArticlesList: FC<Props> = (): ReactElement => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const query = useLocation();
  const queryParams = new URLSearchParams(query.search);
  const [page, setPage] = useState(queryParams.get('page') || 1);

  useEffect(() => {
    dispatch(getArticles(page));
    history.push({
      pathname: '/',
      search: page !== 1 ? `?page=${page}` : '',
    });
  }, [page]);

  const handlePageChange = (e: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const singleArticle = ({ id, title, createdAt }: IFetchedArticle) => {
    return (
      <ListItem key={id} button component={NavLink} to={`articles/${id}`}>
        <ListItemText primary={title} secondary={parseDate(createdAt)}></ListItemText>
      </ListItem>
    );
  };

  return (
    <div>
      {state.articlesData.articles ? (
        <>
          <Grid>
            <List>{state.articlesData.articles.docs.map(singleArticle)}</List>
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
        [0, 1, 2, 3].map(
          (elem, idx): ReactElement => {
            return (
              <Box key={idx} margin={2}>
                <Skeleton variant="rect" width="100%" height="50px" animation="wave" />
              </Box>
            );
          },
        )
      )}
    </div>
  );
};

export default ArticlesList;
