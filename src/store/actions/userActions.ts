import { http } from '../../transfer/httpClient';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

type TThunkAction = ThunkAction<Promise<void>, null, null, AnyAction>;
type TThunkDispatch = ThunkDispatch<null, null, AnyAction>;

export const getCurrentUserAsync = (fetchedUser: IFetchedCurrentUser | Record<string, unknown>): IGetCurrentUser => {
  return { type: 'GET_CURRENT_USER', payload: fetchedUser };
};

export const getCurrentUser = (): TThunkAction => {
  return async (dispatch: TThunkDispatch): Promise<void> => {
    http
      .getCurrent()
      .then((res: IFetchedCurrentUser): void => {
        const fetchedUser = res.currentUser ? res : {};
        dispatch(getCurrentUserAsync(fetchedUser));
      })
      .catch((err: any): void => {
        console.log(err);
      });
  };
};
