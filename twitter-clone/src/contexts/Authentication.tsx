import React, { createContext, useState } from 'react';
import axios from 'axios';

type User = {
  'id': string,
  'name': string,
  'email': string
}

type ContextValue = {
  user: User | null,
  // eslint-disable-next-line no-unused-vars
  login: (username: String) => Promise<string | void | null>
  // eslint-disable-next-line no-unused-vars
  signup: (username: String, email: String) => Promise<string | void>
}

const Context = createContext<ContextValue | null>(null);

function Provider({ children } : { children: React.ReactNode}) {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: String) => axios.get(`http://localhost:3001/users/${username}`).then((r) => {
    setUser(r.data);
  }).catch(({ response }) => {
    if (response.status === 404) {
      return 'Invalid email or password';
    }
    return 'Something went wrong';
  });

  const signup = (username: String, email: String) => axios.post('http://localhost:3001/users/', {
    name: username,
    email,
  }).then((r) => {
    setUser(r.data);
  }).catch(() => 'Something went wrong');

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <Context.Provider value={{ user, login, signup }}>
      {children}
    </Context.Provider>
  );
}

export default { Context, Provider };
