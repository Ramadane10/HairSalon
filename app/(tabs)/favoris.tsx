import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db } from "../../config/firebaseConfig";

const serviceImages: Record<string, any> = {
  1: require("../../assets/images/haircut-1.jpg"),
  2: require("../../assets/images/haircut-1.jpg"),
  3: require("../../assets/images/haircut-1.jpg"),
  4: require("../../assets/images/haircut-1.jpg"),
  5: require("../../assets/images/haircut-1.jpg"),
};

type Service = {
  id: string;
  title: string;
  image: string | number;
  // ajoute d'autres champs si besoin
};

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  type RootStackParamList = {
    Reservation: {
      serviceId: any;
      serviceTitle: any;
      serviceImage: any;
    };
    // add other screens here if needed
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const fetchFavorites = async () => {
    const user = auth.currentUser;
    if (!user) return;
    const q = query(
      collection(db, "favorites"),
      where("userId", "==", user.uid)
    );
    const querySnapshot = await getDocs(q);
    const favs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setFavorites(favs);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) fetchFavorites();
    });
    return () => unsubscribe();
  }, []);

  // Fonction pour retirer un favori
  const removeFavorite = async (favId: string) => {
    try {
      await deleteDoc(doc(db, "favorites", favId));
      setFavorites((prev) => prev.filter((f) => f.id !== favId));
    } catch (e) {
      console.log("Erreur suppression favori :", e);
    }
  };

  // Fonction pour ajouter un favori
  const addFavorite = async (
    serviceId: any,
    serviceTitle: any,
    serviceImage: any
  ) => {
    try {
      if (!auth.currentUser) {
        console.log(
          "Utilisateur non connecté, impossible d'ajouter un favori."
        );
        return;
      }

      await addDoc(collection(db, "favorites"), {
        userId: auth.currentUser.uid,
        serviceId,
        serviceTitle,
        serviceImage,
      });

      // Recharge la liste des favoris depuis Firestore
      fetchFavorites();
    } catch (e) {
      console.log("Erreur ajout favori :", e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* <View style={styles.content}>
          <Ionicons name="heart" size={64} color="#FFB800" />
          <Text style={styles.title}>Vos favoris</Text>
          <Text style={styles.description}>
            Marquez vos salons et styles de coiffure préférés pour un accès
            rapide.
          </Text>
        </View> */}
        <Text style={{ fontSize: 18, fontWeight: "bold", margin: 20 }}>
          Mes favoris
        </Text>
        {favorites.length === 0 && (
          <Text style={{ margin: 16 }}>Aucun favori pour l’instant.</Text>
        )}
        {favorites.map((fav) => (
          <View
            key={fav.serviceId}
            style={{ margin: 16, flexDirection: "row", alignItems: "center" }}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Reservation", {
                  serviceId: fav.serviceId,
                  serviceTitle: fav.serviceTitle,
                  serviceImage: fav.serviceImage,
                })
              }
              style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
            >
              <Image
                source={serviceImages[fav.serviceImage]}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 8,
                  marginRight: 12,
                }}
              />
              <Text style={{ fontSize: 16 }}>{fav.serviceTitle}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeFavorite(fav.id)}>
              <Ionicons name="heart" size={28} color="#FFB800" />
            </TouchableOpacity>
          </View>
        ))}
        
        {services.map((service) => (
          <View
            key={service.id}
            style={{ flexDirection: "row", alignItems: "center", margin: 16 }}
          >
            <Image
              source={serviceImages[service.image]}
              style={{
                width: 60,
                height: 60,
                borderRadius: 8,
                marginRight: 12,
              }}
            />
            <Text style={{ fontSize: 16 }}>{service.title}</Text>
            <TouchableOpacity
              onPress={() =>
                addFavorite(service.id, service.title, service.image)
              }
              style={{ marginLeft: "auto" }}
            >
              <Ionicons name="heart-outline" size={28} color="#FFB800" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#888888",
    textAlign: "center",
  },
});

export default FavoritesScreen;
