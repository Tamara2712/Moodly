import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { auth, db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import BottomNavigationBar from '@/components/BottomNavigationBar';

export default function MaleHomePage() {
  const router = useRouter();
  const [coins, setCoins] = useState<number | null>(null);
  const [quote, setQuote] = useState<string>("");

  useEffect(() => {
    const fetchCoins = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'coins', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCoins(docSnap.data().coins);
        }
      }
    };

    const fetchRandomQuote = async () => {
      const docRef = doc(db, 'quote', 'YCZygooS1QqAw3c4ii8t');
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        const data = snapshot.data();
        const totalQuotes = 10;
        const rndIndex = Math.floor(Math.random() * totalQuotes) + 1;
        const key = `quote${rndIndex}`;
        setQuote(data[key]);
      }
    };

    fetchCoins();
    fetchRandomQuote();
  }, []);

  const blogImages = [
    require('../../../assets/images/blog1.png'),
    require('../../../assets/images/blog2.png'),
    require('../../../assets/images/blog3.png'),
    require('../../../assets/images/blog4.png'),
    require('../../../assets/images/blog5.png'),
  ];

  const blogRoutes = [
    '/blog/blog-1/page',
    '/blog/blog-2/page',
    '/blog/blog-3/page',
    '/blog/blog-4/page',
    '/blog/blog-5/page',
  ] as const;

  return (
    <>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.coinRow}>
            <Ionicons name="logo-bitcoin" size={24} color="gold" />
            <Text style={styles.coinText}>{coins !== null ? coins : '...'}</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/shop/page')}>
            <Ionicons name="cart-outline" size={28} color="#502B06" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>HOW DO YOU FEEL TODAY?</Text>

          <TouchableOpacity
            style={styles.emotionsButton}
            onPress={() => router.push('/emotions_male/page')}
          >
            <Text style={styles.emotionsText}>Emotions</Text>
          </TouchableOpacity>

          {quote ? <Text style={styles.quote}>“{quote}”</Text> : null}

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.blueButton}
              onPress={() => router.push('/therapist-page/page')}
            >
              <Text style={styles.blueButtonText}>Therapists</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.greenButton}
              onPress={() => router.push('/quiz/page')}
            >
              <Text style={styles.blueButtonText}>Quiz</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.blogGrid}>
            {blogImages.map((img, index) => (
              <TouchableOpacity
                key={index}
                style={styles.blogCard}
                onPress={() => router.push(blogRoutes[index])}
              >
                <ImageBackground
                  source={img}
                  style={styles.blogImage}
                  imageStyle={{ borderRadius: 12 }}
                >
                  <View style={styles.blogOverlay}>
                    <Text style={styles.readMore}>Read More</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <BottomNavigationBar />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DEF5BA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },
  coinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  coinText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollContent: {
    paddingBottom: 100,
    paddingHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
    marginTop: 24,
    backgroundColor: '#502B06',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 999,
    overflow: 'hidden',
    ...(Platform.OS === 'web'
      ? { textShadow: '2px 2px 1px #E9D5FF' }
      : {
          textShadowColor: '#E9D5FF',
          textShadowOffset: { width: 2, height: 2 },
          textShadowRadius: 1,
        }),
  },
  emotionsButton: {
    backgroundColor: '#E9D5FF',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 999,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  emotionsText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  quote: {
    color: '#60A5FA',
    textAlign: 'center',
    marginTop: 24,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginTop: 24,
  },
  blueButton: {
    backgroundColor: '#93C5FD',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 999,
  },
  greenButton: {
    backgroundColor: '#86EFAC',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 999,
  },
  blueButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  blogGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 32,
    justifyContent: 'center',
  },
  blogCard: {
    width: 150,
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
  },
  blogImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  blogOverlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 8,
  },
  readMore: {
    color: '#93C5FD',
    fontWeight: '500',
    textAlign: 'right',
  },
});
