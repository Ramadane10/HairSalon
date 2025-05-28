// components/ServiceItem.js
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ServiceItemProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  hasArrow?: boolean;
  hasCircle?: boolean;
   onPress?: () => void;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ title, subtitle, imageUrl, hasArrow, hasCircle, onPress }) => {
  return (
    <TouchableOpacity style={styles.serviceItem} onPress={onPress}>
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.serviceImage} 
      />
      
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceTitle}>{title}</Text>
        <Text style={styles.serviceSubtitle}>{subtitle}</Text>
      </View>
      
      {hasArrow && (
        <Feather name="chevron-right" size={20} color="#999" />
      )}
      
      {hasCircle && (
        <View style={styles.circleButton}>
          <Feather name="plus" size={18} color="#fff" />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  serviceImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  serviceInfo: {
    flex: 1,
    marginLeft: 16,
  },
  serviceTitle: {
    fontSize: 15,
    fontWeight: '500',
  },
  serviceSubtitle: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  circleButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default ServiceItem;