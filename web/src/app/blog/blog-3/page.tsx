"use client";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import BottomNavigationBar from "@/components/BottomNavigationBar";

export default function Blog3() {
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
            Nutrition is one of the most important factors influencing our health—both physical and mental. 
            With proper nutrition and physical activity, we can achieve balance in the body, strengthen the 
            immune system, improve mood, and even help alleviate depression.
          </p>

          {/* Image before each section */}
          <div className="w-full h-48 rounded-lg overflow-hidden">
            <img 
              src="/images/IMG_3365.JPG" 
              alt="Balanced diet plate"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-lg font-semibold mt-4 text-[#502B06]">1. A Balanced Diet as the Foundation of Health</h2>
          <p>
            At the core of a healthy lifestyle is a balanced diet. The concept of "nutrition and health" goes 
            beyond calorie counting and encompasses the quality and variety of the foods we consume. A balanced 
            diet means providing the body with essential nutrients it needs to function optimally, support growth, 
            and maintain overall health. This balance includes a careful mix of macronutrients—proteins, fats, 
            and carbohydrates—as well as micronutrients like vitamins and minerals.
          </p>

          <div className="w-full h-48 rounded-lg overflow-hidden">
            <img 
              src="/images/IMG_3366.JPG" 
              alt="Immune-boosting foods"
              className="w-full h-auto object-cover"
            />
          </div>
          <h2 className="text-lg font-semibold mt-4 text-[#502B06]">2. Nutrition and Immunity</h2>
          <p>
            Proper nutrition is crucial for strengthening the immune system. Foods rich in antioxidants such as 
            vitamins C and E, zinc, and selenium can help fight infections and support a healthy immune response. 
            Additionally, a healthy diet promotes gut health, which plays an important role in immune function.
          </p>

          <div className="w-full h-48 rounded-lg overflow-hidden">
            <img 
              src="/images/IMG_3367.JPG" 
              alt="Healthy foods preventing disease"
              className="w-full h-auto object-cover"
            />
          </div>
          <h2 className="text-lg font-semibold mt-4 text-[#502B06]">3. Nutrition and Chronic Disease Prevention</h2>
          <p>
            A healthy diet can play a key role in preventing chronic illnesses such as diabetes, heart disease, 
            and cancer. A diet rich in fruits, vegetables, whole grains, and healthy fats can reduce the risk of 
            these conditions. Moreover, limiting the intake of sugar, processed foods, and saturated fats also 
            contributes to better overall health.
          </p>

          <div className="w-full rounded-lg overflow-hidden">
                <img 
                    src="/images/IMG_3368.JPG" 
                    alt="Brain-healthy foods"
                    className="w-full h-auto object-cover"
                />
            </div>
          <h2 className="text-lg font-semibold mt-4 text-[#502B06]">4. Mental Health and Nutrition</h2>
          <p>
            Recent research has highlighted the complex link between diet and mental health. A well-balanced diet 
            rich in omega-3 fatty acids, vitamins, and minerals has been associated with reduced symptoms of 
            depression, anxiety, and stress. Certain foods—such as fatty fish, nuts, seeds, and leafy greens—contain 
            compounds that support brain health and cognitive function. By prioritizing these foods, individuals can 
            enhance their mood, concentration, and overall mental well-being.
          </p>
          <div className="w-full  rounded-lg overflow-hidden">
            <img 
              src="/images/IMG_3369.JPG" 
              alt="Brain-healthy foods"
              className="w-full h-auto object-cover"
            />
          </div>
          <h2 className="text-lg font-semibold mt-4 text-[#502B06]">Conclusion</h2>
          <p>
            Proper nutrition is not just about appearance or weight control; it is essential for our overall health. 
            By investing in high-quality, balanced nutrition, we are investing in long-term vitality, mental clarity, 
            and bodily resilience. Start with small changes, such as increasing your intake of fruits and vegetables, 
            reducing consumption of processed foods, and incorporating more physical activity. Every positive step 
            contributes to better health.
          </p>
          <div></div>
        </article>
      </main>

      <BottomNavigationBar />
    </div>
  );
}