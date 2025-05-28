import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  Image, 
  StyleSheet, 
  ImageSourcePropType,
  View 
} from 'react-native';

interface CategoryButtonProps {
  title: string;
  icon: ImageSourcePropType;
  isActive?: boolean;
  onPress?: () => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ 
  title, 
  icon, 
  isActive = false, 
  onPress 
}) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[
        styles.iconContainer, 
        isActive && styles.activeIconContainer
      ]}>
        <Image source={icon} style={styles.icon} />
      </View>
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
    alignItems: 'center',
    marginHorizontal: 8,
    width: 70,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  activeIconContainer: {
    backgroundColor: '#FFD166',
  },
  icon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },
  activeTitle: {
    color: '#000',
    fontWeight: '600',
  },
});

export default CategoryButton;