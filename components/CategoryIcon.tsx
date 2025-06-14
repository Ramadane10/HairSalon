import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CategoryButtonProps {
  title: string;
  icon: any;
  isActive?: boolean;
  onPress?: () => void;
}

const CategoryButton = ({ title, icon, isActive = false, onPress }: CategoryButtonProps) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
    >
      <View style={[
        styles.iconContainer, 
        isActive ? styles.activeIconContainer : {}
      ]}>
        <Image source={icon} style={styles.icon} />
      </View>
      <Text style={[
        styles.title,
        isActive ? styles.activeTitle : {}
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  activeIconContainer: {
    backgroundColor: '#FFB800',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 14,
    color: '#888888',
  },
  activeTitle: {
    color: '#000000',
    fontWeight: '600',
  },
});

export default CategoryButton;