import React, { ReactElement, useMemo } from 'react';
import { RootState } from '../store/reducers';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { MenuList, MenuItem, Typography, Divider } from '@material-ui/core';

const Nav: React.FC = (): ReactElement => {
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
    <MenuList>
      <MenuItem component={NavLink} to={home} selected={checkLocation(home)}>
        <Typography variant="body1">Home</Typography>
      </MenuItem>
      <Divider />
      <MenuItem component={NavLink} to={dashboard} selected={checkLocation(dashboard)}>
        <Typography variant="body1">dashboard</Typography>
      </MenuItem>
      <Divider />
      {loggedUser ? (
        <MenuItem component={NavLink} to={settings} selected={checkLocation(settings)}>
          <Typography variant="body1">settings</Typography>
        </MenuItem>
      ) : null}
      {loggedUser ? <Divider /> : null}
      {loggedUser ? null : (
        <MenuItem component={NavLink} to={login} selected={checkLocation(login)}>
          <Typography variant="body1">login</Typography>
        </MenuItem>
      )}
    </MenuList>
  );
};

export default Nav;
