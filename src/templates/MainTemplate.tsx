import React, { ReactElement } from 'react';
import Header from '../components/Header';

type props = Record<string, unknown>;

const MainTemplate: React.FC<props> = ({ children }): ReactElement => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default MainTemplate;
