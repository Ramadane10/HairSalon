import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ServiceCardProps {
  title: string;
  duration: string;
  price: string;
  views: string;
  image: any;
  onPress?: () => void;
}

const ServiceCard = ({ title, duration, price, views, image, onPress }: ServiceCardProps) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Image source={image} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.duration}>{duration}</Text>
        <View style={styles.bottomRow}>
          <Text style={styles.price}>{price}</Text>
          <View style={styles.viewsContainer}>
            <Ionicons name="eye-outline" size={12} color="#888888" />
            <Text style={styles.views}>{views} vues</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.bookmarkButton}>
        <Ionicons name="bookmark-outline" size={16} color="#FFFFFF" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 180,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginRight: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  duration: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 8,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  viewsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  views: {
    fontSize: 10,
    color: '#888888',
    marginLeft: 4,
  },
  bookmarkButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ServiceCard;