import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import BottomNavigationBar from "@/components/BottomNavigationBar";

export default function HelpPage() {
  const institutions = [
    {
      name: 'Srce Center – Emotional Support Line',
      contact: '0800 300303',
      email: 'vanja@centarsrce.org',
    },
    {
      name: 'Center for Mental Health (Belgrade)',
      contact: '011 3307 500',
      email: 'institutzamentalnozdravlje@imh.org.rs',
    },
    {
      name: 'Clinic Laza Lazarević – National Help Line for Adolescents',
      contact: '0800 309309',
      email: 'drlazal@lazalazarevic.rs',
    },
    {
      name: 'Unbreakable Movement (Nesalomivi)',
      contact: '0800 001002',
      email: 'pokret@nesalomivi.rs',
    },
    {
      name: 'Institute for Mental Health in Belgrade',
      contact: 'Unavailable',
      email: 'Unavailable',
    },
  ];

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Help & Contacts</Text>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.infoText}>
            If you're experiencing emotional distress, anxiety, or need professional support, please don't hesitate to contact one of the organizations below:
          </Text>

          {institutions.map((inst, idx) => (
            <View key={idx} style={styles.card}>
              <Text style={styles.cardTitle}>{inst.name}</Text>
              <Text style={styles.cardDetail}>Phone: {inst.contact}</Text>
              <Text style={styles.cardDetail}>Email: {inst.email}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <BottomNavigationBar />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#DEF5BA',
    paddingVertical: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 100, // da se ne preklapa sa navigacijom
  },
  infoText: {
    textAlign: 'center',
    color: '#4B5563',
    marginBottom: 16,
    fontSize: 14,
  },
  card: {
    backgroundColor: '#E9D5FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B21A8',
    marginBottom: 4,
  },
  cardDetail: {
    fontSize: 14,
    color: '#374151',
  },
});