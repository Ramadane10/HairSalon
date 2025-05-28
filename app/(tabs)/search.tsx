import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Composants réutilisables
import CategoryIcon from "../../components/CategoryIcon";
import FilterTab from "../../components/FilterTab";
import ServiceCard from "../../components/ServiceCard";

const SearchScreen = () => {
  const [activeFilter, setActiveFilter] = useState("Coupes");

  // Filtres en français
  const filters = ["Tous", "Coupes", "Soin du visage", "Henné", "Massage"];

  return (
    <SafeAreaView style={styles.container}>
      {/* Barre de recherche */}
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#888888" />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher..."
            placeholderTextColor="#888888"
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={20} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.calendarButton}>
          <Ionicons name="calendar-outline" size={20} color="#000000" />
        </TouchableOpacity>
      </View>

      {/* Filtres de catégorie */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {filters.map((filter, index) => (
          <FilterTab
            key={index}
            title={filter}
            isActive={filter === activeFilter}
            onPress={() => setActiveFilter(filter)}
          />
        ))}
      </ScrollView>

      {/* Section d'offres pour l'Aïd */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Offres de l&apos;Aïd</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Voir tout</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.offersContainer}
        >
          <ServiceCard
            title="Coupe élégante"
            duration="Service de 30 minutes"
            price="4 €"
            views="100"
            image={require("../../assets/images/haircut-1.jpg")}
            onPress={() => router.push("/(tabs)/favoris")}
          />
          <ServiceCard
            title="Coupe élégante"
            duration="Service de 30 minutes"
            price="4 €"
            views="115"
            image={require("../../assets/images/haircut-2.jpg")}
            onPress={() => router.push("/(tabs)/favoris")}
          />
        </ScrollView>
      </View>

      {/* Résultats */}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>Résultats (2512)</Text>
      </View>

      {/* Catégories de services */}
      <View style={styles.categoriesGrid}>
        <CategoryIcon
          title="Coloration"
          icon={require("../../assets/icons/hair-color.png")}
        />
        <CategoryIcon
          title="Maquillage"
          icon={require("../../assets/icons/makeup.png")}
        />
        <CategoryIcon
          title="Spa"
          icon={require("../../assets/icons/spa.png")}
        />
      </View>

      {/* Image du salon */}
      <View style={styles.salonImageContainer}>
        <Image
          source={require("../../assets/images/salon-large.jpg")}
          style={styles.salonImage}
          resizeMode="cover"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  searchBarContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  filterButton: {
    marginLeft: 12,
    padding: 8,
  },
  calendarButton: {
    marginLeft: 12,
    padding: 8,
  },
  filterContainer: {
    maxHeight: 50,
  },
  filterContent: {
    paddingHorizontal: 16,
  },
  sectionContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  seeAllText: {
    color: "#FFB800",
    fontWeight: "600",
  },
  offersContainer: {
    marginBottom: 16,
  },
  resultsContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
  },
  resultsText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  categoriesGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  salonImageContainer: {
    paddingHorizontal: 16,
  },
  salonImage: {
    width: "100%",
    height: 150,
    borderRadius: 12,
  },
});

export default SearchScreen;
