import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import BottomNavigationBar from "@/components/BottomNavigationBar";

export default function ProfilePage() {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    photoURL: '',
  });
  const [frameURL, setFrameURL] = useState<any>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          photoURL: data.photoURL || '',
        });
      }

      const selectedDoc = await getDoc(doc(db, 'selected', currentUser.uid));
      if (selectedDoc.exists()) {
        const selected = selectedDoc.data();
        if (selected.itemId === 'p1') {
          setFrameURL(require('../../assets/images/blushPremium.png'));
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backBtn}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
              {userData.photoURL ? (
                <Image
                  source={{ uri: userData.photoURL }}
                  style={styles.image}
                />
              ) : (
                <Text style={styles.noImage}>No Image</Text>
              )}
            </View>
            {frameURL && (
              <Image
                source={frameURL}
                style={styles.frame}
              />
            )}
          </View>

          <Text style={styles.name}>
            {userData.firstName} {userData.lastName}
          </Text>
          <Text style={styles.email}>{userData.email}</Text>

          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => router.push('/edit-profile/page')}
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.itemButton}
              onPress={() => router.push('/items/page')}
            >
              <Text style={styles.itemButtonText}>My Items</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <BottomNavigationBar /> {/* ✅ Navigacija dodata ovde */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingBottom: 40,
  },
  header: {
    backgroundColor: '#DEF5BA',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backBtn: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: 2,
  },
  card: {
    backgroundColor: '#E9D5FF',
    borderRadius: 24,
    marginTop: 32,
    padding: 24,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  avatarWrapper: {
    width: 130,
    height: 130,
    marginBottom: 20,
    position: 'relative',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 65,
    backgroundColor: '#D8B4FE',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  noImage: {
    color: '#fff',
    fontWeight: 'bold',
  },
  frame: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 65,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 20,
  },
  buttons: {
    width: '100%',
    gap: 12,
  },
  editButton: {
    backgroundColor: '#DEF5BA',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemButton: {
    backgroundColor: '#F9A8D4',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  itemButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});