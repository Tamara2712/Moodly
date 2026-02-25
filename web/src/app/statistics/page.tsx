"use client";

import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { app } from "@/lib/firebase";
import BottomNavigationBar from "@/components/BottomNavigationBar";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface EmotionCount {
  name: string;
  value: number;
}

const PASTEL_EMOTION_COLORS: { [emotion: string]: string } = {
  confused: "#9AB39D",
  sad: "#A7D3F5",
  angry: "#FF8883",
  tired: "#C9A2FF",
  ashamed: "#E4A7D4",
  unmotivated: "#D3D3D3",
  scared: "#839DBC",
  anxious: "#FFBA8A",
  happy: "#FEDE4F",
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const StatisticsPage: React.FC = () => {
  const [data, setData] = useState<EmotionCount[]>([]);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(app);
    const db = getFirestore(app);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      try {
        const journalRef = collection(db, "journal");
        const q = query(journalRef, where("user", "==", user.uid));
        const snapshot = await getDocs(q);

        const emotionMap: { [emotion: string]: number } = {};

        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          const rawEmotion = data.emotion;
          const emotion = rawEmotion?.toLowerCase();

          if (emotion) {
            emotionMap[emotion] = (emotionMap[emotion] || 0) + 1;
          }
        });

        const chartData: EmotionCount[] = Object.entries(emotionMap).map(([name, value]) => ({
          name: capitalize(name),
          value,
        }));

        setData(chartData);
      } catch (error) {
        console.error("Error fetching emotion data:", error);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header with back button */}
      <div className="bg-[#DEF5BA] py-4 px-4 flex items-center justify-between shadow">
        <button
          className="text-white text-2xl font-bold mr-4"
          onClick={() => router.back()}
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-white text-2xl font-bold text-center flex-grow -ml-6">
          Emotion stats
        </h1>
      </div>

      {/* Chart Section */}
      <main className="flex-grow flex justify-center items-center pb-6 px-4">
        {data.length > 0 ? (
          <div className="bg-white rounded-3xl p-6 w-full max-w-md">
            <PieChart width={320} height={320}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                labelLine={false}
                isAnimationActive={false}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={PASTEL_EMOTION_COLORS[entry.name.toLowerCase()] || "#ccc"}
                    stroke="none"
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value} entries`, name]} />
              <Legend wrapperStyle={{ paddingTop: "20px", textAlign: "center" }} />
            </PieChart>
          </div>
        ) : (
          <p className="text-gray-600 text-lg text-center">No emotion data found.</p>
        )}
      </main>

      <div className="h-4 bg-[#fbd4df] w-full" />
      <BottomNavigationBar />
    </div>
  );
};

export default StatisticsPage;