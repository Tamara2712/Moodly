import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { auth, db } from '../../firebase';
import { collection, query, where, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import BottomNavigationBar from "@/components/BottomNavigationBar";

interface PurchasedItem {
  id: string;
  name: string;
  type: string;
  coins: number;
  image?: any;
}

export default function MyItemsScreen() {
  const [items, setItems] = useState<PurchasedItem[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(collection(db, 'purchases'), where('user', '==', user.uid));
      const snapshot = await getDocs(q);

      const loaded: PurchasedItem[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        loaded.push({
          id: data.id,
          name: data.id === 'p1' ? 'BLUSH' : data.name,
          type: data.type,
          coins: data.coins,
          image:
            data.image || (data.id === 'p1'
              ? require('../../assets/images/blushPremium.png')
              : null),
        });
      });
      setItems(loaded);

      const selectedSnap = await getDoc(doc(db, 'selected', user.uid));
      if (selectedSnap.exists()) {
        const selectedData = selectedSnap.data();
        setSelected(selectedData.itemId);
      }
    };

    fetchItems();
  }, []);

  const handleSelect = async (itemId: string) => {
    const user = auth.currentUser;
    if (!user) return;

    await setDoc(doc(db, 'selected', user.uid), { itemId });
    setSelected(itemId);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>My Items</Text>

        {items.length === 0 ? (
          <Text style={styles.empty}>You haven't purchased anything yet.</Text>
        ) : (
          <ScrollView contentContainerStyle={styles.grid}>
            {items.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.card,
                  selected === item.id && item.type === 'premium' && styles.selectedCard,
                ]}
              >
                <View style={styles.imageWrapper}>
                  {item.image ? (
                    <Image source={item.image} style={styles.image} />
                  ) : (
                    <Text style={styles.imageText}>{item.name}</Text>
                  )}
                </View>
                <Text style={styles.label}>{item.name}</Text>
                <Text style={styles.subText}>{item.coins} coins</Text>
                <Text style={styles.subText}>{item.type}</Text>

                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    item.type === 'premium'
                      ? { backgroundColor: '#22C55E' }
                      : { backgroundColor: '#3B82F6' },
                  ]}
                  onPress={() =>
                    item.type === 'premium'
                      ? handleSelect(item.id)
                      : Alert.alert(`Go to content for ${item.name}`)
                  }
                >
                  <Text style={styles.buttonText}>
                    {item.type === 'premium' ? 'Select' : 'Go to'}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}
      </View>

      <BottomNavigationBar /> {/* ✅ Navigacija dodata ovde */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#9333EA',
    textAlign: 'center',
    marginBottom: 16,
  },
  empty: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 16,
    marginTop: 40,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#FCE7F3',
    borderRadius: 12,
    padding: 12,
    width: '47%',
    alignItems: 'center',
    position: 'relative',
  },
  selectedCard: {
    borderWidth: 3,
    borderColor: '#22C55E',
  },
  imageWrapper: {
    width: '100%',
    height: 80,
    backgroundColor: '#E9D5FF',
    borderRadius: 10,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
  imageText: {
    color: '#9333EA',
    fontSize: 12,
    fontWeight: '600',
  },
  label: {
    fontWeight: 'bold',
    color: '#D946EF',
    marginBottom: 4,
  },
  subText: {
    fontSize: 12,
    color: '#6B7280',
  },
  actionButton: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});