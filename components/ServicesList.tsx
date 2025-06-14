// components/ServicesList.tsx
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ServiceItem from "./ServiceItem";

// Type Service
type ServiceType = {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string | number;
  hasArrow: boolean;
  hasCircle: boolean;
  category: string;
};

type ServicesListProps = {
  services: ServiceType[];
  onServicePress?: (service: ServiceType) => void;
};

const ServicesList: React.FC<ServicesListProps> = React.memo(({ services, onServicePress }) => (
  <View>
    <Text style={styles.sectionTitle}>Choisissez un Service</Text>
    <FlatList
      data={services}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ServiceItem
          key={item.id}
          title={item.title}
          subtitle={item.subtitle}
          imageUrl={item.imageUrl}
          hasArrow={item.hasArrow}
          hasCircle={item.hasCircle}
          onPress={() => onServicePress && onServicePress(item)}
        />
      )}
      contentContainerStyle={styles.servicesList}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
    />
  </View>
));

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  servicesList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});

export default ServicesList;
