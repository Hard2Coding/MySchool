import React, { createContext, useContext, useMemo, useState } from 'react';
import { USERS } from '../data/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // matched USERS record
  const [activeRole, setActiveRole] = useState(null); // 'student' | 'parent' | 'teacher' | 'admin'
  const [error, setError] = useState(null);
  const [acceptedPdpaUsers, setAcceptedPdpaUsers] = useState({});

  const login = (username, password) => {
    setError(null);
    const found = USERS.find(
      (u) => u.username === username.trim() && u.password === password
    );
    if (!found) {
      setError('รหัสผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
      return { ok: false };
    }
    setUser(found);
    if (found.roles.length === 1) {
      setActiveRole(found.roles[0]);
    }
    return { ok: true, roles: found.roles };
  };

  const acceptPdpa = () => {
    if (user) {
      setAcceptedPdpaUsers((prev) => ({
        ...prev,
        [user.id || user.username]: true,
      }));
    }
  };

  const hasAcceptedPdpa = user ? Boolean(acceptedPdpaUsers[user.id || user.username]) : false;

  const chooseRole = (role) => setActiveRole(role);

  const logout = () => {
    setUser(null);
    setActiveRole(null);
    setError(null);
  };

  const value = useMemo(
    () => ({
      user,
      activeRole,
      error,
      login,
      chooseRole,
      logout,
      hasAcceptedPdpa,
      acceptPdpa,
    }),
    [user, activeRole, error, hasAcceptedPdpa]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
