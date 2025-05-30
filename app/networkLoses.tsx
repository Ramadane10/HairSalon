// App.tsx ou dans ton layout principal
import NetInfo from "@react-native-community/netinfo";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

const NetworkBanner = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(
        Boolean(state.isConnected) && state.isInternetReachable !== false
      );
    });
    return () => unsubscribe();
  }, []);

  if (isConnected) return null;
  return (
    <View style={{ backgroundColor: "#FF3B30", padding: 8 }}>
      <Text style={{ color: "#fff", textAlign: "center" }}>
        Pas de connexion Internet
      </Text>
    </View>
  );
};

export default function App() {
  return (
    <>
      <NetworkBanner />
      {/* ...le reste de ton app... */}
    </>
  );
}
