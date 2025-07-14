import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  FC,
} from 'react';

type UserContextType = {
  userId: string | null;
  setUserId: (id: string | null) => void;
  logout: () => void;  // Add logout function type
};

const UserContext = createContext<UserContextType>({
  userId: null,
  setUserId: () => {},
  logout: () => {},   // Provide a default noop
});

export const useUser = () => useContext(UserContext);

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(() =>
    localStorage.getItem('userId')
  );

  // New logout function: clear state & localStorage
  const logout = () => {
    setUserId(null);
    localStorage.removeItem('userId');
  };

  return (
    <UserContext.Provider value={{ userId, setUserId, logout }}>
      {children}
    </UserContext.Provider>
  );
};

