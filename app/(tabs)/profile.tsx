import { Ionicons } from "@expo/vector-icons";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db } from "../../config/firebaseConfig";

const ProfileScreen = () => {
  const [userData, setUserData] = useState<{
    nom: string;
    prenom: string;
    email: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data() as any);
        }
      }
      setLoading(false);
    };
    fetchUserData();
  }, []);

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

          <TouchableOpacity style={styles.editButton}>
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
          />
          <MenuItem
            icon="card-outline"
            title="Paiements"
            subtitle="Gérer vos modes de paiement"
          />
          <MenuItem
            icon="settings-outline"
            title="Paramètres"
            subtitle="Préférences et confidentialité"
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
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Composant d'élément de menu
const MenuItem = ({
  icon,
  title,
  subtitle,
  isLast = false,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  isLast?: boolean;
}) => (
  <TouchableOpacity
    style={[styles.menuItem, isLast ? styles.lastMenuItem : {}]}
  >
    <View style={styles.menuIconContainer}>
      <Ionicons name={icon} size={22} color="#000000" />
    </View>
    <View style={styles.menuTextContainer}>
      <Text style={styles.menuTitle}>{title}</Text>
      <Text style={styles.menuSubtitle}>{subtitle}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#888888" />
  </TouchableOpacity>
);

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
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  menuSubtitle: {
    fontSize: 12,
    color: "#888888",
    marginTop: 2,
  },
});

export default ProfileScreen;
