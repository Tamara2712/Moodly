import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { auth, db } from '../../firebase';
import { doc, getDoc, updateDoc, increment, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import BottomNavigationBar from "@/components/BottomNavigationBar";

interface ShopItem {
  id: string;
  label: string;
  price: number;
  type: string;
  image?: any;
  smallImage?: boolean;
}

export default function ShopScreen() {
  const [openPremium, setOpenPremium] = useState(true);
  const [openCourses, setOpenCourses] = useState(true);
  const [coins, setCoins] = useState<number>(0);
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCoinsAndPurchases = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const coinRef = doc(db, 'coins', user.uid);
      const coinSnap = await getDoc(coinRef);
      if (coinSnap.exists()) {
        setCoins(coinSnap.data().coins || 0);
      }

      const q = query(collection(db, 'purchases'), where('user', '==', user.uid));
      const snapshot = await getDocs(q);
      const bought = snapshot.docs.map((doc) => doc.data().id);
      setPurchasedIds(bought);
    };

    fetchCoinsAndPurchases();
  }, []);

  const handleBuy = async (item: ShopItem) => {
    const user = auth.currentUser;
    if (!user) return;

    const coinRef = doc(db, 'coins', user.uid);
    const coinSnap = await getDoc(coinRef);
    const currentCoins = coinSnap.exists() ? coinSnap.data().coins : 0;

    if (currentCoins < item.price) {
      Alert.alert('Not enough coins!');
      return;
    }

    await updateDoc(coinRef, {
      coins: increment(-item.price),
    });

    await setDoc(doc(db, 'purchases', `${user.uid}_${item.id}`), {
      user: user.uid,
      id: item.id,
      name: item.label,
      type: item.type,
      coins: item.price,
      image: item.image || null,
      timestamp: Date.now(),
    });

    setCoins((prev) => prev - item.price);
    setPurchasedIds((prev) => [...prev, item.id]);
    Alert.alert(`You bought ${item.label} for ${item.price} coins!`);
  };

  const renderCards = (items: ShopItem[]) => (
    <View style={styles.grid}>
      {items
        .filter((item) => !purchasedIds.includes(item.id))
        .map((item) => (
          <View key={item.id} style={styles.card}>
            {item.image ? (
              <Image
                source={item.image}
                style={[
                  styles.cardImage,
                  item.smallImage && { width: 60, height: 60, resizeMode: 'contain' },
                ]}
              />
            ) : (
              <Text>{item.label}</Text>
            )}
            <Text style={styles.cardLabel}>{item.label}</Text>
            <Text style={styles.cardPrice}>{item.price} coins</Text>
            <TouchableOpacity style={styles.buyButton} onPress={() => handleBuy(item)}>
              <Text style={styles.buyText}>Buy</Text>
            </TouchableOpacity>
          </View>
        ))}
    </View>
  );

  const premiumItems: ShopItem[] = [
    { id: 'p1', label: 'BLUSH', price: 10, type: 'premium', image: require('../../assets/images/blushPremium.png') },
    { id: 'p2', label: 'CLOUD', price: 20, type: 'premium', image: require('../../assets/images/cloudPremium.png') },
    { id: 'p3', label: 'DEVIL', price: 30, type: 'premium', image: require('../../assets/images/devilPremium.png'), smallImage: true },
    { id: 'p4', label: 'ANGEL', price: 40, type: 'premium', image: require('../../assets/images/angelPremium.png') },
    { id: 'p5', label: 'ANGRY', price: 40, type: 'premium', image: require('../../assets/images/angryPremium.png') },
  ];

  const courseItems: ShopItem[] = [
    { id: 'c1', label: 'Course 1', price: 50, type: 'course' },
  ];

  return (
    <>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Shop</Text>
          <Text style={styles.coinText}>Coins: {coins}</Text>
        </View>

        <ScrollView style={{ padding: 16 }}>
          <TouchableOpacity onPress={() => setOpenPremium(!openPremium)} style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Premium Items</Text>
            <Text>{openPremium ? '▲' : '▼'}</Text>
          </TouchableOpacity>
          {openPremium && renderCards(premiumItems)}

          <TouchableOpacity onPress={() => setOpenCourses(!openCourses)} style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Courses</Text>
            <Text>{openCourses ? '▲' : '▼'}</Text>
          </TouchableOpacity>
          {openCourses && renderCards(courseItems)}
        </ScrollView>
      </View>
      <BottomNavigationBar /> 
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#DEF5BA',
    paddingVertical: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  coinText: {
    marginTop: 4,
    fontSize: 14,
    color: '#555',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#D946EF',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#FCE7F3',
    borderRadius: 12,
    padding: 10,
    width: '47%',
    marginBottom: 12,
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: 80,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 6,
  },
  cardLabel: {
    fontWeight: 'bold',
    color: '#D946EF',
    marginBottom: 4,
  },
  cardPrice: {
    fontSize: 12,
    color: '#A855F7',
    marginBottom: 6,
  },
  buyButton: {
    backgroundColor: '#22C55E',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  buyText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});