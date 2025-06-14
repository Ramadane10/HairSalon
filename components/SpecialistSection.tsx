// components/SpecialistSection.js
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SpecialistItem from './SpecialistItem';

const specialistsData = [
  {
    id: '1',
    imageUrl: 'https://randomuser.me/api/portraits/women/81.jpg', // Fatou, femme noire
    name: 'Fatou',
  },
  {
    id: '2',
    imageUrl: 'https://randomuser.me/api/portraits/women/83.jpg', // Aminata, femme noire
    name: 'Aminata',
  },
  {
    id: '3',
    imageUrl: 'https://randomuser.me/api/portraits/men/75.jpg', // Moussa, homme noir
    name: 'Moussa',
  },
  {
    id: '4',
    imageUrl: 'https://randomuser.me/api/portraits/men/77.jpg', // Samba, homme noir
    name: 'Samba',
  },
];

const SpecialistSection = ({ onSpecialistPress }: { onSpecialistPress?: (id: string) => void }) => {
  return (
    <View>
      <Text style={styles.sectionTitle}>Nos spécialistes</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.specialistsContainer}
      >
        {specialistsData.map(specialist => (
          <TouchableOpacity
            key={specialist.id}
            activeOpacity={0.8}
            style={styles.specialistTouchable}
            onPress={() => onSpecialistPress && onSpecialistPress(specialist.id)}
            accessibilityLabel={`Voir le profil de ${specialist.name}`}
          >
            <SpecialistItem imageUrl={specialist.imageUrl} />
            <Text style={styles.specialistName} numberOfLines={1}>
              {specialist.name}
            </Text>
          </TouchableOpacity>
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
    alignItems: 'flex-start',
  },
  specialistTouchable: {
    alignItems: 'center',
    marginRight: 18,
    width: 72,
  },
  specialistName: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: '500',
    color: '#222',
    textAlign: 'center',
    width: 64,
  },
});

export default SpecialistSection;