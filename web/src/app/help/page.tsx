"use client";

import React from "react";
import BottomNavigationBar from "@/components/BottomNavigationBar";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HelpPage() {
  const router = useRouter();
  const institutions = [
    {
      name: "Centar Srce",
      contact: "0800 300303",
      email: "vanja@centarsrce.org",
    },
    {
      name: "Centar za mentalno zdravlje",
      contact: "011 3307 500",
      email: " institutzamentalnozdravlje@imh.org.rs",
    },
    {
      name: "Klinika Laza Lazarević, Nacionalna linija za pomoć adolescentima",
      contact: " 0800 309309",
      email: "drlazal@lazalazarevic.rs",
    },
    {
      name: "Pokret Nesalomivi",
      contact: "0800 001002",
      email: "pokret@nesalomivi.rs",
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="bg-[#DEF5BA] py-4 px-4 flex items-center justify-between">
        <button
          className="text-white text-2xl font-bold mr-4"
          onClick={() => router.back()}
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-white text-2xl font-bold text-center flex-grow -ml-6">
          Institutions
        </h1>
      </div>


      <main className="flex-grow px-4 pt-6 pb-20">
        <p className="text-center text-gray-600 mb-4">
          If you need help or support, feel free to contact one of the institutions below:
        </p>
        <div className="space-y-4">
          {institutions.map((inst, idx) => (
            <div key={idx} className="bg-purple-100 rounded-xl p-4 shadow">
              <h2 className="text-lg font-semibold text-purple-800">{inst.name}</h2>
              <p className="text-sm text-gray-700">Phone: {inst.contact}</p>
              <p className="text-sm text-gray-700">Email: {inst.email}</p>
            </div>
          ))}
        </div>
      </main>
      <BottomNavigationBar />
    </div>
  );
}