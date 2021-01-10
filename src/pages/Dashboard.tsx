import React, { FC, ReactElement } from 'react';
import ArticlesList from '../components/ArticlesList';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  vertMargin: {
    margin: '25px 0px 0px',
  },
}));

const Dashboard: FC = (): ReactElement => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h5" align="center" className={classes.vertMargin}>
        Your articles
      </Typography>
      <ArticlesList own />
    </>
  );
};

export default Dashboard;
