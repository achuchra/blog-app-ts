import React, { ReactElement } from 'react';
import Routing from './routes';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter as Router } from 'react-router-dom';
import MainTemplate from './templates/MainTemplate';
import { ThemeProvider } from '@material-ui/core';
import theme from './themes/mainTheme';

const App: React.FC = (): ReactElement => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <MainTemplate>
            <Routing />
          </MainTemplate>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
