import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebaseConfig"; // adapte le chemin si besoin

const RegisterScreen = () => {
  const router = useRouter();
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async () => {
    if (!nom || !prenom || !email || !password || !confirmPassword) {
      Alert.alert("Erreur", "Tous les champs sont obligatoires.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas.");
      return;
    }
    setLoading(true); // Démarre le loader
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        nom,
        prenom,
        email,
        createdAt: new Date(),
      });

      Alert.alert("Succès", "Compte créé avec succès !");
      router.replace("/(tabs)");
    } catch (error: any) {
      console.log(error);
      Alert.alert("Erreur", error.message);
    }
    setLoading(false); // Arrête le loader
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "" }} />
      <Text style={styles.title}>Créer un compte</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={nom}
        onChangeText={setNom}
      />
      <TextInput
        style={styles.input}
        placeholder="Prénom"
        value={prenom}
        onChangeText={setPrenom}
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
            name={showPassword ? "eye" : "eye-off"} // Affiche l'œil ouvert quand masqué, barré quand visible
            size={22}
            color="#888"
          />
        </TouchableOpacity>
      </View>
      <View style={{ position: "relative" }}>
        <TextInput
          style={styles.input}
          placeholder="Confirmer le mot de passe"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          style={{ position: "absolute", right: 16, top: 18 }}
          onPress={() => setShowConfirmPassword((v) => !v)}
        >
          <Ionicons
            name={showConfirmPassword ? "eye" : "eye-off"}
            size={22}
            color="#888"
          />
        </TouchableOpacity>
      </View>
      {loading ? (
        <TouchableOpacity style={[styles.button, { opacity: 0.7 }]} disabled>
          <ActivityIndicator color="#000" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>S&apos;inscrire</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => router.push("/auth/login")}>
        <Text style={styles.link}>Déjà un compte ? Se connecter</Text>
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

export default RegisterScreen;
