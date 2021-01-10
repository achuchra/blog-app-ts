import React, { ReactElement } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  container: {
    padding: '60px 15px',
    maxWidth: '1000px',
    margin: '0 auto',
  },
}));

const MainTemplate: React.FC = ({ children }): ReactElement => {
  const classes = useStyles();

  return (
    <>
      <Header />
      <Sidebar />
      <div className={classes.container}>{children}</div>
    </>
  );
};

export default MainTemplate;
