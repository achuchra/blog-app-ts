import React, { FC, ReactElement, useRef } from 'react';

const Login: FC = (): ReactElement => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  console.log('rendered/rerendered');

  const checkChange = () => {
    console.log(inputRef.current ? inputRef.current.value : null);
  };

  return <input ref={inputRef} onChange={checkChange}></input>;
};

export default Login;
