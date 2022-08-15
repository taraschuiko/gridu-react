import React, { createContext, useState } from 'react';
import axios from 'axios';

type User = {
  'id': String,
  'name': String,
  'email': String
}

type ContextValue = {
  user: User | null,
  // eslint-disable-next-line no-unused-vars
  login: (username: String) => void
}

const Context = createContext<ContextValue | null>(null);

function Provider({ children } : { children: React.ReactNode}) {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: String) => {
    axios.get(`http://localhost:3001/users/${username}`).then((r) => setUser(r.data));
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <Context.Provider value={{ user, login }}>
      {children}
    </Context.Provider>
  );
}

export default { Context, Provider };
