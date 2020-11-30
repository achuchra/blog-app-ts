import React, { ReactElement } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { makeStyles } from '@material-ui/core/styles';
import classes from '*.module.sass';

const useStyles = makeStyles(() => ({
  topSpace: {
    paddingTop: '56px',
  },
}));

const MainTemplate: React.FC = ({ children }): ReactElement => {
  const classes = useStyles();

  return (
    <>
      <Header />
      <Sidebar />
      <div className={classes.topSpace}>{children}</div>
    </>
  );
};

export default MainTemplate;
