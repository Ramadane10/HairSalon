// components/ServicesList.tsx
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ServiceItem from "./ServiceItem";

// Type Service
type ServiceType = {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: any;
  hasArrow: boolean;
  hasCircle: boolean;
  category: string;
};

// Ajoute la prop onServicePress
type ServicesListProps = {
  services: ServiceType[];
  onServicePress?: (service: ServiceType) => void;
};

const ServicesList: React.FC<ServicesListProps> = ({
  services,
  onServicePress,
}) => (
  <View>
    <Text style={styles.sectionTitle}>Choisissez un Service</Text>
    <View style={styles.servicesList}>
      {services.map((service) => (
        <ServiceItem
          key={service.id}
          title={service.title}
          subtitle={service.subtitle}
          imageUrl={service.imageUrl}
          hasArrow={service.hasArrow}
          hasCircle={service.hasCircle}
          onPress={() => onServicePress && onServicePress(service)}
        />
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  servicesList: {
    marginTop: 8,
    paddingHorizontal: 16,
  },
});

export default ServicesList;
