"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import BottomNavigationBar from "@/components/BottomNavigationBar";
import { ChevronLeft } from "lucide-react";

const emotions = [
  "Confused",
  "Sad",
  "Angry",
  "Tired",
  "Ashamed",
  "Unmotivated",
  "Scared",
  "Anxious",
];

export default function EmotionMalePage() {
  const router = useRouter();

  const handleEmotionClick = (emotion: string) => {
    const lowerCaseEmotion = emotion.toLowerCase();
    router.push("/emotion-journal?emotion=" + encodeURIComponent(lowerCaseEmotion));
  };

  const radius = 110;
  const centerX = 160;
  const centerY = 160;

  const emotionImages = {
    Confused: "/images/confused male.png",
    Sad: "/images/sad male.png",
    Angry: "/images/angry male.png",
    Tired: "/images/tired male.png",
    Ashamed: "/images/ashamed male.png",
    Unmotivated: "/images/unmotivated male.png",
    Scared: "/images/scared male.png",
    Anxious: "/images/anxious male.png",
    Happy: "/images/happy male.png",
  };

  return (
    <div className="min-h-screen bg-white-100 flex flex-col items-center pt-6 relative">
      {/* Dugme za nazad u gornjem levom uglu */}
      <button
        className="absolute top-4 left-4 text-black z-10"
        onClick={() => router.back()}
      >
        <ChevronLeft className="w-6 h-6 text-black" />
      </button>

      {/* Dugme za prevod ili poruku */}
      <button className="bg-lime-100 text-black px-6 py-2 rounded-full text-lg font-semibold mb-4 mt-2">
        Choose your emotion
      </button>

      {/* Naslov */}
      <h1 className="text-black text-xl font-bold tracking-wider mb-6">
        Check how you feel?
      </h1>

      {/* Centrirani krug emocija */}
      <div className="relative w-80 h-80 bg-purple-200 rounded-3xl mb-10">
        {/* Happy u centru */}
        <button
          onClick={() => handleEmotionClick("Happy")}
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-lime-100 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform overflow-hidden"
        >
          <Image
            src={emotionImages.Happy}
            alt="Happy"
            width={60}
            height={60}
          />
        </button>

        {/* Ostale emocije raspoređene kružno */}
        {emotions.map((emotion, index) => {
          const angle = (index / emotions.length) * 2 * Math.PI;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);

          return (
            <button
              key={index}
              onClick={() => handleEmotionClick(emotion)}
              className="absolute w-20 h-20 bg-lime-100 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform overflow-hidden"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <Image
                src={emotionImages[emotion as keyof typeof emotionImages]}
                alt={emotion}
                width={60}
                height={60}
              />
            </button>
          );
        })}
      </div>

      <BottomNavigationBar />
    </div >
  );
}