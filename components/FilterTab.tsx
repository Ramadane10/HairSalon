import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

interface FilterTabProps {
  title: string;
  isActive?: boolean;
  onPress?: () => void;
}

const FilterTab: React.FC<FilterTabProps> = ({ 
  title, 
  isActive = false, 
  onPress 
}) => {
  return (
    <TouchableOpacity 
      style={[
        styles.container,
        isActive && styles.activeContainer
      ]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[
        styles.title,
        isActive && styles.activeTitle
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
    paddingHorizontal: 16,
    paddingVertical: 10, // même valeur haut/bas
    borderRadius: 20,
    backgroundColor: '#F8F8F8',
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeContainer: {
    backgroundColor: '#FFD166',
  },
  title: {
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
    textAlignVertical: 'center',
  },
  activeTitle: {
    color: '#000',
    fontWeight: '600',
  },
});

export default FilterTab;