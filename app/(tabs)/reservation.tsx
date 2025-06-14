import { Ionicons } from "@expo/vector-icons";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
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
  TouchableOpacity,
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
      console.log("Suppression réussie");
    } catch (e) {
      alert("Erreur lors de la suppression.");
      console.log("Erreur Firestore :", e);
    }
  };

  const handleConfirm = async (reservationId: string) => {
    try {
      await updateDoc(doc(db, "reservations", reservationId), { confirmed: true });
      setReservations((prev) =>
        prev.map((r) =>
          r.id === reservationId ? { ...r, confirmed: true } : r
        )
      );
      Alert.alert("Merci", "Confirmation enregistrée !");
    } catch (e) {
      Alert.alert("Erreur", "Impossible de confirmer la réservation.");
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
      <ScrollView>
        {networkError ? (
          <Text style={styles.empty}>
            Problème de connexion Internet. Veuillez vérifier votre réseau.
          </Text>
        ) : sortedReservations.length === 0 ? (
          <Text style={styles.empty}>Aucune réservation trouvée.</Text>
        ) : (
          sortedReservations.map((res) => {
            const now = new Date();
            const resDate = res.date?.toDate
              ? res.date.toDate()
              : new Date(res.date);
            const isPast = resDate < now;

            return (
              <View key={res.id} style={styles.card}>
                {/* Ligne titre + badge */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.title}>{res.service}</Text>
                  <Text
                    style={{
                      color: isPast ? "#FF3B30" : "#FFD600",
                      fontWeight: "bold",
                      fontSize: 13,
                      backgroundColor: isPast ? "#fdecea" : "#FFFBEA",
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 8,
                      marginLeft: 8,
                    }}
                  >
                    {isPast ? "Passée" : "À venir"}
                  </Text>
                </View>
                {/* Coiffeur */}
                <Text style={styles.label}>
                  Coiffeur : <Text style={styles.value}>{res.barberName}</Text>
                </Text>
                {/* Ligne date + poubelle */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.label}>
                    Date: <Text style={styles.value}>
                      {res.date?.toDate
                        ? res.date.toDate().toLocaleString()
                        : String(res.date)}
                    </Text>
                  </Text>
                  {isPast ? (
                    <TouchableOpacity
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
                    >
                      <Ionicons
                        name="trash-outline"
                        size={18}
                        color="#FF3B30"
                      />
                    </TouchableOpacity>
                  ) : (
                    <Text
                      style={styles.cancelBtn}
                      onPress={() => handleDelete(res.id)}
                    >
                      Annuler
                    </Text>
                  )}
                </View>
                {/* Bouton de confirmation après la prestation */}
                {isPast && !res.confirmed && (
                  <TouchableOpacity
                    style={styles.confirmBtn}
                    onPress={() => handleConfirm(res.id)}
                  >
                    <Text style={styles.confirmBtnText}>
                      Confirmer
                    </Text>
                  </TouchableOpacity>
                )}
                {isPast && res.confirmed && (
                  <Text style={styles.confirmedText}>
                    ✔️ Prestation confirmée
                  </Text>
                )}
              </View>
            );
          })
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
    color: "#222",
  },
  empty: { textAlign: "center", marginTop: 40, color: "#888" },
  card: {
    backgroundColor: "#FFF",
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    elevation: 1,
    borderWidth: 1,
    borderColor: "#EEE",
    shadowColor: "#FFD600",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  title: { fontWeight: "bold", fontSize: 16, marginBottom: 4, color: "#222" },
  label: { color: "#888", fontSize: 14 },
  value: { color: "#222", fontWeight: "600" },
  cancelBtn: {
    color: "#FF3B30",
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: "#fdecea",
    overflow: "hidden",
  },
  confirmBtn: {
    backgroundColor: "#FFD600",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
    alignItems: "center",
    marginTop: 10,
    alignSelf: "flex-end", // Place le bouton à droite
    minWidth: 90, // Petit bouton
  },
  confirmBtnText: {
    color: "#222",
    fontWeight: "bold",
    fontSize: 13,
  },
  confirmedText: {
    color: "#FFD600",
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
});
