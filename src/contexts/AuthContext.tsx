
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  showWorkspaceSelection: boolean;
  login: () => void;
  selectWorkspace: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showWorkspaceSelection, setShowWorkspaceSelection] = useState(false);

  const login = () => {
    setShowWorkspaceSelection(true);
  };

  const selectWorkspace = () => {
    setShowWorkspaceSelection(false);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setShowWorkspaceSelection(false);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      showWorkspaceSelection,
      login,
      selectWorkspace,
      logout
    }}>
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
