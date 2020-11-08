import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Tooltip } from '@material-ui/core';
import { getArticles } from './store/actions/articleActions';
import { RootState } from './store/reducers';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  console.log(state);
  useEffect(() => {
    dispatch(getArticles());
  }, []);

  return (
    <div className="App">
      <Tooltip title="click" placement="bottom">
        <Button>Click here</Button>
      </Tooltip>
      {state.articlesData.articles
        ? state.articlesData.articles!.docs.map((item: IFetchedArticle) => {
            return <div key={item.id}>{item.title}</div>;
          })
        : null}
    </div>
  );
};

export default App;
