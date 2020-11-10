import React, { ReactElement } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '../pages/Home';

const Routing: React.FC = (): ReactElement => {
  return (
    <Switch>
      <Route exact path="/" component={Home}></Route>
    </Switch>
  );
};

export default Routing;
