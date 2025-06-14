import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const HeaderBar = () => {
  const router = useRouter();
  const notificationCount = 6; // ou récupéré dynamiquement

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CASA NOVA</Text>
      <TouchableOpacity onPress={() => router.push("/notification")}>
        <Ionicons name="notifications-circle-outline" size={32} color="#222" />
        {notificationCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{notificationCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  badge: {
    position: "absolute",
    right: -6,
    top: -3,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default HeaderBar;
