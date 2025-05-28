import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../config/firebaseConfig"; // adapte le chemin si besoin
import { Alert } from "react-native";

const ForgotPasswordScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mot de passe oublié</Text>
      <Text style={{ marginBottom: 16, textAlign: "center" }}>
        Entrez votre email pour recevoir un lien de réinitialisation.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
            if (!email) {
            Alert.alert("Erreur", "Veuillez entrer votre email.");
            return;
            }
            try {
            await sendPasswordResetEmail(auth, email);
            Alert.alert(
                "Succès",
                "Un email de réinitialisation a été envoyé. Vérifiez votre boîte mail."
            );
            router.push("/auth/login");
            } catch (error: any) {
            Alert.alert("Erreur", error.message);
            }
        }}
      >
        <Text style={styles.buttonText}>Envoyer</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/auth/login")}>
        <Text style={styles.link}>Retour à la connexion</Text>
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

export default ForgotPasswordScreen;
