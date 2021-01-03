import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/reducers';
import { toggleDrawer } from '../store/actions/drawerActions';
import Drawer from '@material-ui/core/Drawer';
import { useMediaQuery } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import Nav from './Nav';

const Sidebar: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const drawerStatus = useSelector((state: RootState) => state.drawer.open);

  const isBigScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const variantValue = isBigScreen ? 'permanent' : undefined;

  return (
    <Drawer
      open={drawerStatus}
      variant={variantValue}
      onClose={() => (!isBigScreen ? dispatch(toggleDrawer(false)) : null)}
    >
      <Nav bigScreen={isBigScreen} />
    </Drawer>
  );
};

export default Sidebar;
