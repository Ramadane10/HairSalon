import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../config/firebaseConfig"; // adapte le chemin si besoin

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "" }} />
      <View style={styles.formContainer}>
        <Image
          source={require("../../assets/images/logo.jpg")} // adapte le chemin à ton logo
          style={styles.logo}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <View style={{ position: "relative" }}>
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={{ position: "absolute", right: 16, top: 18 }}
            onPress={() => setShowPassword((v) => !v)}
          >
            <Ionicons
              name={showPassword ? "eye" : "eye-off"}
              size={22}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        {loading ? (
          <View
            style={[
              styles.button,
              {
                opacity: 0.7,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <ActivityIndicator size="small" color="#000" />
            <Text style={[styles.buttonText, { marginLeft: 10 }]}>
              Connexion...
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              if (!email || !password) {
                Alert.alert("Erreur", "Veuillez renseigner tous les champs.");
                return;
              }
              setLoading(true);
              try {
                await signInWithEmailAndPassword(auth, email, password);
                router.replace("/(tabs)");
              } catch (error: any) {
                // Gestion des erreurs Firebase Auth
                if (
                  error.code === "auth/user-not-found" ||
                  error.code === "auth/wrong-password"
                ) {
                  Alert.alert("Erreur", "Email ou mot de passe incorrect.");
                } else if (error.code === "auth/invalid-email") {
                  Alert.alert("Erreur", "Format d'email invalide.");
                } else {
                  Alert.alert("Erreur", error.message);
                }
              }
              setLoading(false);
            }}
          >
            <Text style={styles.buttonText}>Se connecter</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => router.push({ pathname: "/auth/forgot-password" })}
        >
          <Text style={styles.link}>Mot de passe oublié ?</Text>
        </TouchableOpacity>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.createAccountButton}
            onPress={() => router.push({ pathname: "/auth/register" })}
          >
            <Text style={styles.createAccountText}>Créer un compte</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  createAccountButton: {
    borderWidth: 2,
    borderColor: "#FFD166",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    marginVertical: 12,
    backgroundColor: "#fff",
  },
  createAccountText: {
    color: "#FFD166",
    fontWeight: "bold",
    fontSize: 16,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  formContainer: {
    paddingHorizontal: 24, // ou la valeur que tu veux
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 24,
    marginTop: 32, // Ajoute une marge en haut
    borderRadius: 50, // Rend l'image ronde (si carré)
    borderWidth: 2,
    borderColor: "#FFD166", // Bordure orange
    backgroundColor: "#fff", // Fond blanc autour du logo
    padding: 8, // Optionnel, espace autour du logo si l'image a du transparent
  },
  showPasswordButton: {
    position: "absolute",
    right: 10,
    top: 10,
    padding: 8,
  },
  showPasswordText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
});

export default LoginScreen;
