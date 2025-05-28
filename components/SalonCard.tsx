import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

interface SalonCardProps {
  image: any;
  onPress?: () => void;
}

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // 48 = horizontal padding (16 * 2) + gap between cards (16)

const SalonCard = ({ image, onPress }: SalonCardProps) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Image source={image} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    height: cardWidth,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default SalonCard;