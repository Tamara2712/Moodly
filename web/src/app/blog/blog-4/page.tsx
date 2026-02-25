"use client";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import BottomNavigationBar from "@/components/BottomNavigationBar";

export default function Blog4() {
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#DEF5BA' }}>
      {/* Hero Section with image */}
      <button
        className="absolute top-4 left-4 z-10 text-#502B06"
        onClick={() => router.back()}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <header className="w-full py-5 #DEF5BA text-#502B06 flex justify-center items-center ">
        <h2 className="text-2xl md:text-4xl text-#502B06 font-bold tracking-wide">How Lack of Sleep Affects Emotional Well-Being</h2>
      </header>

      {/* Main content */}
      <main className="flex-grow px-4 py-6 text-[#502B06]" style={{ backgroundColor: '#DEF5BA' }}>
        <article className="max-w-3xl mx-auto space-y-6 text-[#502B06]">
          <p>
            Physical activity is not only essential for physical health — it also has a profound impact on our emotional well-being. 
            Regular exercise can significantly contribute to improved self-confidence, reduced stress and anxiety, and greater emotional resilience.
          </p>

          {/* Image before each section */}
          <div className="w-full h-48 rounded-lg overflow-hidden">
            <img 
              src="/images/IMG_3274.JPG" 
              alt="People exercising outdoors"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-lg font-semibold mt-4 text-[#502B06]">1. Increases "Happy Hormones"</h2>
          <p>
            During physical activity, the brain releases endorphins, serotonin, and dopamine — neurotransmitters that improve mood 
            and reduce feelings of stress and anxiety. These natural "happy hormones" act like natural antidepressants, providing 
            instant emotional relief.
          </p>

          <div className="w-full h-48 rounded-lg overflow-hidden">
            <img 
              src="/images/IMG_3275.JPG" 
              alt="Person meditating after workout"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-lg font-semibold mt-4 text-[#502B06]">2. Reduces Stress and Anxiety</h2>
          <p>
            Exercise helps lower cortisol levels, the stress hormone, and enhances communication between different parts of the 
            nervous system, resulting in better stress management.
          </p>

          <div className="w-full h-48 rounded-lg overflow-hidden">
            <img 
              src="/images/IMG_3276.JPG" 
              alt="Person achieving fitness goal"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-lg font-semibold mt-4 text-[#502B06]">3. Boosts Self-Confidence and Self-Image</h2>
          <p>
            Achieving fitness goals — such as increasing stamina or learning new skills — contributes to a stronger sense of 
            self-confidence. The feeling of accomplishment in physical endeavors often translates into other areas of life.
          </p>

          <div className="w-full h-48 rounded-lg overflow-hidden">
            <img 
              src="/images/IMG_3278.JPG" 
              alt="Person sleeping well"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-lg font-semibold mt-4 text-[#502B06]">4. Improves Sleep Quality</h2>
          <p>
            Regular physical activity contributes to better sleep, which is crucial for emotional balance. People who exercise 
            regularly tend to fall asleep faster and enjoy deeper sleep, which positively affects their mental health.
          </p>

          <div className="w-full h-48 rounded-lg overflow-hidden">
            <img 
              src="/images/IMG_3279.JPG" 
              alt="Group exercising together"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-lg font-semibold mt-4 text-[#502B06]">5. Connects Us with Others</h2>
          <p>
            Participating in group sports or shared workouts offers opportunities for social interaction, which can reduce 
            feelings of loneliness and enhance a sense of belonging.
          </p>

          <h2 className="text-lg font-semibold mt-4 text-[#502B06]">How to Get Started?</h2>
          <p>
            You don't need to jump into intense training right away. Start with daily walks, bike rides, or yoga. 
            The goal is to make physical activity a natural part of your everyday routine.
          </p>

          <h2 className="text-lg font-semibold mt-4 text-[#502B06]">Conclusion</h2>
          <p>
            Physical activity is not just a means to achieve physical fitness, but a powerful tool for enhancing emotional well-being. 
            Incorporating regular exercise into your daily life can lead to better emotional balance, increased confidence, and reduced stress.
          </p>
          <div></div>
        </article>
      </main>

      <BottomNavigationBar />
    </div>
  );
}