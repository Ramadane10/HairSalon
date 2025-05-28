// components/SpecialistItem.js
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

// Définir l'interface des props
interface SpecialistItemProps {
  imageUrl: string;
}

const SpecialistItem: React.FC<SpecialistItemProps> = ({ imageUrl }) => {
  return (
    <TouchableOpacity style={styles.specialistItem}>
      <Image source={{ uri: imageUrl }} style={styles.specialistImage} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  specialistItem: {
    marginRight: 12,
    borderRadius: 12,
    overflow: "hidden",
    width: 70,
    height: 70,
  },
  specialistImage: {
    width: "100%",
    height: "100%",
  },
});

export default SpecialistItem;
