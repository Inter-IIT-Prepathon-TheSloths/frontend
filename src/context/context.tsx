import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios from '../utils/axiosInstance';
import { AxiosResponse } from 'axios';

interface User {
  id?: string;
  name?: string;
  emails?: [string];
  picture?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res: AxiosResponse<User> = await axios.get("/auth/me", {
            "headers": { "Authorization": `Bearer ${token}` },
          });
          if (res.data)
            setUser(res.data);
          else {
            localStorage.removeItem("token")
            setUser({})
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          localStorage.removeItem("token")
          setUser({});
        }
      } else {
        setUser({});
      }
    };
    fetchUser()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
