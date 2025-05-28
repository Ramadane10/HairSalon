import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  View,
  Image
} from 'react-native';
import { Feather } from '@expo/vector-icons';

interface StyleCardProps {
  title: string;
  description: string;
  price?: string;
  duration?: string;
  image: any;
  views?: number;
  onPress?: () => void;
}

const StyleCard: React.FC<StyleCardProps> = ({
  title,
  description,
  price,
  duration,
  image,
  views,
  onPress
}) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Image source={image} style={styles.image} />
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        
        <View style={styles.detailsContainer}>
          {price && (
            <View style={styles.priceContainer}>
              <Text style={styles.price}>${price}</Text>
            </View>
          )}
          
          {views && (
            <View style={styles.viewsContainer}>
              <Text style={styles.viewsText}>{views} vues</Text>
            </View>
          )}
        </View>
      </View>
      
      <TouchableOpacity style={styles.actionButton} onPress={onPress}>
        <Feather name="arrow-right" size={18} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 110,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 110,
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  description: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  viewsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewsText: {
    fontSize: 12,
    color: '#888',
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 12,
    right: 12,
  },
});

export default StyleCard;