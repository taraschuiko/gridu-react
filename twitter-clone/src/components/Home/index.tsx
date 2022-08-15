import React, { useContext } from 'react';
import Authentication from '../../contexts/Authentication';

export default function LogIn() {
  const authContext = useContext(Authentication.Context);

  return (
    <div>
      <h1>Home Page</h1>
      <span>{authContext?.user?.name}</span>
    </div>
  );
}
