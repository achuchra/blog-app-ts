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
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

interface Props {
  own?: boolean;
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
  infoZone: {
    margin: '25px 0px 0px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const ArticlesList: FC<Props> = ({ own = false }: Props): ReactElement => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const query = useLocation();
  const queryParams = new URLSearchParams(query.search);
  const [page, setPage] = useState(queryParams.get('page') || 1);

  const classes = useStyles();

  useEffect(() => {
    dispatch(getArticles(page, own));
    +page !== 1
      ? history.push({
          pathname: '/',
          search: `?page=${page}`,
        })
      : history.push({
          search: '',
        });
  }, [page]);

  const handlePageChange = (e: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const singleArticle = ({ id, title, createdAt, shortDescription = '' }: IFetchedArticle) => {
    return (
      <ListItem key={id} button component={NavLink} to={`articles/${id}`}>
        <ListItemText
          primary={<Typography variant="h6">{title}</Typography>}
          secondary={
            <>
              <Typography component="span" style={{ display: 'block' }} variant="body2">
                {parseDate(createdAt)}
              </Typography>
              {shortDescription}
            </>
          }
        ></ListItemText>
        {own ? (
          <>
            <IconButton component={NavLink} to={`articles/${id}?mode=edit`}>
              <EditIcon />
            </IconButton>
            <IconButton component={NavLink} to={`articles/${id}?mode=edit`}>
              <DeleteIcon />
            </IconButton>
          </>
        ) : null}
      </ListItem>
    );
  };

  return (
    <div>
      {state.articlesData.articles && state.articlesData.articles.docs[0] ? (
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
      ) : state.articlesData.articles && !state.articlesData.articles.docs[0] ? (
        <div className={classes.infoZone}>
          <Typography variant="body1" align="center">
            No articles yet
          </Typography>
          {own ? (
            <Button component={NavLink} to="/add-article" variant="contained" color="primary">
              Add your first article
            </Button>
          ) : null}
        </div>
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
