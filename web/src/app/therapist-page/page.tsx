"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import BottomNavigationBar from "@/components/BottomNavigationBar";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Router } from "next/router";

const therapists = [
  {
    name: "Dr. Marija Rašić",
    description: "More about therapist",
    contactPage: "/contact/marija",
    image: "/images/Marija.jpg",
  }
];

export default function TherapistsPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col bg-purple-100">
      {/* Gornji deo sa naslovom */}
      <div className="bg-[#DEF5BA] py-4 px-4 flex items-center justify-between">
      <button
          className="text-white text-2xl font-bold mr-4"
          onClick={() => router.back()}
        >
        <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-white text-2xl font-bold text-center flex-grow -ml-6">
          Our therapists
        </h1>
      </div>

      {/* Poruka ispod naslova */}
      <div className="bg-purple-200 text-white text-center py-2 text-sm">
        Choose therapist and start a chat
      </div>

      {/* Kartice terapeuta */}
      <main className="flex flex-col gap-6 px-4 py-6">
        {therapists.map((therapist, index) => (
          <div
            key={index}
            className="bg-purple-200 rounded-lg p-4 shadow-md flex flex-col items-center"
          >
            <div className="w-32 h-32 bg-white rounded-lg overflow-hidden flex justify-center items-center mb-4">
              <Image
                src={therapist.image}
                alt={therapist.name}
                width={100}
                height={100}
                className="object-cover"
              />
            </div>
            <div className="text-center">
              <h2 className="text-white text-lg font-bold">{therapist.name}</h2>
              <p className="text-white text-sm">{therapist.description}</p>
            </div>
            <Link href={therapist.contactPage}>
              <button className="mt-4 bg-lime-300 text-white px-6 py-2 rounded-full text-sm">
                Contact
              </button>
            </Link>
          </div>
        ))}
      </main>

      <BottomNavigationBar />
    </div>
  );
}