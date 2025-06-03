import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebaseConfig'; // adapte si besoin

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!isReady) {
        setError('Connexion lente. Patientez encore un instant...');
        // Ne pas appeler setIsReady ici
      }
    }, 6000); // Affiche message après 6 secondes si rien ne se passe

    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        clearTimeout(timeoutId); // Empêche le timeout
        setIsAuthenticated(!!user);
        setIsReady(true);

        const inAuthGroup = segments[0] === 'auth';

        if (!!user && inAuthGroup) {
          router.replace('/(tabs)');
        } else if (!user && !inAuthGroup) {
          router.replace('/auth/login');
        }
      },
      (firebaseError) => {
        clearTimeout(timeoutId);
        console.error('Firebase Auth Error:', firebaseError);
        setError('Erreur de connexion à Firebase.');
        setIsReady(true);
      }
    );

    return () => {
      clearTimeout(timeoutId);
      unsubscribe();
    };
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <StatusBar style="dark" />
        <ActivityIndicator size="large" color="#0000ff" />
        {error && (
          <Text style={{ textAlign: 'center', marginTop: 15, color: 'red', paddingHorizontal: 20 }}>
            {error}
          </Text>
        )}
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="services"
          options={{
            headerShown: false,
            presentation: 'modal',
          }}
        />
      </Stack>
    </View>
  );
}
