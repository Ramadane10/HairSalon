import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const notifications = [
  {
    id: 1,
    title: "Rendez-vous confirmé",
    message: "Votre rendez-vous du 5 juin à 14h est confirmé.",
    icon: "calendar-check-outline",
    detail: "Vous avez rendez-vous avec Fatou le 5 juin à 14h pour une coupe classique. Merci d'arriver 5 minutes en avance.",
  },
  {
    id: 2,
    title: "Nouveau service disponible",
    message: "Essayez notre nouveau soin du visage relaxant !",
    icon: "sparkles-outline",
    detail: "Découvrez notre soin du visage relaxant, idéal pour tous types de peaux. Profitez d'une offre de lancement exclusive cette semaine.",
  },
  {
    id: 3,
    title: "Offre spéciale",
    message: "10% de réduction sur toutes les coupes cette semaine.",
    icon: "pricetag-outline",
    detail: "Bénéficiez de 10% de réduction sur toutes les coupes du 3 au 10 juin. Offre valable en salon uniquement.",
  },
  {
    id: 4,
    title: "Favori ajouté",
    message: "Vous avez ajouté 'Coupe homme' à vos favoris.",
    icon: "heart-outline",
    detail: "Retrouvez vos services favoris dans votre profil pour réserver plus rapidement la prochaine fois.",
  },
  {
    id: 5,
    title: "Rappel de rendez-vous",
    message: "N'oubliez pas votre rendez-vous demain à 10h.",
    icon: "alarm-outline",
    detail: "Votre rendez-vous avec Aminata est prévu demain à 10h. Pensez à confirmer votre présence.",
  },
  {
    id: 6,
    title: "Bienvenue chez Cassanova",
    message: "Merci de rejoindre notre salon ! Découvrez nos services.",
    icon: "happy-outline",
    detail: "Bienvenue ! Parcourez nos services et profitez d'une expérience beauté unique chez Cassanova.",
  },
];

export default function NotificationScreen() {
  const [selectedNotif, setSelectedNotif] = useState<typeof notifications[0] | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {notifications.map((notif) => (
          <TouchableOpacity
            key={notif.id}
            style={styles.notifContainer}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel={`Notification : ${notif.title}`}
            onPress={() => setSelectedNotif(notif)}
          >
            <View style={styles.iconCircle}>
              <Ionicons
                name={notif.icon as any}
                size={24}
                color="#FFB800"
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{notif.title}</Text>
              <Text style={styles.message}>{notif.message}</Text>
            </View>
          </TouchableOpacity>
        ))}
        {notifications.length === 0 && (
          <Text style={styles.empty}>Aucune notification pour le moment.</Text>
        )}
      </ScrollView>

      {/* Modale de détail */}
      <Modal
        visible={!!selectedNotif}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedNotif(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={{ alignItems: "center", marginBottom: 16 }}>
              <Ionicons
                name={selectedNotif?.icon as any}
                size={40}
                color="#FFB800"
                style={{ marginBottom: 8 }}
              />
              <Text style={styles.title}>{selectedNotif?.title}</Text>
            </View>
            <Text style={styles.detailText}>{selectedNotif?.detail}</Text>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setSelectedNotif(null)}
              accessibilityLabel="Fermer le détail"
            >
              <Text style={{ color: "#fff", fontWeight: "600" }}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 24,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    alignSelf: "center",
  },
  notifContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFF8E1",
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
    borderWidth: 1,
    borderColor: "#FFECB3",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
    color: "#222",
    textAlign: "center",
  },
  message: {
    fontSize: 14,
    color: "#444",
  },
  empty: {
    textAlign: "center",
    color: "#888",
    marginTop: 32,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
    minWidth: 280,
    maxWidth: 340,
  },
  detailText: {
    fontSize: 15,
    color: "#444",
    marginBottom: 24,
    textAlign: "center",
    lineHeight: 22,
  },
  closeBtn: {
    backgroundColor: "#FFB800",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
  },
});
