import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FavoritesScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Ionicons name="heart" size={64} color="#FFB800" />
        <Text style={styles.title}>Vos favoris</Text>
        <Text style={styles.description}>
          Marquez vos salons et styles de coiffure préférés pour un accès rapide.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#888888',
    textAlign: 'center',
  },
});

export default FavoritesScreen;