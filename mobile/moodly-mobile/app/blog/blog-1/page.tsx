import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';
import BottomNavigationBar from '../../../components/BottomNavigationBar';
import { images } from "../../../constants/images";

export default function Blog1() {
  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>
            How Lack of Sleep Affects Emotional Well-Being
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.paragraph}>
            In today's fast-paced world, sleep is often sacrificed for work, studying, or endless scrolling...
          </Text>

          <Image source={images.img3354} style={styles.image} />
          <Text style={styles.subTitle}>1. Increased Irritability and Stress</Text>
          <Text style={styles.paragraph}>
            One of the first things we notice when we don't get enough sleep is a lack of patience...
          </Text>

          <Image source={images.img3355} style={styles.image} />
          <Text style={styles.subTitle}>2. Higher Risk of Anxiety and Depression</Text>
          <Text style={styles.paragraph}>
            Studies show that people who regularly sleep less than six hours per night are at higher risk...
          </Text>

          <Text style={styles.subTitle}>3. Difficulty Regulating Emotions</Text>
          <Text style={styles.paragraph}>
            Sleep plays a key role in processing emotions. During the REM phase of sleep...
          </Text>

          <Image source={images.img3356} style={styles.image} />
          <Text style={styles.subTitle}>4. Poorer Interpersonal Relationships</Text>
          <Text style={styles.paragraph}>
            Chronic sleep deprivation doesn't just affect us—it also impacts our relationships...
          </Text>

          <Image source={images.img3357} style={styles.image} />
          <Text style={styles.subTitle}>5. Impaired Decision-Making</Text>
          <Text style={styles.paragraph}>
            Lack of sleep affects the frontal cortex—the part of the brain responsible for decision-making...
          </Text>

          <Text style={styles.subTitle}>How to Improve Sleep and Protect Emotional Health</Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>
              • <Text style={styles.bold}>Establish a routine:</Text> Go to bed and wake up at the same time every day.
            </Text>
            <Text style={styles.listItem}>
              • <Text style={styles.bold}>Avoid screens before bed:</Text> Blue light disrupts melatonin production.
            </Text>
            <Text style={styles.listItem}>
              • <Text style={styles.bold}>Evening routine:</Text> Try a walk, warm bath, or reading.
            </Text>
            <Text style={styles.listItem}>
              • <Text style={styles.bold}>Watch your diet:</Text> Avoid caffeine, alcohol, and heavy meals.
            </Text>
            <Text style={styles.listItem}>
              • <Text style={styles.bold}>Talk to someone:</Text> If stress causes insomnia, seek help.
            </Text>
          </View>
        </View>
      </ScrollView>

      <BottomNavigationBar />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DEF5BA',
    padding: 20,
    paddingBottom: 100,
  },
  hero: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#502B06',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  section: {
    maxWidth: 700,
    alignSelf: 'center',
  },
  paragraph: {
    fontSize: 16,
    color: '#502B06',
    marginBottom: 16,
    lineHeight: 24,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#502B06',
    marginTop: 20,
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  list: {
    marginTop: 8,
    gap: 8,
  },
  listItem: {
    fontSize: 15,
    color: '#502B06',
    marginBottom: 8,
    lineHeight: 22,
  },
  bold: {
    fontWeight: '600',
  },
});
