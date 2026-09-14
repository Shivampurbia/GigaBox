import NetInfo from "@react-native-community/netinfo";
import type { PropsWithChildren } from "react";
import { createContext, useContext, useEffect, useState } from "react";

type ConnectivityContextValue = {
  isOnline: boolean;
};

const ConnectivityContext = createContext<ConnectivityContextValue | null>(
  null,
);

function isConnected(state: {
  isConnected: boolean | null;
  isInternetReachable: boolean | null;
}) {
  return state.isConnected === true && state.isInternetReachable !== false;
}

export function ConnectivityProvider({ children }: PropsWithChildren) {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    return NetInfo.addEventListener((state) => {
      setIsOnline(isConnected(state));
    });
  }, []);

  return (
    <ConnectivityContext.Provider value={{ isOnline }}>
      {children}
    </ConnectivityContext.Provider>
  );
}

export function useConnectivity() {
  const context = useContext(ConnectivityContext);

  if (!context) {
    throw new Error("useConnectivity must be used inside ConnectivityProvider");
  }

  return context;
}
