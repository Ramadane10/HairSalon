// components/ServiceItem.js
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ServiceItemProps {
  title: string;
  subtitle: string;
  imageUrl: string | number;
  hasArrow?: boolean;
  hasCircle?: boolean;
  onPress?: () => void;
}

const ServiceItem: React.FC<ServiceItemProps> = ({
  title,
  subtitle,
  imageUrl,
  hasArrow,
  hasCircle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.serviceItem}
      onPress={onPress}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      <Image
        source={typeof imageUrl === "string" ? { uri: imageUrl } : imageUrl}
        style={styles.serviceImage}
        resizeMode="cover"
      />

      <View style={styles.serviceInfo}>
        <Text style={styles.serviceTitle} numberOfLines={1} adjustsFontSizeToFit>
          {title}
        </Text>
        <Text style={styles.serviceSubtitle} numberOfLines={2} adjustsFontSizeToFit>
          {subtitle}
        </Text>
      </View>

      {hasCircle && (
        <View style={styles.circleButton}>
          <Feather name="plus" size={18} color="#fff" />
        </View>
      )}

      {hasArrow && (
        <Feather name="chevron-right" size={22} color="#999" style={styles.arrowIcon} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  serviceImage: {
    width: 54,
    height: 54,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
  },
  serviceInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "center",
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    letterSpacing: 0.2,
  },
  serviceSubtitle: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
    letterSpacing: 0.1,
  },
  circleButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  arrowIcon: {
    marginLeft: 8,
    alignSelf: "center",
  },
});

export default ServiceItem;
