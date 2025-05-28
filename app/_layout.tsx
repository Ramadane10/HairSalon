import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebaseConfig"; // adapte le chemin si besoin

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Écoute l'état de connexion Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setIsReady(true);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!isReady) return;
    const inAuthGroup = segments[0] === "auth";
    if (!isAuthenticated && !inAuthGroup) {
      router.replace("/auth/login");
    }
    if (isAuthenticated && inAuthGroup) {
      router.replace("/(tabs)");
    }
  }, [isAuthenticated, segments, isReady]);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="services"
          options={{
            headerShown: false,
            presentation: 'modal'
          }}
        />
      </Stack>
    </View>
  );
}