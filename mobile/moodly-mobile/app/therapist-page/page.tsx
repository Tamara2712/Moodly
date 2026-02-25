import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import BottomNavigationBar from '../../components/BottomNavigationBar';

const therapists = [
  {
    name: 'Dr. Marija Rašić',
    description: 'More about therapist',
    contactPage: '/contact/marija/page' as const,
    image: require('../../assets/images/Marija.jpg'),
  },
];

export default function TherapistsPage() {
  const router = useRouter();

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Our therapists</Text>
          <View style={{ width: 24 }} /> 
        </View>

        {/* Subtitle */}
        <View style={styles.subHeader}>
          <Text style={styles.subHeaderText}>
            Choose therapist and start a chat
          </Text>
        </View>

        {/* Therapist cards */}
        <View style={styles.cardContainer}>
          {therapists.map((therapist, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.imageWrapper}>
                <Image source={therapist.image} style={styles.image} />
              </View>
              <Text style={styles.name}>{therapist.name}</Text>
              <Text style={styles.description}>{therapist.description}</Text>

              <TouchableOpacity
                style={styles.button}
                onPress={() => router.push(therapist.contactPage)}
              >
                <Text style={styles.buttonText}>Contact</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      <BottomNavigationBar />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E9D5FF',
    flexGrow: 1,
    paddingBottom: 80,
  },
  header: {
    backgroundColor: '#D9F99D',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subHeader: {
    backgroundColor: '#D8B4FE',
    paddingVertical: 8,
    alignItems: 'center',
  },
  subHeaderText: {
    color: '#fff',
    fontSize: 14,
  },
  cardContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 16,
  },
  card: {
    backgroundColor: '#D8B4FE',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageWrapper: {
    width: 120,
    height: 120,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  description: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#BBF7D0',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 999,
    marginTop: 12,
  },
  buttonText: {
    color: '#000',
    fontWeight: '600',
  },
});
