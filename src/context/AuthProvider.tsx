"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextValue {
  isAuthenticated: boolean;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
  showAuthModal: true,
  setShowAuthModal: () => {},
  login: () => {},
  logout: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("authenticated");
    if (saved === "true") {
      setIsAuthenticated(true);
      setShowAuthModal(false);
    } else {
      setShowAuthModal(true);
    }
    setMounted(true);
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    setShowAuthModal(false);
    localStorage.setItem("authenticated", "true");
  };

  const logout = () => {
    setIsAuthenticated(false);
    setShowAuthModal(true);
    localStorage.removeItem("authenticated");
  };

  if (!mounted) return <>{children}</>;

  return (
    <AuthContext.Provider value={{ isAuthenticated, showAuthModal, setShowAuthModal, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
