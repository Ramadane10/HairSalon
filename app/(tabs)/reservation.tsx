import { Ionicons } from "@expo/vector-icons";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { auth, db } from "../../config/firebaseConfig";

export default function ReservationListScreen() {
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("UID connecté :", user?.uid);
      if (!user) {
        setReservations([]);
        setLoading(false);
        return;
      }
      try {
        const q = query(
          collection(db, "reservations"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Réservations récupérées :", data);
        setReservations(data);
      } catch (e: any) {
        if (
          e.message?.includes("Failed to fetch") ||
          e.message?.includes("network") ||
          e.code === "unavailable"
        ) {
          setNetworkError(true);
        } else {
          setReservations([]);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (reservationId: string) => {
    console.log("Suppression demandée pour :", reservationId);
    try {
      await deleteDoc(doc(db, "reservations", reservationId));
      setReservations((prev) => prev.filter((r) => r.id !== reservationId));
    } catch (e) {
      alert("Erreur lors de la suppression.");
      console.log(e);
    }
  };

  const sortedReservations = [...reservations].sort((a, b) => {
    const dateA = a.date?.toDate ? a.date.toDate() : new Date(a.date);
    const dateB = b.date?.toDate ? b.date.toDate() : new Date(b.date);
    return dateB.getTime() - dateA.getTime(); // du plus récent au plus ancien
  });

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
      <Text style={styles.header}>Mes réservations</Text>
      {/* <Text style={{ textAlign: "center" }}>
        Nombre de réservations : {reservations.length}
      </Text> */}
      <ScrollView>
        {networkError ? (
          <Text style={styles.empty}>
            Problème de connexion Internet. Veuillez vérifier votre réseau.
          </Text>
        ) : sortedReservations.length === 0 ? (
          <Text style={styles.empty}>Aucune réservation trouvée.</Text>
        ) : (
          sortedReservations.map((res) => (
            <View key={res.id} style={styles.card}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.title}>{res.service}</Text>
                <Ionicons
                  name="trash-outline"
                  size={22}
                  color="#FF3B30"
                  style={{ marginLeft: 8 }}
                  onPress={() =>
                    Alert.alert(
                      "Supprimer",
                      "Voulez-vous vraiment supprimer cette réservation ?",
                      [
                        { text: "Annuler", style: "cancel" },
                        {
                          text: "Supprimer",
                          style: "destructive",
                          onPress: () => handleDelete(res.id),
                        },
                      ]
                    )
                  }
                />
              </View>
              <Text>Coiffeur : {res.barberName}</Text>
              <Text>
                Date :{" "}
                {res.date?.toDate
                  ? res.date.toDate().toLocaleString()
                  : String(res.date)}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 24 },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    alignSelf: "center",
  },
  empty: { textAlign: "center", marginTop: 40, color: "#888" },
  card: {
    backgroundColor: "#F5F5F5", // gris clair moderne
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 1,
  },
  title: { fontWeight: "bold", fontSize: 16, marginBottom: 4 },
});
