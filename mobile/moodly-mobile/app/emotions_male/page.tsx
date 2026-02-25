import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import BottomNavigationBar from "@/components/BottomNavigationBar";

type EmotionType = 
  'Confused' | 
  'Sad' | 
  'Angry' | 
  'Tired' | 
  'Ashamed' | 
  'Unmotivated' | 
  'Scared' | 
  'Anxious' | 
  'Happy';

const emotions: EmotionType[] = [
  'Confused',
  'Sad',
  'Angry',
  'Tired',
  'Ashamed',
  'Unmotivated',
  'Scared',
  'Anxious',
];

const emotionImages: Record<EmotionType, any> = {
  Confused: require('../../assets/images/confused male.png'),
  Sad: require('../../assets/images/sad male.png'),
  Angry: require('../../assets/images/angry male.png'),
  Tired: require('../../assets/images/tired male.png'),
  Ashamed: require('../../assets/images/ashamed male.png'),
  Unmotivated: require('../../assets/images/unmotivated male.png'),
  Scared: require('../../assets/images/scared male.png'),
  Anxious: require('../../assets/images/anxious male.png'),
  Happy: require('../../assets/images/happy male.png'),
};

export default function EmotionsMaleScreen() {
  const router = useRouter();
  const radius = 110;
  const centerX = 160;
  const centerY = 160;

  const handleEmotionClick = (emotion: EmotionType) => {
    router.push({
      pathname: '/emotion-journal/page',
      params: { emotion: emotion.toLowerCase() }
    });
  };

  return (
    <>
      <ScrollView 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity style={styles.headerBtn}>
          <Text style={styles.headerBtnText}>Choose your emotion</Text>
        </TouchableOpacity>

        <Text style={styles.title}>How are you feeling today?</Text>

        <View style={styles.emotionCircle}>
          <TouchableOpacity
            onPress={() => handleEmotionClick('Happy')}
            style={[styles.emotionBtn, styles.centerEmotion]}
            testID="happy-emotion-btn"
          >
            <Image 
              source={emotionImages['Happy']} 
              style={styles.icon} 
              accessibilityLabel="Happy emotion" 
            />
          </TouchableOpacity>

          {emotions.map((emotion, index) => {
            const angle = (index / emotions.length) * 2 * Math.PI;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            return (
              <TouchableOpacity
                key={emotion}
                onPress={() => handleEmotionClick(emotion)}
                style={[
                  styles.emotionBtn,
                  {
                    position: 'absolute',
                    left: x,
                    top: y,
                    transform: [{ translateX: -40 }, { translateY: -40 }],
                  },
                ]}
                testID={`${emotion.toLowerCase()}-emotion-btn`}
              >
                <Image 
                  source={emotionImages[emotion]} 
                  style={styles.icon} 
                  accessibilityLabel={`${emotion} emotion`}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <BottomNavigationBar />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    alignItems: 'center',
    backgroundColor: '#fff',
    flexGrow: 1,
    paddingBottom: 100,
  },
  headerBtn: {
    backgroundColor: '#D9F99D',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 999,
    marginBottom: 12,
  },
  headerBtnText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#111',
    fontFamily: 'Inter-Bold',
  },
  emotionCircle: {
    width: 320,
    height: 320,
    backgroundColor: '#E9D5FF',
    borderRadius: 160,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  centerEmotion: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -40,
    marginTop: -40,
  },
  emotionBtn: {
    width: 80,
    height: 80,
    backgroundColor: '#D9F99D',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
});