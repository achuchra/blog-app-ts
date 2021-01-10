import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { toggleDrawer } from '../store/actions/drawerActions';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '5px 15px',

      '& button span': {
        display: 'flex',
        justifyContent: 'flex-start',
      },
      [theme.breakpoints.up('sm')]: {
        padding: '10px 30px 10px 5px',

        '& button span': {
          justifyContent: 'center',
        },
      },
    },
    toRight: {
      marginLeft: 'auto',
      marginRight: '10px',
    },
  });
});

const Header: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <>
      <AppBar color="secondary" className={classes.root}>
        <Button color="primary" onClick={() => dispatch(toggleDrawer(true))}>
          <MenuIcon />
        </Button>
        <BookOutlinedIcon color="primary" className={classes.toRight} />
        <Typography color="primary" variant="h5">
          Blog app
        </Typography>
      </AppBar>
    </>
  );
};

export default Header;
