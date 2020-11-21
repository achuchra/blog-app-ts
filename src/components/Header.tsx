import React, { ReactElement } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Nav from '../components/Nav';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      padding: '5px 15px',
      [theme.breakpoints.up('sm')]: {
        padding: '10px 50px',
      },
    },
  });
});

const Header: React.FC = (): ReactElement => {
  const classes = useStyles();
  return (
    <>
      <AppBar color="secondary" className={classes.root}>
        <Nav />
      </AppBar>
    </>
  );
};

export default Header;
