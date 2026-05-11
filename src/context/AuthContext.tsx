'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Role, clients, therapists, admins } from '../data/mock-data';

import { ClientTier } from '../data/mock-data';

interface AuthContextType {
  user: User | null;
  role: Role | null;
  login: (role: Role) => void;
  logout: () => void;
  switchTier: (tier: ClientTier) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);

  const login = (newRole: Role) => {
    setRole(newRole);
    if (newRole === 'client') {
      setUser(clients[0]); // Priya Sharma
    } else if (newRole === 'therapist') {
      setUser(therapists[0]); // Meera Krishnan
    } else if (newRole === 'admin') {
      setUser(admins[0]); // System Admin
    }
  };

  const logout = () => {
    setUser(null);
    setRole(null);
  };

  const switchTier = (tier: ClientTier) => {
    if (user && user.role === 'client') {
      setUser({ ...user, tier });
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout, switchTier }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
