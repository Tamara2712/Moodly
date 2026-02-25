import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import BottomNavigationBar from "@/components/BottomNavigationBar";

export default function InfoPage() {
  const router = useRouter();

  return (
    <>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Info</Text>
        </View>

        {/* Info Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Welcome to the App!</Text>
          <Text style={styles.cardText}>
            This application is designed to help you explore your emotions, reflect on your mental state, and access resources like therapists, courses, and educational content.
          </Text>
          <Text style={styles.cardText}>
            Use the Emotions section to log how you feel, take quizzes to earn coins, and shop for premium content using the coins you collect.
          </Text>
          <Text style={styles.cardText}>
            If you need help, go to the Therapist section or contact support through the profile settings.
          </Text>
        </View>
      </View>

      <BottomNavigationBar />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#DEF5BA',
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backButton: {
    marginRight: 12,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 2,
  },
  card: {
    backgroundColor: '#E9D5FF',
    borderRadius: 24,
    padding: 24,
    marginTop: 32,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#7C3AED',
    marginBottom: 16,
    textAlign: 'center',
  },
  cardText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 12,
    textAlign: 'center',
  },
});