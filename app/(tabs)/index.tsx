// screens/ServicesScreen.js
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FilterTab from "../../components/FilterTab";
import ServicesList from "../../components/ServicesList";
import SpecialistSection from "../../components/SpecialistSection";

import type { StackNavigationProp } from "@react-navigation/stack";

// Exemple de données de services (à adapter selon ta vraie structure)
const allServices = [
  {
    id: 1,
    title: "Coupe homme",
    subtitle: "Rapide et stylée",
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    category: "Coupes",
  },
  {
    id: 2,
    title: "Soin visage express",
    subtitle: "Rapide et stylée",
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    category: "Soin du visage",
  },
  {
    id: 3,
    title: "Henné mains",
    subtitle: "Rapide et stylée",
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    category: "Henné",
  },
  {
    id: 4,
    title: "Massage relaxant",
    subtitle: "Rapide et stylée",
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    category: "Massage",
  },
  {
    id: 5,
    title: "Coupe enfant",
    subtitle: "Rapide et stylée",
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    category: "Coupes",
  },
  // ...etc.
];

type ServicesScreenProps = {
  navigation: StackNavigationProp<any>;
};

const ServicesScreen: React.FC<ServicesScreenProps> = ({ navigation }) => {
  const [activeFilter, setActiveFilter] = useState("Tous");
  const [search, setSearch] = useState("");

  // Filtres en français
  const filters = ["Tous", "Coupes", "Soin du visage", "Henné", "Massage"];

  // Filtrage dynamique par catégorie puis par recherche
  const filteredServices = allServices
    .filter((service) =>
      activeFilter === "Tous" ? true : service.category === activeFilter
    )
    .filter((service) =>
      service.title.toLowerCase().includes(search.trim().toLowerCase())
    );

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
            value={search}
            onChangeText={setSearch}
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

      <ScrollView showsVerticalScrollIndicator={false}>
        <SpecialistSection />
        {/* Passe la liste filtrée à ServicesList */}
        <ServicesList services={filteredServices} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
});

export default ServicesScreen;
