import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { FontAwesome } from '@expo/vector-icons';

export default function BottomNavigationBar() {
  const [userGender, setUserGender] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserGender = async () => {
      const user = auth.currentUser;
      if (!user) {
        router.push('/signin/page');
        return;
      }

      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUserGender(userSnap.data().gender);
      }
    };

    fetchUserGender();
  }, []);

  if (!userGender) return null;

  const homePath = userGender === 'female' ? '/home/female/page' : '/home/male/page';

  return (
    <View style={styles.navbar}>
      <NavButton icon="user" onPress={() => router.push('/profile/page')} />
      <NavButton icon="home" onPress={() => router.push(homePath)} />
      <NavButton icon="ellipsis-h" onPress={() => router.push('/settings/page')} />
    </View>
  );
}

type NavButtonProps = {
  icon: any;
  onPress: () => void;
};

const NavButton = ({ icon, onPress }: NavButtonProps) => (
  <TouchableOpacity onPress={onPress}>
    <FontAwesome name={icon} size={24} color="#502B06" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    boxShadow: '0px -2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 4, // Ovo ostaje za Android
  },
});