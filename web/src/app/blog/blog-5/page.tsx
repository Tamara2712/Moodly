"use client";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import BottomNavigationBar from "@/components/BottomNavigationBar";

export default function Blog5() {
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
            Technology is an inseparable part of modern life. Smartphones, social media, video games, and digital platforms 
            shape how we communicate, learn, and spend our time. While technology brings many benefits, one important question 
            arises: how do ever-present screens affect our emotional development—especially in children and young people?
          </p>

          {/* Image before each section */}
          <div className="w-full h-48 rounded-lg overflow-hidden">
            <img 
              src="/images/IMG_3362.JPG" 
              alt="People using smartphones instead of talking"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-lg font-semibold mt-4 text-[#502B06]">1. Superficial Connections Instead of Deeper Relationships</h2>
          <p>
            Although technology connects us with people around the world, paradoxically, many of us feel increasingly lonely. 
            Digital communication often replaces real, face-to-face interactions, which are crucial for developing empathy, 
            emotional intelligence, and interpersonal skills. When a "like" becomes a substitute for real support, emotional 
            depth in relationships is lost.
          </p>

          <div className="w-full h-48 rounded-lg overflow-hidden">
            <img 
              src="/images/IMG_3363.JPG" 
              alt="Child struggling with emotions"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-lg font-semibold mt-4 text-[#502B06]">2. Reduced Empathy and Emotional Literacy</h2>
          <p>
            Studies show that children who spend too much time in front of screens struggle with recognizing emotions in others. 
            Why? Because of a lack of direct contact—facial expressions, tone of voice, body language—all essential for 
            understanding emotions. Without these cues, emotional literacy can be slowed in development.
          </p>

          <div className="w-full h-48 rounded-lg overflow-hidden">
            <img 
              src="/images/IMG_3364.JPG" 
              alt="Teenager comparing herself to social media"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-lg font-semibold mt-4 text-[#502B06]">3. Constant Comparison and Unrealistic Standards</h2>
          <p>
            Social media presents a distorted reality—filtered lives, "perfect" appearances, effortless success. Constant 
            exposure to such content can negatively impact self-esteem and emotional stability, especially in adolescents. 
            Comparing oneself to others often leads to feelings of inferiority, envy, and even depression.
          </p>
          <h2 className="text-lg font-semibold mt-4 text-[#502B06]">4. Instant Entertainment, Lower Tolerance for Boredom</h2>
          <p>
            Technology has conditioned us to expect instant gratification—one notification, one click, a new image. This shapes 
            the brain to become impatient and less capable of dealing with frustration, waiting, or boredom. Yet it is precisely 
            in those moments that key aspects of emotional regulation and self-control are developed.
          </p>
          <h2 className="text-lg font-semibold mt-4 text-[#502B06]">5. Envy, Anxiety, and FOMO (Fear of Missing Out)</h2>
          <p>
            Constantly following other people's lives can trigger feelings of inadequacy or that we're missing out on important 
            moments. FOMO becomes a source of anxiety, affecting emotional balance and often leading to compulsive use of 
            technology—even when we know it doesn't make us feel good.
          </p>

          <h2 className="text-lg font-semibold mt-4 text-[#502B06]">What Can We Do?</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Digital hygiene:</strong> Set boundaries for device use—especially before bedtime and during family time.</li>
            <li><strong>Encourage open communication:</strong> Talk to children about emotions, online experiences, and the difference between virtual and real life.</li>
            <li><strong>Lead by example:</strong> Children learn by observing. If adults are constantly on their phones, that becomes the new "normal."</li>
            <li><strong>Promote offline time:</strong> Spending more time playing, in nature, and in face-to-face interactions fosters healthy emotional development.</li>
            <li><strong>Include emotional education:</strong> Schools and parents should teach children how to recognize, express, and manage emotions—both online and offline.</li>
          </ul>

          <h2 className="text-lg font-semibold mt-4 text-[#502B06]">Conclusion</h2>
          <p>
            Technology is not the enemy—but its impact on emotional development depends on how we use it. Striking a balance 
            between the digital and real world is key to preserving emotional health and nurturing a stable, empathetic personality. 
            In a time when screens are all around us, perhaps the most important lesson is learning how to stay connected—to 
            ourselves and to others—beyond them.
          </p>
          <div></div>
        </article>
      </main>

      <BottomNavigationBar />
    </div>
  );
}