import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MenuItem from "../../components/MenuItem";
import { auth, db } from "../../config/firebaseConfig";
const ProfileScreen = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<{
    nom: string;
    prenom: string;
    email: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editNom, setEditNom] = useState("");
  const [editPrenom, setEditPrenom] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data() as any);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userData) {
      setEditNom(userData.nom);
      setEditPrenom(userData.prenom);
      setEditEmail(userData.email);
    }
  }, [userData]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator
          size="large"
          color="#FFB800"
          style={{ marginTop: 40 }}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {editMode ? (
          <View style={styles.editFormContainer}>
            <Text style={styles.editFormTitle}>Modifier le profil</Text>
            <Text style={styles.inputLabel}>Nom</Text>
            <TextInput
              style={styles.input}
              placeholder="Nom"
              value={editNom}
              onChangeText={setEditNom}
            />
            <Text style={styles.inputLabel}>Prénom</Text>
            <TextInput
              style={styles.input}
              placeholder="Prénom"
              value={editPrenom}
              onChangeText={setEditPrenom}
            />
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={editEmail}
              onChangeText={setEditEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={async () => {
                  try {
                    const user = auth.currentUser;
                    if (user) {
                      await setDoc(
                        doc(db, "users", user.uid),
                        { nom: editNom, prenom: editPrenom, email: editEmail },
                        { merge: true }
                      );
                      setUserData({
                        nom: editNom,
                        prenom: editPrenom,
                        email: editEmail,
                      });
                      setEditMode(false);
                      Alert.alert("Succès", "Profil mis à jour !");
                    }
                  } catch (error: any) {
                    Alert.alert("Erreur", error.message);
                  }
                }}
              >
                <Text style={styles.editButtonText}>Enregistrer</Text>
              </TouchableOpacity>
              <View style={{ width: 16 }} />
              <TouchableOpacity
                style={[styles.editButton, { backgroundColor: "#888" }]}
                onPress={() => setEditMode(false)}
              >
                <Text style={styles.editButtonText}>Annuler</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            {/* En-tête du profil */}
            <View style={styles.profileHeader}>
              <View style={styles.avatarContainer}>
                <Image
                  source={require("../../assets/images/profile-avatar.jpg")}
                  style={styles.avatar}
                />
              </View>
              <Text style={styles.userName}>
                {userData ? `${userData.nom} ${userData.prenom}` : "Nom Prénom"}
              </Text>
              <Text style={styles.userEmail}>
                {userData ? userData.email : "Email"}
              </Text>

              <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  if (userData) {
                    setEditNom(userData.nom);
                    setEditPrenom(userData.prenom);
                    setEditEmail(userData.email);
                    setEditMode(true);
                  }
                }}
              >
                <Text style={styles.editButtonText}>Modifier le profil</Text>
              </TouchableOpacity>
            </View>

            {/* Menu du profil */}
            <View style={styles.menuContainer}>
              <MenuItem
                icon="calendar-outline"
                title="Mes rendez-vous"
                subtitle="Vos réservations à venir"
              />
              <MenuItem
                icon="cut-outline"
                title="Mes styles sauvegardés"
                subtitle="Collection de styles favoris"
                onPress={() => router.replace("/(tabs)/favoris")}
              />

              <MenuItem
                icon="settings-outline"
                title="Paramètres"
                subtitle="Préférences et confidentialité"
                onPress={() => setShowSettings(true)}
              />
              <MenuItem
                icon="settings-outline"
                title="A propos "
                subtitle="Informations sur l'application"
                onPress={() => setShowAbout(true)}
              />
              <MenuItem
                icon="help-circle-outline"
                title="Aide"
                subtitle="Support et FAQ"
              />
              <MenuItem
                icon="log-out-outline"
                title="Déconnexion"
                subtitle="Se déconnecter de l'application"
                isLast
                onPress={async () => {
                  try {
                    await signOut(auth);
                    // La redirection se fera automatiquement grâce à ton _layout.tsx
                  } catch (error: any) {
                    Alert.alert("Erreur", error.message);
                  }
                }}
              />
            </View>
          </>
        )}
      </ScrollView>

      <Modal
        visible={showSettings}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setShowSettings(false)}
      >
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#FFF",
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              marginBottom: 16,
            }}
          >
            Paramètres
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#444",
              marginBottom: 24,
            }}
          >
            Ici tu pourras bientôt gérer tes préférences et ta confidentialité.
          </Text>
          <TouchableOpacity
            style={[styles.editButton, { paddingHorizontal: 32 }]}
            onPress={() => setShowSettings(false)}
          >
            <Text style={styles.editButtonText}>Fermer</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>

      <Modal
        visible={showAbout}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setShowAbout(false)}
      >
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#FFF",
            padding: 24,
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 16 }}>
            À propos du salon
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#444",
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            Bienvenue chez Cassanova!
            <br />
            Notre salon de coiffure vous propose :
            <br />
            - Coupes hommes, femmes et enfants
            <br />
            - Soin du visage, henné, massages
            <br />
            - Réservation en ligne rapide
            <br />
            - Gestion de vos favoris et de vos rendez-vous
            <br />
            <br />
            Notre équipe de professionnels vous accueille dans une ambiance
            chaleureuse pour révéler votre style.
            <br />
            <br />
            Merci de votre confiance !
          </Text>
          <TouchableOpacity
            style={[styles.editButton, { paddingHorizontal: 32 }]}
            onPress={() => setShowAbout(false)}
          >
            <Text style={styles.editButtonText}>Fermer</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 32,
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F0F0F0",
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
  },
  userEmail: {
    fontSize: 14,
    color: "#888888",
    marginTop: 4,
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: "#FFB800",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  editButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  menuContainer: {
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginHorizontal: 16,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    width: "90%",
  },
  inputLabel: {
    alignSelf: "flex-start",
    marginLeft: "5%",
    marginBottom: 4,
    fontWeight: "600",
    color: "#444",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  editFormContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
  },
  editFormTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#222",
  },
});

export default ProfileScreen;
