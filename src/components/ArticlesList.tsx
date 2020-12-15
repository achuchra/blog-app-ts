import React, { useState, useEffect, FC, ReactElement, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { getArticles } from '../store/actions/articleActions';
import { RootState } from '../store/reducers';
import { history } from '../App';
import { makeStyles } from '@material-ui/core/styles';

import { parseDate } from '../utils/parseDate';

import { List, ListItem, ListItemText, Grid, Box } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import Pagination from '@material-ui/lab/Pagination';
import Typography from '@material-ui/core/Typography';

interface Props {
  own?: string;
}

const useStyles = makeStyles(() => ({
  fixedNav: {
    position: 'fixed',
    bottom: '0',
    left: '0',
    maxWidth: '100vw',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    width: '100vw',
    padding: '15px 0',
    boxShadow: '0px 0px 10px -6px #000',
    backgroundColor: '#f5f5f5',
  },
}));

const ArticlesList: FC<Props> = (): ReactElement => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const query = useLocation();
  const queryParams = new URLSearchParams(query.search);
  const [page, setPage] = useState(queryParams.get('page') || 1);

  const classes = useStyles();

  useEffect(() => {
    dispatch(getArticles(page));
    +page !== 1
      ? history.push({
          pathname: '/',
          search: `?page=${page}`,
        })
      : null;
  }, [page]);

  const handlePageChange = (e: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const singleArticle = ({ id, title, createdAt, shortDescription = '' }: IFetchedArticle) => {
    return (
      <ListItem key={id} button component={NavLink} to={`articles/${id}`}>
        <ListItemText
          primary={title}
          secondary={
            <>
              <Typography component="div" variant="body2">
                {parseDate(createdAt)}
              </Typography>
              {shortDescription}
            </>
          }
        ></ListItemText>
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
            className={classes.fixedNav}
            count={state.articlesData.articles.totalPages}
            page={state.articlesData.articles.page}
            onChange={handlePageChange}
            siblingCount={0}
            showFirstButton
            showLastButton
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
