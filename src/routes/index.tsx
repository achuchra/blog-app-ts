import React, { ReactElement, useEffect } from 'react';
import { RootState } from '../store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../store/actions/userActions';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '../pages/Home';

const Routing: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  const currentUser = useSelector((state: RootState) => state.currentUser);
  const loggedUser = 'currentUser' in currentUser.currentUser;
  console.log(loggedUser);

  return (
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route path="/dashboard">{loggedUser ? '<Dashboard />' : <Redirect to="/login" />}</Route>
      <Route path="/settings">{loggedUser ? '<Settings />' : <Redirect to="/login" />}</Route>
      <Route path="/login">{loggedUser ? <Redirect to="/settings" /> : '<Login />'}</Route>
    </Switch>
  );
};

export default Routing;
