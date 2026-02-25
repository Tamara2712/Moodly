"use client";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import BottomNavigationBar from "@/components/BottomNavigationBar";

export default function Blog2() {
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
            The family is the first and most important environment in which a child develops emotional skills. 
            From how parents communicate with the child to the overall atmosphere at home, all these components 
            shape emotional stability, social skills, and the ability to cope with life's challenges.
          </p>

          {/* Image before each section */}
          <div className="w-full h-48 rounded-lg overflow-hidden">
            <img 
              src="/images/IMG_3358.JPG" 
              alt="Parent and child bonding"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-lg font-semibold mt-4 text-[#502B06]">1. Early Emotional Bonding</h2>
          <p>
            A secure emotional connection with parents or caregivers allows the child to feel loved and safe. 
            This bond forms the foundation for developing confidence and the ability to handle stressful situations. 
            Studies show that parents who offer emotional support from an early age reduce the risk of later 
            behavioral and mental health issues in their children.
          </p>

          <div className="w-full h-48 rounded-lg overflow-hidden">
            <img 
              src="/images/IMG_3359.JPG" 
              alt="Parents interacting with child"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-lg font-semibold mt-4 text-[#502B06]">2. Influence of Parental Emotions</h2>
          <p>
            The emotional state of parents directly affects a child's development. When parents are emotionally 
            stable and responsive, children develop better social skills and problem-solving abilities. On the 
            other hand, parents who are frequently stressed or emotionally distant can unintentionally pass 
            those negative patterns on to their children.
          </p>

          <div className="w-full h-48 rounded-lg overflow-hidden">
            <img 
              src="/images/IMG_3360.JPG" 
              alt="Happy family at home"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-lg font-semibold mt-4 text-[#502B06]">3. Family Emotional Climate</h2>
          <p>
            The emotional climate at home—including how emotions are expressed, communication styles, and 
            mutual support—shapes a child's emotional development. A positive emotional climate contributes 
            to better emotional and social adjustment, while a negative one may increase the risk of behavioral 
            and mental health issues.
          </p>

          <div className="w-full h-48 rounded-lg overflow-hidden">
            <img 
              src="/images/IMG_3361.JPG" 
              alt="Parent comforting child"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-lg font-semibold mt-4 text-[#502B06]">4. The Role of Parental Beliefs About Emotions</h2>
          <p>
            Parents who acknowledge and validate their child's emotions help the child feel secure and loved. 
            This approach fosters healthy emotional regulation and strengthens the child's sense of safety in 
            the parent-child relationship.
          </p>
          <h2 className="text-lg font-semibold mt-4 text-[#502B06]">5. Family Cohesion and Resilience</h2>
          <p>
            Families that demonstrate resilience and the ability to overcome stress together provide children 
            with a model for coping with life's challenges. These families often have more positive outcomes 
            in children's emotional and social development, as children learn how to manage stress and form 
            strong interpersonal relationships.
          </p>

          <h2 className="text-lg font-semibold mt-4 text-[#502B06]">Conclusion</h2>
          <p>
            The family is not only the basic unit of society but also a key factor in shaping a child's emotional 
            well-being. Through love, attention, stability, and a positive emotional climate, parents can make 
            a significant contribution to their children's healthy emotional development. Understanding and 
            investing in these aspects can bring long-term benefits to a child's well-being and their ability 
            to handle life's difficulties.
          </p>
          <div></div>
        </article>
      </main>

      <BottomNavigationBar />
    </div>
  );
}