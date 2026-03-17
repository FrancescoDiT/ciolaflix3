"use client";

import React, {createContext, useContext, useEffect, useState} from "react";

interface User {
  subject: string,
  roles: string[],
  firstName: string,
  lastName: string
}

interface UserContextType {
  user: User | null,
  setUser: (u: User | null) => void
  isAdmin: () => boolean
  loading: boolean
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider ({children} : {children: React.ReactNode}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('user');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {} finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const isAdmin = () => user?.roles.includes('ADMIN') ?? false

  return (
    <UserContext.Provider value={{user, setUser, isAdmin, loading}}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser must be used within UserProvider')
  return ctx
}
