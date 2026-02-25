"use client";

import BottomNavigationBar from "@/components/BottomNavigationBar";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function InfoPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-[#DEF5BA] py-4 px-4 flex items-center justify-between">
        <button
          className="text-white text-2xl font-bold mr-4"
          onClick={() => router.back()}
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-white text-2xl font-bold text-center flex-grow -ml-6">
          About us
        </h1>
      </div>

      {/* Centered Content */}
      <div className="flex flex-1 justify-center items-center px-4">
        <div className="bg-purple-100 rounded-3xl p-6 w-full max-w-md text-center shadow-md mt-8">
          <h2 className="text-xl font-semibold text-purple-700 mb-4 tracking-wide">
            Welcome to the App!
          </h2>
          <p className="text-sm text-gray-700 mb-2">
            This application is designed to help you explore your emotions,
            reflect on your mental state, and access resources like therapists,
            courses, and educational content.
          </p>
          <p className="text-sm text-gray-700 mb-2">
            Use the Emotions section to log how you feel, take quizzes to earn
            coins, and shop for premium content using the coins you collect.
          </p>
          <p className="text-sm text-gray-700">
            If you need help, go to the Therapist section or contact support
            through the profile settings.
          </p>
        </div>
      </div>

      <BottomNavigationBar />
    </div>
  );
}