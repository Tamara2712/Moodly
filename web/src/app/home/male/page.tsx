"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "@/lib/firebase";
import BottomNavigationBar from '@/components/BottomNavigationBar';
import { FaCoins } from 'react-icons/fa';
import { IoCartOutline } from "react-icons/io5";

export default function MaleHomePage() {
  const [coins, setCoins] = useState<number | null>(null);
  const [quote, setQuote] = useState<string>("");

  const auth = getAuth();
  const db = getFirestore(app);

  useEffect(() => {
    const fetchCoins = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "coins", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCoins(docSnap.data().coins);
        }
      }
    };

    const fetchRandomQuote = async () => {
      const docRef = doc(db, "quote", "YCZygooS1QqAw3c4ii8t");
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        const data = snapshot.data();
        const totalQuotes = 10;
        const rndIndex = Math.floor(Math.random() * totalQuotes) + 1;
        const key = `quote${rndIndex}`;
        setQuote(data[key]);
      }
    };

    fetchCoins();
    fetchRandomQuote();
  }, [auth, db]);

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#DEF5BA' }}>
      {/* Header icons */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <FaCoins className="text-yellow-500 text-xl" />
        <span className="text-sm font-semibold text-gray-800">
          {coins !== null ? coins : '...'}
        </span>
      </div>
      <div className="absolute top-4 right-4"  style={{color: "#502B06"}}>
        <Link href="/shop" passHref>
          <IoCartOutline className="text-black-200 text-3xl cursor-pointer" />
        </Link>
      </div>

      {/* Scrollable content */}
      <div className="flex-grow overflow-y-auto pb-28 px-4">
        {/* Cloud-styled header */}
        <div className="relative text-center mt-16 flex justify-center">
          <div className="relative inline-block px-6 py-3">
            {/* Background */}
            <div
              className="absolute inset-0 rounded-full bg-[#502B06]"
              style={{
                zIndex: -1,
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              }}
            ></div>

            {/* Text with brown outline */}
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
          <Link href="/emotions_male" passHref>
            <div className="px-10 py-3 rounded-full font-semibold text-lg tracking-wide shadow hover:bg-purple-300 transition text-white" style={{ backgroundColor: '#E9D5FF' }}>
              Emotions
            </div>
          </Link>
        </div>

        {/* Motivational quote */}
        {quote && (
          <div className="text-blue-400 text-center text-lg mt-8 font-medium tracking-wider px-6">
            “{quote}”
          </div>
        )}

        {/* Two blue buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Link href="/therapist-page" passHref>
            <div className="bg-blue-300 text-white px-8 py-4 rounded-full font-semibold tracking-wide shadow hover:bg-blue-400 transition whitespace-nowrap min-w-[150px] text-center">
              Therapists
            </div>
          </Link>
          <Link href="/quiz" passHref>
            <div className="bg-blue-300 text-white px-8 py-4 rounded-full font-semibold tracking-wide shadow hover:bg-blue-400 transition whitespace-nowrap min-w-[150px] text-center">
              Quiz
            </div>
          </Link>
        </div>

        {/* Blog posts - now with 5 items */}
        <div className="mt-12 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {/* Blog Post 1 */}
          <div
            className="bg-cover bg-center rounded-lg shadow overflow-hidden relative h-48"
            style={{ 
              backgroundImage: "url(/images/blog1.png)", 
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
              <Link href="/blog/blog-1" passHref className="text-blue-300 font-medium hover:underline">
                Read More
              </Link>
            </div>
          </div>
          
          {/* Blog Post 2 */}
          <div
            className="bg-cover bg-center rounded-lg shadow overflow-hidden relative h-48"
            style={{ 
              backgroundImage: "url(/images/blog2.png)", 
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
              <Link href="/blog/blog-2" passHref className="text-blue-300 font-medium hover:underline">
                Read More
              </Link>
            </div>
          </div>

          {/* Blog Post 3 */}
          <div
            className="bg-cover bg-center rounded-lg shadow overflow-hidden relative h-48"
            style={{ 
              backgroundImage: "url(/images/blog3.png)", 
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
              <Link href="/blog/blog-3" passHref className="text-blue-300 font-medium hover:underline">
                Read More
              </Link>
            </div>
          </div>

          {/* Blog Post 4 */}
          <div
            className="bg-cover bg-center rounded-lg shadow overflow-hidden relative h-48"
            style={{ 
              backgroundImage: "url(/images/blog4.png)", 
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
              <Link href="/blog/blog-4" passHref className="text-blue-300 font-medium hover:underline">
                Read More
              </Link>
            </div>
          </div>

          {/* Blog Post 5 */}
          <div
            className="bg-cover bg-center rounded-lg shadow overflow-hidden relative h-48"
            style={{ 
              backgroundImage: "url(/images/blog5.png)", 
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
              <Link href="/blog/blog-5" passHref className="text-blue-300 font-medium hover:underline">
                Read More
              </Link>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigationBar />
    </div>
  );
}