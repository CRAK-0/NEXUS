import { createContext, useContext, useEffect, useState } from "react";
import {
  getCurrentUser,
  login as loginUser,
  logout as logoutUser,
} from "../services/authService";

interface User {
  id: number;
  username: string;
  email: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await getCurrentUser();

        if (response.success) {
          setUser(response.user);
        }
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (data: LoginData) => {
  try {
    const response = await loginUser(data);

    if (response.success) {
      setUser(response.user);
    }
  } catch (error) {
    throw error;
  }
};

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};