// context/AuthContext.js
import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUsername = localStorage.getItem('username');
    setIsLoggedIn(loggedIn);
    setUsername(storedUsername || '');
    setIsLoading(false);
  }, []);


  // Advanced Logout
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'isLoggedIn' || event.key === 'username' || event.key === 'user_id' || event.key === 'user_role') {
        // Remove the items if any change is detected
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        localStorage.removeItem('hasShownToast');
        // Update state to log out the user
        setIsLoggedIn(false);
        setUsername('');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  // Advanced Logout


  const login = (username,userId,userRole) => {
    setIsLoggedIn(true);
    setUsername(username);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', username);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('hasShownToast');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
