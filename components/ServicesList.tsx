// components/ServicesList.js
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ServiceItem from "./ServiceItem";
import { useRouter } from "expo-router";

// On attend une prop "services" (tableau d'objets service)
type Service = {
  id: string | number;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  hasArrow?: boolean;
  hasCircle?: boolean;
  onPress?: () => void;
};

type ServicesListProps = {
  services: Service[];
};

const ServicesList: React.FC<ServicesListProps> = ({ services }) => {
  const router = useRouter();
  return (
    <View>
      <Text style={styles.sectionTitle}>Choisissez un Service</Text>
      <View style={styles.servicesList}>
        {services.map((service) => (
          <ServiceItem
            key={service.id}
            title={service.title}
            subtitle={service.subtitle ?? ""}
            imageUrl={service.imageUrl ?? ""}
            hasArrow={service.hasArrow}
            hasCircle={service.hasCircle}
            onPress={() => router.push({ pathname: "/(tabs)/reservation", params: { serviceTitle: service.title } })}
          />
        ))}
      </View>
    </View>
  );
};

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
