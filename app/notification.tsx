import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

const notifications = [
  {
    id: 1,
    title: "Rendez-vous confirmé",
    message: "Votre rendez-vous du 5 juin à 14h est confirmé.",
    icon: "calendar-check-outline",
  },
  {
    id: 2,
    title: "Nouveau service disponible",
    message: "Essayez notre nouveau soin du visage relaxant !",
    icon: "sparkles-outline",
  },
  {
    id: 3,
    title: "Offre spéciale",
    message: "10% de réduction sur toutes les coupes cette semaine.",
    icon: "pricetag-outline",
  },
  {
    id: 4,
    title: "Favori ajouté",
    message: "Vous avez ajouté 'Coupe homme' à vos favoris.",
    icon: "heart-outline",
  },
  {
    id: 5,
    title: "Rappel de rendez-vous",
    message: "N'oubliez pas votre rendez-vous demain à 10h.",
    icon: "alarm-outline",
  },
  {
    id: 6,
    title: "Bienvenue chez Cassanova",
    message: "Merci de rejoindre notre salon ! Découvrez nos services.",
    icon: "happy-outline",
  },
];

export default function NotificationScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      <ScrollView>
        {notifications.map((notif) => (
          <View key={notif.id} style={styles.notifContainer}>
            <Ionicons
              name={notif.icon as any}
              size={28}
              color="#FFB800"
              style={{ marginRight: 12 }}
            />
            <View>
              <Text style={styles.title}>{notif.title}</Text>
              <Text style={styles.message}>{notif.message}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
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
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: "#444",
  },
});
