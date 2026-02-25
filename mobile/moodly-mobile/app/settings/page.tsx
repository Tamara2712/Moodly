import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { auth } from '../../firebase';
import BottomNavigationBar from "@/components/BottomNavigationBar";

export default function SettingsPage() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/signin/page');
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Logout failed', 'Please try again.');
    }
  };

  return (
    <>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Options</Text>
        </View>

        {/* Central Box */}
        <View style={styles.centerBox}>
          <Text style={styles.boxTitle}>App Options</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/shop/page')}
          >
            <Text style={styles.buttonText}>Shop</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/statistics/page')}
          >
            <Text style={styles.buttonText}>Statistics</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/info/page')}
          >
            <Text style={styles.buttonText}>About us</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/help/page')}
          >
            <Text style={styles.buttonText}>Help</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomNavigationBar /> {/* ✅ Navigacija na dnu */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DEF5BA',
  },
  header: {
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: '#DEF5BA',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 2,
  },
  centerBox: {
    backgroundColor: '#E9D5FF',
    margin: 24,
    padding: 24,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
  },
  boxTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 24,
    letterSpacing: 1,
  },
  button: {
    backgroundColor: '#A78BFA',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    width: '100%',
    marginBottom: 12,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#F87171',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    width: '100%',
    marginTop: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: 1,
  },
});