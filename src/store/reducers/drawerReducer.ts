import * as actionTypes from '../actionTypes';

const initialState = {
  open: false,
};

export const drawerReducer = (state: IDrawerState = initialState, action: TAction): IDrawerState => {
  switch (action.type) {
    case actionTypes.TOGGLE_DRAWER:
      return {
        ...state,
        open: action.payload,
      };
    default:
      return { ...state };
  }
};
