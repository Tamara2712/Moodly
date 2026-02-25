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
import BottomNavigationBar from "../../components/BottomNavigationBar";

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
  Confused: require('../../assets/images/confused female.png'),
  Sad: require('../../assets/images/sad female.png'),
  Angry: require('../../assets/images/angry female.png'),
  Tired: require('../../assets/images/tired female.png'),
  Ashamed: require('../../assets/images/ashamed female.png'),
  Unmotivated: require('../../assets/images/unmotivated female.png'),
  Scared: require('../../assets/images/scared female.png'),
  Anxious: require('../../assets/images/anxious female.png'),
  Happy: require('../../assets/images/happy female.png'),
};

export default function EmotionsFemaleScreen() {
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
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.headerBtn}>
          <Text style={styles.headerBtnText}>Choose your emotion</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Check how you feel?</Text>

        <View style={styles.emotionCircle}>
          <TouchableOpacity
            onPress={() => handleEmotionClick('Happy')}
            style={[styles.emotionBtn, styles.centerEmotion]}
          >
            <Image source={emotionImages['Happy']} style={styles.icon} />
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
              >
                <Image source={emotionImages[emotion]} style={styles.icon} />
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
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#111',
  },
  emotionCircle: {
    width: 320,
    height: 320,
    backgroundColor: '#E9D5FF',
    borderRadius: 40,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
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