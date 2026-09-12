import AsyncStorage from "@react-native-async-storage/async-storage";
import type { PropsWithChildren } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AUTH_STORAGE_KEY = "GIGABOX_AUTHENTICATED";

type AuthContextValue = {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    void AsyncStorage.getItem(AUTH_STORAGE_KEY).then((value) => {
      setIsAuthenticated(value === "true");
      setIsLoading(false);
    });
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      isLoading,
      login: async () => {
        await AsyncStorage.setItem(AUTH_STORAGE_KEY, "true");
        setIsAuthenticated(true);
      },
    }),
    [isAuthenticated, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
