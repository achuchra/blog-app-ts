import React, { ReactElement } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

type props = Record<string, unknown>;

const MainTemplate: React.FC<props> = ({ children }): ReactElement => {
  console.log(Sidebar);
  console.log(Header);
  return (
    <>
      <Header />
      <Sidebar />
      {children}
    </>
  );
};

export default MainTemplate;
