"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "@/lib/firebase";
import BottomNavigationBar from '@/components/BottomNavigationBar';
import { FaCoins } from 'react-icons/fa';
import { IoCartOutline } from "react-icons/io5";

export default function FemaleHomePage() {
  const [coins, setCoins] = useState<number | null>(null);
  const [quote, setQuote] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        window.location.href = "/signin";
        return;
      }

      try {
        const docRef = doc(db, "coins", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCoins(docSnap.data().coins);
        }

        const quoteRef = doc(db, "quote", "YCZygooS1QqAw3c4ii8t");
        const quoteSnap = await getDoc(quoteRef);
        if (quoteSnap.exists()) {
          const data = quoteSnap.data();
          const totalQuotes = 10;
          const rndIndex = Math.floor(Math.random() * totalQuotes) + 1;
          const key = `quote${rndIndex}`;
          setQuote(data[key]);
        }
      } catch (error) {
        console.error("Greška pri učitavanju podataka:", error);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return null; // Ili: <div>Loading...</div>

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#DEF5BA' }}>
      {/* Header icons */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <FaCoins className="text-yellow-500 text-xl" />
        <span className="text-sm font-semibold text-gray-800">
          {coins !== null ? coins : '...'}
        </span>
      </div>
      <div className="absolute top-4 right-4" style={{ color: "#502B06" }}>
        <Link href="/shop" passHref>
          <IoCartOutline className="text-black-200 text-3xl cursor-pointer" />
        </Link>
      </div>

      {/* Scrollable content */}
      <div className="flex-grow overflow-y-auto pb-28 px-4">
        <div className="rounded-3xl p-6 mb-6">
          <div className="relative text-center mt-4 flex justify-center">
            <div className="relative inline-block px-6 py-3">
              <h1
                className="text-4xl font-extrabold tracking-wider uppercase leading-snug z-10 relative"
                style={{
                  fontFamily: "'Baloo 2', sans-serif",
                  color: 'white',
                  textShadow: '2px 2px 0px #E9D5FF, -2px -2px 0px #E9D5FF, 2px -2px 0px #E9D5FF, -2px 2px 0px #E9D5FF',
                }}
              >
                HOW DO YOU FEEL TODAY?
              </h1>
            </div>
          </div>

          <div className="mt-6 mx-auto flex justify-center">
            <Link href="/emotions_female" passHref>
              <div className="px-10 py-3 rounded-full font-semibold text-lg tracking-wide shadow hover:bg-pink-300 transition text-white" style={{ backgroundColor: '#E9D5FF' }}>
                Emotions
              </div>
            </Link>
          </div>
        </div>

        {/* Motivational quote */}
        {quote && (
          <div className="text-pink-300 text-center text-lg mt-8 font-medium tracking-wider px-6">
            “{quote}”
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Link href="/therapist-page" passHref>
            <div className="bg-pink-200 text-white px-8 py-4 rounded-full font-semibold tracking-wide shadow hover:bg-pink-300 transition whitespace-nowrap min-w-[150px] text-center">
              Therapists
            </div>
          </Link>
          <Link href="/quiz" passHref>
            <div className="bg-pink-200 text-white px-8 py-4 rounded-full font-semibold tracking-wide shadow hover:bg-pink-300 transition whitespace-nowrap min-w-[150px] text-center">
              Quiz
            </div>
          </Link>
        </div>

        {/* Blog posts */}
        <div className="mt-12 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="bg-cover bg-center rounded-lg shadow overflow-hidden relative h-48"
              style={{
                backgroundImage: `url(/images/blog${i}.png)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
                <Link href={`/blog/blog-${i}`} passHref className="text-pink-300 font-medium hover:underline">
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNavigationBar />
    </div>
  );
}