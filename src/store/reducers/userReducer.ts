import * as actionTypes from '../actionTypes';

const initialState = {
  currentUser: {},
};

export const userReducer = (state: IUserState = initialState, action: TAction): IUserState => {
  switch (action.type) {
    case actionTypes.GET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return { ...state };
  }
};
