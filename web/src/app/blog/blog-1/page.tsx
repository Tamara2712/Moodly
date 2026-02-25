"use client";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import BottomNavigationBar from "@/components/BottomNavigationBar";

export default function Blog1() {
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
            In today's fast-paced world, sleep is often sacrificed for work, studying,
            or endless scrolling through social media. Although we might not notice the
            consequences right away, chronic sleep deprivation can have serious effects
            on our emotional health. Research increasingly shows a strong connection
            between sleep quality and our emotional well-being.
          </p>

          {/* Image before each section */}
          <div className="w-full h-48 rounded-lg overflow-hidden">
            <img 
              src="/images/IMG_3354.JPG" 
              alt="Person feeling irritable from lack of sleep"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-lg font-semibold mt-4 text-[#502B06]">1. Increased Irritability and Stress</h2>
          <p>
            One of the first things we notice when we don't get enough sleep is a lack
            of patience and heightened irritability. When we're sleep-deprived, our
            threshold for frustration drops significantly, and even minor problems can
            trigger intense reactions. Additionally, levels of the stress hormone—
            cortisol—increase, further worsening our mood.
          </p>

          <div className="w-full h-48 rounded-lg overflow-hidden">
            <img 
              src="/images/IMG_3355.JPG" 
              alt="Person experiencing anxiety from sleep deprivation"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-lg font-semibold mt-4 text-[#502B06]">2. Higher Risk of Anxiety and Depression</h2>
          <p>
            Studies show that people who regularly sleep less than six hours per night
            are at a significantly higher risk of developing anxiety and depressive
            disorders. Sleep deprivation affects brain function, particularly the
            amygdala—the part of the brain responsible for processing emotions.
          </p>
          <h2 className="text-lg font-semibold mt-4 text-[#502B06]">3. Difficulty Regulating Emotions</h2>
          <p>
            Sleep plays a key role in processing emotions. During the REM phase of sleep,
            the brain processes emotional experiences from the day and "sorts" them. When
            REM sleep is disrupted or shortened, this ability is weakened.
          </p>

          <div className="w-full h-48 rounded-lg overflow-hidden">
            <img 
              src="/images/IMG_3356.JPG" 
              alt="Couple arguing due to sleep deprivation"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-lg font-semibold mt-4 text-[#502B06]">4. Poorer Interpersonal Relationships</h2>
          <p>
            Chronic sleep deprivation doesn't just affect us—it also impacts our
            relationships with others. When we are emotionally exhausted, we are less
            empathetic, more prone to conflict, and have a harder time communicating
            clearly.
          </p>

          <div className="w-full h-48 rounded-lg overflow-hidden">
            <img 
              src="/images/IMG_3357.JPG" 
              alt="Person struggling with decision making"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-lg font-semibold mt-4 text-[#502B06]">5. Impaired Decision-Making</h2>
          <p>
            Lack of sleep affects the frontal cortex—the part of the brain responsible
            for decision-making, planning, and impulse control. When this area isn't
            functioning properly, we are more likely to make emotional, impulsive, or
            poorly thought-out decisions.
          </p>
          <h2 className="text-lg font-semibold mt-4 text-[#502B06]">How to Improve Sleep and Protect Emotional Health</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Establish a routine:</strong> Go to bed and wake up at the same time every day, even on weekends.</li>
            <li><strong>Avoid screens before bed:</strong> Blue light disrupts melatonin production.</li>
            <li><strong>Evening routine:</strong> Try a light walk, warm bath, or reading a book to unwind.</li>
            <li><strong>Watch your diet:</strong> Avoid caffeine, alcohol, and heavy meals late at night.</li>
            <li><strong>Talk to someone:</strong> If stress is the cause of insomnia, seek support.</li>
          </ul>
          <div></div>
        </article>
      </main>

      <BottomNavigationBar />
    </div>
  );
}