import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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

const ReservationScreen = () => {
  const router = useRouter();
  const { serviceTitle } = useLocalSearchParams();
  const [bookingStep, setBookingStep] = useState(0);
  type Barber = { id: number; name: string; experience: string; image: string };
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

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

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
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

        {/* Étapes */}
        <View style={styles.stepsRow}>
          {["Réservation", "Infos", "Paiement", "Confirmation"].map(
            (step, idx) => (
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
            )
          )}
        </View>

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
                selectedBarber?.id === barber.id && styles.selectedBarberCard,
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

export default ReservationScreen;
