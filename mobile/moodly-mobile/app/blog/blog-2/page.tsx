import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import BottomNavigationBar from '../../../components/BottomNavigationBar';
import { images } from "../../../constants/images";
export default function Blog2() {
  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.hero}>
          <Text style={styles.heroText}>
            The Impact of Family on a Child's Emotional Development
          </Text>
        </View>

        {/* Article Content */}
        <View style={styles.article}>
          <Text style={styles.paragraph}>
            The family is the first and most important environment in which a child develops emotional skills...
          </Text>

          <Image source={images.img3358} style={styles.image} />
          <Text style={styles.heading}>1. Early Emotional Bonding</Text>
          <Text style={styles.paragraph}>
            A secure emotional connection with parents or caregivers allows the child to feel loved and safe...
          </Text>

          <Image source={images.img3359} style={styles.image} />
          <Text style={styles.heading}>2. Influence of Parental Emotions</Text>
          <Text style={styles.paragraph}>
            The emotional state of parents directly affects a child's development...
          </Text>

          <Image source={images.img3360} style={styles.image} />
          <Text style={styles.heading}>3. Family Emotional Climate</Text>
          <Text style={styles.paragraph}>
            The emotional climate at home—including how emotions are expressed, communication styles...
          </Text>

          <Image source={images.img3361} style={styles.image} />
          <Text style={styles.heading}>4. The Role of Parental Beliefs About Emotions</Text>
          <Text style={styles.paragraph}>
            Parents who acknowledge and validate their child's emotions help the child feel secure and loved...
          </Text>

          <Text style={styles.heading}>5. Family Cohesion and Resilience</Text>
          <Text style={styles.paragraph}>
            Families that demonstrate resilience and the ability to overcome stress together provide children...
          </Text>

          <Text style={styles.heading}>Conclusion</Text>
          <Text style={styles.paragraph}>
            The family is not only the basic unit of society but also a key factor in shaping a child's emotional well-being...
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
    paddingBottom: 100,
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