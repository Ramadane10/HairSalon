import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db } from "../config/firebaseConfig";
import HeaderBar from "./HeaderBar";

// Table de correspondance id → require(image)
const serviceImages: Record<string, any> = {
  1: require("../assets/images/haircut-1.jpg"),
  2: require("../assets/images/haircut-1.jpg"),
  3: require("../assets/images/haircut-1.jpg"),
  4: require("../assets/images/haircut-1.jpg"),
  5: require("../assets/images/haircut-1.jpg"),
  // Mets ici les bons chemins/images pour chaque id
};

const barbers = [
  {
    id: 1,
    name: "Fatou",
    experience: "5 ans",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Aminata",
    experience: "3 ans",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    id: 3,
    name: "Moussa",
    experience: "7 ans",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
  },
];

type ServiceType = {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: any;
  hasArrow: boolean;
  hasCircle: boolean;
  category: string;
};

type ReservationProps = {
  service: ServiceType;
  onClose: () => void;
};

const Reservation: React.FC<ReservationProps> = ({ service, onClose }) => {
  const router = useRouter();
  const serviceId = service.id;
  const serviceTitle = service.title;
  const serviceImage = service.imageUrl;
  const [bookingStep, setBookingStep] = useState(0);
  type Barber = { id: number; name: string; experience: string; image: string };
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isFavorite, setIsFavorite] = useState(false);

  interface DateTimePickerEvent {
    type: string;
    nativeEvent: any;
  }

  const handleDateChange = (
    event: DateTimePickerEvent,
    date?: Date | undefined
  ): void => {
    setShowDatePicker(false);
    if (date) setSelectedDate(date);
  };

  interface TimePickerEvent {
    type: string;
    nativeEvent: any;
  }

  const handleTimeChange = (
    event: TimePickerEvent,
    time?: Date | undefined
  ): void => {
    setShowTimePicker(false);
    if (time) {
      const newDate = new Date(selectedDate);
      newDate.setHours(time.getHours());
      newDate.setMinutes(time.getMinutes());
      setSelectedDate(newDate);
    }
  };

  const handleReserve = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Erreur", "Vous devez être connecté.");
      return;
    }
    if (!selectedBarber) {
      Alert.alert("Erreur", "Veuillez sélectionner un expert.");
      return;
    }
    if (!selectedDate) {
      Alert.alert("Erreur", "Veuillez sélectionner une date et une heure.");
      return;
    }
    try {
      await addDoc(collection(db, "reservations"), {
        userId: user.uid,
        barberId: selectedBarber.id,
        barberName: selectedBarber.name,
        service: serviceTitle,
        date: selectedDate, // <-- stocke l'objet Date
        createdAt: new Date(),
      });
      Alert.alert("Succès", "Réservation enregistrée !");
      router.replace("/(tabs)/profile");
    } catch (error: any) {
      Alert.alert("Erreur", error.message);
    }
  };

  const handleToggleFavorite = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Erreur", "Vous devez être connecté.");
      return;
    }
    const serviceId = service.id;
    const serviceTitle = service.title;
    const favRef = doc(db, "favorites", `${user.uid}_${serviceId}`);
    try {
      if (isFavorite) {
        await deleteDoc(favRef);
        setIsFavorite(false);
      } else {
        await setDoc(favRef, {
          userId: user.uid,
          serviceId,
          serviceTitle,
          serviceImage: service.imageUrl,
          createdAt: new Date(),
        });
        setIsFavorite(true);
      }
    } catch (e) {
      Alert.alert("Erreur", "Impossible de modifier les favoris.");
    }
  };

  // Vérifie si le service est déjà dans les favoris à l'initialisation
  useEffect(() => {
    const checkFavorite = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const favRef = doc(db, "favorites", `${user.uid}_${serviceId}`);
      const favSnap = await getDoc(favRef);
      setIsFavorite(favSnap.exists());
    };
    checkFavorite();
  }, [serviceId]);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Réserver</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Service sélectionné */}
        <Text style={styles.serviceTitle}>
          {serviceTitle ? serviceTitle : "Service sélectionné"}
        </Text>
        <View style={{ position: "relative", marginBottom: 16 }}>
          {serviceImage && (
            <Image
              source={serviceImage}
              style={{
                width: "100%",
                height: 200,
                borderBottomLeftRadius: 24,
                borderBottomRightRadius: 24,
              }}
              resizeMode="cover"
            />
          )}
          <TouchableOpacity
            onPress={handleToggleFavorite}
            style={{
              position: "absolute",
              top: 16,
              right: 24,
              backgroundColor: "rgba(255,255,255,0.7)",
              borderRadius: 20,
              padding: 6,
            }}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={32}
              color="#FFD166"
            />
          </TouchableOpacity>
        </View>

        {/* Étapes */}
        <View style={styles.stepsRow}>
          {["Réservation", "Confirmation"].map((step, idx) => (
            <TouchableOpacity
              key={step}
              style={[styles.step, bookingStep === idx && styles.activeStep]}
              onPress={() => setBookingStep(idx)}
            >
              <Text
                style={[
                  styles.stepText,
                  bookingStep === idx && styles.activeStepText,
                ]}
              >
                {step}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Affichage selon l'étape */}
        {bookingStep === 0 ? (
          <>
            {/* Sélection de l'expert */}
            <Text style={styles.sectionLabel}>Choisir un expert</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginBottom: 16 }}
            >
              {barbers.map((barber) => (
                <TouchableOpacity
                  key={barber.id}
                  style={[
                    styles.barberCard,
                    selectedBarber?.id === barber.id &&
                      styles.selectedBarberCard,
                  ]}
                  onPress={() => setSelectedBarber(barber)}
                >
                  <View style={styles.barberAvatar}>
                    <Ionicons
                      name="person-circle-outline"
                      size={48}
                      color="#FFD166"
                    />
                  </View>
                  <Text style={styles.barberName}>{barber.name}</Text>
                  <Text style={styles.barberExp}>{barber.experience}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Sélection date et heure */}
            <Text style={styles.sectionLabel}>Date & Heure</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <TouchableOpacity
                style={[styles.timeSlot, { flex: 1 }]}
                onPress={() => setShowDatePicker(true)}
              >
                <Ionicons name="calendar-outline" size={18} color="#FFD166" />
                <Text style={{ marginLeft: 8 }}>
                  {selectedDate.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.timeSlot, { flex: 1, marginLeft: 12 }]}
                onPress={() => setShowTimePicker(true)}
              >
                <Ionicons name="time-outline" size={18} color="#FFD166" />
                <Text style={{ marginLeft: 8 }}>
                  {selectedDate.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </TouchableOpacity>
            </View>

            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
            {showTimePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="time"
                display="default"
                onChange={handleTimeChange}
              />
            )}

            {/* Bouton pour passer à la confirmation */}
            <TouchableOpacity
              style={{
                backgroundColor: "#FFD166",
                borderRadius: 8,
                padding: 14,
                alignItems: "center",
                marginTop: 16,
              }}
              onPress={() => setBookingStep(1)}
            >
              <Text
                style={{
                  color: "#000",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Confirmer
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          // Résumé de la réservation uniquement à l'étape Confirmation
          <View style={{ marginTop: 24 }}>
            <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 8 }}>
              Résumé de la réservation
            </Text>
            <Text>Service : {serviceTitle}</Text>
            <Text>Expert : {selectedBarber ? selectedBarber.name : "-"}</Text>
            <Text>
              Date : {selectedDate ? selectedDate.toLocaleDateString() : "-"} à{" "}
              {selectedDate
                ? selectedDate.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "-"}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#FFD166",
                borderRadius: 8,
                padding: 14,
                alignItems: "center",
                marginTop: 16,
              }}
              onPress={handleReserve}
            >
              <Text
                style={{
                  color: "#000",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Réserver
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: "600" },
  content: { padding: 16 },
  serviceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  stepsRow: { flexDirection: "row", marginBottom: 20 },
  step: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 6,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeStep: { borderBottomColor: "#FFD166" },
  stepText: { color: "#888", fontWeight: "500" },
  activeStepText: { color: "#000", fontWeight: "700" },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 16,
  },
  barberCard: {
    alignItems: "center",
    marginRight: 16,
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fafafa",
  },
  selectedBarberCard: { borderColor: "#FFD166", backgroundColor: "#FFF8E1" },
  barberAvatar: { marginBottom: 4 },
  barberName: { fontWeight: "600", fontSize: 14 },
  barberExp: { fontSize: 12, color: "#888" },
  timeSlot: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
    marginBottom: 8,
    marginRight: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedTimeSlot: { backgroundColor: "#FFD166" },
  timeSlotText: { color: "#888", fontWeight: "500" },
  selectedTimeSlotText: { color: "#000", fontWeight: "700" },
});

export default Reservation;
