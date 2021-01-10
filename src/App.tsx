import React, { ReactElement } from 'react';
import Routing from './routes';
import { Provider } from 'react-redux';
import { store } from './store';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import MainTemplate from './templates/MainTemplate';
import { ThemeProvider } from '@material-ui/core';
import theme from './themes/mainTheme';
import './App.scss';

export const history = createBrowserHistory();

const App: React.FC = (): ReactElement => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <MainTemplate>
            <Routing />
          </MainTemplate>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
