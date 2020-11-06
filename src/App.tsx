import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Tooltip } from '@material-ui/core';
import { getArticles } from './store/actions/articleActions';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log(state);
  useEffect(() => {
    dispatch(getArticles());
  }, []);

  return (
    <div className="App">
      <Tooltip title="click" placement="bottom">
        <Button>Click here</Button>
      </Tooltip>
    </div>
  );
};

export default App;
