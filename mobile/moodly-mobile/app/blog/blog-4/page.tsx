import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import BottomNavigationBar from '../../../components/BottomNavigationBar';
import { images } from "../../../constants/images";

export default function Blog4() {
  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <Text style={styles.heroText}>
            The Impact of Physical Activity on Emotional Development
          </Text>
        </View>

        {/* Main Content */}
        <View style={styles.article}>
          <Text style={styles.paragraph}>
            Physical activity is not only essential for physical health — it also has a profound impact on our emotional well-being...
          </Text>

          <Image source={images.img3274} style={styles.image} />
          <Text style={styles.heading}>1. Increases "Happy Hormones"</Text>
          <Text style={styles.paragraph}>
            During physical activity, the brain releases endorphins, serotonin, and dopamine — neurotransmitters that improve mood...
          </Text>

          <Image source={images.img3275} style={styles.image} />
          <Text style={styles.heading}>2. Reduces Stress and Anxiety</Text>
          <Text style={styles.paragraph}>
            Exercise helps lower cortisol levels, the stress hormone, and enhances communication...
          </Text>

          <Image source={images.img3276} style={styles.image} />
          <Text style={styles.heading}>3. Boosts Self-Confidence and Self-Image</Text>
          <Text style={styles.paragraph}>
            Achieving fitness goals — such as increasing stamina or learning new skills — contributes to self-confidence...
          </Text>

          <Image source={images.img3278} style={styles.image} />
          <Text style={styles.heading}>4. Improves Sleep Quality</Text>
          <Text style={styles.paragraph}>
            Regular physical activity contributes to better sleep, which is crucial for emotional balance...
          </Text>

          <Image source={images.img3279} style={styles.image} />
          <Text style={styles.heading}>5. Connects Us with Others</Text>
          <Text style={styles.paragraph}>
            Participating in group sports or shared workouts offers opportunities for social interaction...
          </Text>

          <Text style={styles.heading}>How to Get Started?</Text>
          <Text style={styles.paragraph}>
            You don't need to jump into intense training right away. Start with daily walks, bike rides, or yoga...
          </Text>

          <Text style={styles.heading}>Conclusion</Text>
          <Text style={styles.paragraph}>
            Physical activity is not just a means to achieve physical fitness, but a powerful tool for enhancing emotional well-being...
          </Text>
        </View>
      </ScrollView>

      <BottomNavigationBar />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DEF5BA',
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 100, // prostor za navigaciju
  },
  hero: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heroText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#502B06',
    textAlign: 'center',
  },
  article: {
    marginTop: 8,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 6,
    color: '#502B06',
  },
  paragraph: {
    fontSize: 14,
    color: '#502B06',
    lineHeight: 22,
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 16,
  },
});