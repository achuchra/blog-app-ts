import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Tooltip } from '@material-ui/core';
import { getArticles } from './store/actions/articleActions';
import { RootState } from './store/reducers';
import Routing from './routes';

const App: React.FC = () => {
  return <Routing />;
};

export default App;
