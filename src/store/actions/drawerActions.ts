export const toggleDrawer = (toggleDrawer: boolean): IToggleDrawer => {
  return { type: 'TOGGLE_DRAWER', payload: toggleDrawer };
};
