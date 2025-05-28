import { useRouter, Stack } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebaseConfig"; // adapte le chemin si besoin
import { Alert } from "react-native";

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "" }} />
      <Text style={styles.title}>Connexion</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={() => router.push({ pathname: "/auth/forgot-password" })}>
        <Text style={styles.link}>Mot de passe oublié ?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
            try {
            await signInWithEmailAndPassword(auth, email, password);
            router.replace("/(tabs)");
            } catch (error: any) {
            Alert.alert("Erreur", error.message);
            }
        }}
        >
        <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push({ pathname: "/auth/register" })}>
        <Text style={styles.link}>Créer un compte</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#FFD166",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    marginVertical: 12,
  },
  buttonText: { color: "#000", fontWeight: "bold", fontSize: 16 },
  link: { color: "#FFD166", textAlign: "center", marginTop: 8 },
});

export default LoginScreen;
