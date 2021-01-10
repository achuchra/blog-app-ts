import React, { ReactElement, useMemo, MouseEvent, ReactNode } from 'react';
import { RootState } from '../store/reducers';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { MenuList, MenuItem, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { toggleDrawer } from '../store/actions/drawerActions';
import { http } from '../transfer/httpClient';
import { getCurrentUser } from '../store/actions/userActions';

import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import SettingsIcon from '@material-ui/icons/Settings';
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';

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
      minHeight: '48px',
      '& p': {
        marginLeft: 'auto',
      },
    },
  },
}));

interface INavProps {
  bigScreen: boolean;
  children?: ReactNode;
}

const Nav: React.FC<INavProps> = (props: INavProps): ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const loggedUser = 'currentUser' in currentUser.currentUser;
  const { pathname } = useLocation();
  const checkLocation = useMemo(() => (path: string): boolean => pathname === path, [pathname]);

  const handleLogout = async (e: MouseEvent) => {
    e.preventDefault();
    await http.userLogout();
    dispatch(getCurrentUser());
  };

  const paths = {
    home: '/',
    addArticle: '/add-article',
    dashboard: '/dashboard',
    settings: '/settings',
    login: '/login',
  };
  const { home, addArticle, dashboard, settings, login } = paths;

  return (
    <MenuList onClick={() => (props.bigScreen ? null : dispatch(toggleDrawer(false)))} className={classes.list}>
      <BookOutlinedIcon className={classes.blogIcon} />
      <Divider />
      <MenuItem component={NavLink} to={home} selected={checkLocation(home)}>
        <HomeIcon />
        <Typography variant="body1">Home</Typography>
      </MenuItem>
      <Divider />
      {loggedUser ? (
        <MenuItem component={NavLink} to={addArticle} selected={checkLocation(addArticle)}>
          <LibraryAddIcon />
          <Typography variant="body1">Add Article</Typography>
        </MenuItem>
      ) : null}
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
      {loggedUser ? (
        <div>
          <Divider style={{ marginTop: '70px' }} />
          <MenuItem component={NavLink} to="#" onClick={handleLogout}>
            <ExitToAppIcon />
            <Typography variant="body1">Logout</Typography>
          </MenuItem>
          <Divider />
        </div>
      ) : null}
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
