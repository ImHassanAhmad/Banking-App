import React, { createContext, useContext, useState, type PropsWithChildren } from 'react';

interface AuthContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialState: AuthContextProps = {
  isLoggedIn: false
};

const AuthContext = createContext<AuthContextProps>(initialState);

const { Consumer: AuthConsumer, Provider } = AuthContext;

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(initialState.isLoggedIn);

  const values: AuthContextProps = {
    isLoggedIn,
    setIsLoggedIn
  };

  return <Provider value={values}>{children}</Provider>;
};

export const useAuth = (): AuthContextProps => useContext(AuthContext);

export { AuthConsumer, AuthProvider };
