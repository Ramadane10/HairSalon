// components/SpecialistSection.js
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import SpecialistItem from './SpecialistItem';

const specialistsData = [
  { id: '1', imageUrl: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f' },
  { id: '2', imageUrl: 'https://images.unsplash.com/photo-1598887142487-3c854d51d2c7' },
  { id: '3', imageUrl: 'https://images.unsplash.com/photo-1582893561942-d61adcb2e534' },
  { id: '4', imageUrl: 'https://images.unsplash.com/photo-1559599189-fe84dea4eb79' }
];

const SpecialistSection = () => {
  return (
    <View>
      <Text style={styles.sectionTitle}>Choisissez un spécialiste</Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.specialistsContainer}
      >
        {specialistsData.map(specialist => (
          <SpecialistItem 
            key={specialist.id} 
            imageUrl={specialist.imageUrl} 
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  specialistsContainer: {
    paddingLeft: 16,
    paddingBottom: 16,
  }
});

export default SpecialistSection;