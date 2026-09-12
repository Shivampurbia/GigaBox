import { Redirect } from "expo-router";

import { useAuth } from "@/auth/AuthProvider";

export default function RootIndex() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return <Redirect href={isAuthenticated ? "/home" : "/login"} />;
}
