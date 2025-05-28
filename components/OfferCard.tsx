import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface OfferCardProps {
  title: string;
  discount: string;
  validity: string;
  image: any;
  onPress?: () => void;
}

const OfferCard = ({ title, discount, validity, image, onPress }: OfferCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.discount}>{discount}</Text>
        <Text style={styles.validity}>{validity}</Text>
        
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Gagner l&apos;offre maintenant</Text>
          <View style={styles.arrowContainer}>
            <Text style={styles.arrow}>→</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <Image source={image} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFB800',
    borderRadius: 12,
    flexDirection: 'row',
    overflow: 'hidden',
    height: 120,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  discount: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
  },
  validity: {
    color: '#000000',
    fontSize: 12,
    marginTop: 4,
    marginBottom: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginRight: 4,
  },
  arrowContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    color: '#000000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  image: {
    width: 120,
    height: '100%',
    resizeMode: 'cover',
  },
});

export default OfferCard;