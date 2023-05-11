import jwtDecode from 'jwt-decode';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface AuthUser {
  email: string;
  token: string;
  role: string;
}

interface TokenPayload {
  email: string;
  role: string;
}

interface AuthContextType {
  user: AuthUser | undefined;
  signedIn: boolean;
  signin: (token: string) => void;
  signout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | undefined>();
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const { email, role } = jwtDecode<TokenPayload>(token);
      setUser({
        email,
        token,
        role,
      });
      setSignedIn(true);
    }
  }, []);

  function signin(token: string) {
    const { email, role } = jwtDecode<TokenPayload>(token);
    localStorage.setItem('token', token);
    setUser({
      email,
      token,
      role,
    });
    setSignedIn(true);
  }

  function signout() {
    localStorage.removeItem('token');
    setUser(undefined);
    setSignedIn(false);
    console.log("Signed out");
  }

  const value = { user, signedIn, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

// eslint-disable-next-line no-undef
export function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  const location = useLocation();

  return !auth.user ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    children
  );
}