import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/reducers';
import { toggleDrawer } from '../store/actions/drawerActions';
import Drawer from '@material-ui/core/Drawer';
import Nav from './Nav';

const Sidebar: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const drawerStatus = useSelector((state: RootState) => state.drawer.open);

  return (
    <Drawer open={drawerStatus} onClose={() => dispatch(toggleDrawer(false))}>
      <Nav />
    </Drawer>
  );
};

export default Sidebar;
