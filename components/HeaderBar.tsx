import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const HeaderBar = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cassanova</Text>
      <TouchableOpacity onPress={() => router.push("/(tabs)/profile")}>
        <Ionicons name="person-circle-outline" size={32} color="#222" />
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
});

export default HeaderBar;
