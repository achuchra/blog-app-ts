import React, { ReactElement, useMemo } from 'react';
import { RootState } from '../store/reducers';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { MenuList, MenuItem, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { toggleDrawer } from '../store/actions/drawerActions';

import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import SettingsIcon from '@material-ui/icons/Settings';
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';

const useStyles = makeStyles((theme) => ({
  blogIcon: {
    display: 'block',
    margin: '10px 5px 15px auto',
    color: theme.palette.primary.main,
  },
  list: {
    minWidth: '160px',
    '& a': {
      padding: '5px 10px 5px 30px',
      display: 'flex',
      '& p': {
        marginLeft: 'auto',
      },
    },
  },
}));

const Nav: React.FC = (): ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const loggedUser = 'currentUser' in currentUser.currentUser;
  const { pathname } = useLocation();
  const checkLocation = useMemo(() => (path: string): boolean => pathname === path, [pathname]);

  const paths = {
    home: '/',
    dashboard: '/dashboard',
    settings: '/settings',
    login: '/login',
  };
  const { home, dashboard, settings, login } = paths;

  return (
    <MenuList onClick={() => dispatch(toggleDrawer(false))} className={classes.list}>
      <BookOutlinedIcon className={classes.blogIcon} />
      <MenuItem component={NavLink} to={home} selected={checkLocation(home)}>
        <HomeIcon />
        <Typography variant="body1">Home</Typography>
      </MenuItem>
      <Divider />
      {loggedUser ? (
        <MenuItem component={NavLink} to={dashboard} selected={checkLocation(dashboard)}>
          <DashboardIcon />
          <Typography variant="body1">Dashboard</Typography>
        </MenuItem>
      ) : null}
      <Divider />
      {loggedUser ? (
        <MenuItem component={NavLink} to={settings} selected={checkLocation(settings)}>
          <SettingsIcon />
          <Typography variant="body1">Settings</Typography>
        </MenuItem>
      ) : null}
      {loggedUser ? <Divider /> : null}
      {loggedUser ? null : (
        <MenuItem component={NavLink} to={login} selected={checkLocation(login)}>
          <OpenInBrowserIcon />
          <Typography variant="body1">Login</Typography>
        </MenuItem>
      )}
    </MenuList>
  );
};

export default Nav;
