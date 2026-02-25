import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import BottomNavigationBar from '../../../components/BottomNavigationBar';
import { images } from "../../../constants/images";

export default function Blog3() {
  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <Text style={styles.heroText}>
            Health and Nutrition: How a Balanced Diet Affects Our Well-Being
          </Text>
        </View>

        {/* Article Content */}
        <View style={styles.article}>
          <Text style={styles.paragraph}>
            Nutrition is one of the most important factors influencing our health—both physical and mental...
          </Text>

          <Image source={images.img3365} style={styles.image} />
          <Text style={styles.heading}>1. A Balanced Diet as the Foundation of Health</Text>
          <Text style={styles.paragraph}>
            At the core of a healthy lifestyle is a balanced diet. The concept of "nutrition and health" goes beyond calorie counting...
          </Text>

          <Image source={images.img3366} style={styles.image} />
          <Text style={styles.heading}>2. Nutrition and Immunity</Text>
          <Text style={styles.paragraph}>
            Proper nutrition is crucial for strengthening the immune system. Foods rich in antioxidants such as vitamins C and E...
          </Text>

          <Image source={images.img3367} style={styles.image} />
          <Text style={styles.heading}>3. Nutrition and Chronic Disease Prevention</Text>
          <Text style={styles.paragraph}>
            A healthy diet can play a key role in preventing chronic illnesses such as diabetes, heart disease, and cancer...
          </Text>

          <Image source={images.img3368} style={styles.image} />
          <Text style={styles.heading}>4. Mental Health and Nutrition</Text>
          <Text style={styles.paragraph}>
            Recent research has highlighted the complex link between diet and mental health. A well-balanced diet rich in omega-3...
          </Text>

          <Image source={images.img3369} style={styles.image} />
          <Text style={styles.heading}>Conclusion</Text>
          <Text style={styles.paragraph}>
            Proper nutrition is not just about appearance or weight control; it is essential for our overall health...
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
    paddingBottom: 100, // dodato za prostor ispod BottomNavigationBar
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