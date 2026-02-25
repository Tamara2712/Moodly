import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import BottomNavigationBar from '../../../components/BottomNavigationBar';
import { images } from "../../../constants/images";

export default function Blog5() {
  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* Hero section */}
        <View style={styles.hero}>
          <Text style={styles.heroText}>
            The Impact of Technology on Emotional Development
          </Text>
        </View>

        {/* Article */}
        <View style={styles.article}>
          <Text style={styles.paragraph}>
            Technology is an inseparable part of modern life. Smartphones, social media, video games, and digital platforms...
          </Text>

          <Image source={images.img3362} style={styles.image} />
          <Text style={styles.heading}>1. Superficial Connections Instead of Deeper Relationships</Text>
          <Text style={styles.paragraph}>
            Although technology connects us with people around the world, paradoxically, many of us feel increasingly lonely...
          </Text>

          <Image source={images.img3363} style={styles.image} />
          <Text style={styles.heading}>2. Reduced Empathy and Emotional Literacy</Text>
          <Text style={styles.paragraph}>
            Studies show that children who spend too much time in front of screens struggle with recognizing emotions in others...
          </Text>

          <Image source={images.img3364} style={styles.image} />
          <Text style={styles.heading}>3. Constant Comparison and Unrealistic Standards</Text>
          <Text style={styles.paragraph}>
            Social media presents a distorted reality—filtered lives, "perfect" appearances, effortless success...
          </Text>

          <Text style={styles.heading}>4. Instant Entertainment, Lower Tolerance for Boredom</Text>
          <Text style={styles.paragraph}>
            Technology has conditioned us to expect instant gratification—one notification, one click, a new image...
          </Text>

          <Text style={styles.heading}>5. Envy, Anxiety, and FOMO (Fear of Missing Out)</Text>
          <Text style={styles.paragraph}>
            Constantly following other people's lives can trigger feelings of inadequacy or that we're missing out on important moments...
          </Text>

          <Text style={styles.heading}>What Can We Do?</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bullet}>• <Text style={styles.bold}>Digital hygiene:</Text> Set boundaries for device use.</Text>
            <Text style={styles.bullet}>• <Text style={styles.bold}>Encourage open communication:</Text> Talk about emotions and online experiences.</Text>
            <Text style={styles.bullet}>• <Text style={styles.bold}>Lead by example:</Text> Model balanced tech use.</Text>
            <Text style={styles.bullet}>• <Text style={styles.bold}>Promote offline time:</Text> Encourage nature, play, and conversation.</Text>
            <Text style={styles.bullet}>• <Text style={styles.bold}>Include emotional education:</Text> Teach kids emotional awareness both online and offline.</Text>
          </View>

          <Text style={styles.heading}>Conclusion</Text>
          <Text style={styles.paragraph}>
            Technology is not the enemy—but its impact on emotional development depends on how we use it...
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
    paddingBottom: 100, // osigurava prostor iznad navigacije
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
  bulletList: {
    marginBottom: 16,
    marginTop: 8,
  },
  bullet: {
    fontSize: 14,
    color: '#502B06',
    lineHeight: 22,
    marginBottom: 6,
  },
  bold: {
    fontWeight: '600',
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 16,
  },
});