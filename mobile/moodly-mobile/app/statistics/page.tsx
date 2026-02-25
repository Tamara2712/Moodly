import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import BottomNavigationBar from "../../components/BottomNavigationBar";

interface EmotionCount {
  name: string;
  value: number;
}

const PASTEL_EMOTION_COLORS: { [emotion: string]: string } = {
  confused: '#9AB39D',
  sad: '#A7D3F5',
  angry: '#FF8883',
  tired: '#C9A2FF',
  ashamed: '#E4A7D4',
  unmotivated: '#D3D3D3',
  scared: '#839DBC',
  anxious: '#FFBA8A',
  happy: '#FEDE4F',
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function StatisticsPage() {
  const [data, setData] = useState<EmotionCount[]>([]);

  useEffect(() => {
    const fetchEmotionData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const journalRef = collection(db, 'journal');
      const q = query(journalRef, where('user', '==', user.uid));
      const snapshot = await getDocs(q);

      const emotionMap: { [emotion: string]: number } = {};

      snapshot.forEach((doc) => {
        const rawEmotion = doc.data().emotion;
        const emotion = rawEmotion?.toLowerCase();
        if (emotion) {
          emotionMap[emotion] = (emotionMap[emotion] || 0) + 1;
        }
      });

      const chartData: EmotionCount[] = Object.entries(emotionMap).map(
        ([name, value]) => ({
          name: capitalize(name),
          value,
        })
      );

      setData(chartData);
    };

    fetchEmotionData();
  }, []);

  const screenWidth = Dimensions.get('window').width - 32;

  const chartData: {
    labels: string[];
    datasets: { data: number[] }[];
  } = {
    labels: data.map((e) => e.name),
    datasets: [
      {
        data: data.map((e) => e.value),
      },
    ],
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Emotion Overview</Text>
          <Text style={styles.headerSubtitle}>
            Distribution of your recorded emotions
          </Text>
        </View>

        <View style={styles.chartContainer}>
          {data.length > 0 ? (
            <BarChart
              data={chartData as any}
              width={screenWidth}
              height={300}
              fromZero
              withInnerLines={false}
              showBarTops
              chartConfig={{
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                color: (_opacity = 1) => '#888',
                barPercentage: 0.6,
                labelColor: () => '#333',
                fillShadowGradient: '#aaa',
                fillShadowGradientOpacity: 1,
                propsForLabels: {
                  fontSize: 12,
                  fontWeight: '600',
                },
              }}
              verticalLabelRotation={30}
              style={{ borderRadius: 20 }}
              yAxisLabel={''}
              yAxisSuffix={''}
            />
          ) : (
            <Text style={styles.noData}>No emotion data found.</Text>
          )}
        </View>

        {data.length > 0 && (
          <View style={styles.legend}>
            {data.map((entry, index) => (
              <View key={index} style={styles.legendItem}>
                <View
                  style={[
                    styles.legendColor,
                    {
                      backgroundColor:
                        PASTEL_EMOTION_COLORS[entry.name.toLowerCase()] || '#ccc',
                    },
                  ]}
                />
                <Text style={styles.legendText}>
                  {entry.name}: {entry.value}
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      <BottomNavigationBar /> 
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingBottom: 40,
  },
  header: {
    backgroundColor: '#e5f8c5',
    paddingVertical: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#555',
    fontSize: 14,
    marginTop: 4,
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  noData: {
    color: '#666',
    fontSize: 16,
    marginTop: 40,
  },
  legend: {
    paddingHorizontal: 24,
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendColor: {
    width: 16,
    height: 16,
    marginRight: 10,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 14,
    color: '#333',
  },
});