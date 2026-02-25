"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import BottomNavigationBar from "@/components/BottomNavigationBar";


export default function SettingsPage() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/signin");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  const handleClick = () => {
    router.push("/statistics"); // zameni sa svojom putanjom
  };
  return (
    <div className="min-h-screen flex flex-col bg-[#DEF5BA]">
      {/* Header */}    
      <div className="bg-[#DEF5BA] text-white py-4 text-center text-3xl font-bold tracking-wider">
        Options
      </div>

      {/* Centralni box sa roze pozadinom */}
      <div className="flex-grow flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-md rounded-3xl bg-[#E9D5FF] p-6 shadow-md text-center">
          <h2 className="text-white text-lg mb-4 font-semibold tracking-wider">App Options</h2>
          <ul className="space-y-4">
            <li>
              <Link href="/rsettings">
              <button className="w-full bg-purple-400 py-2 rounded-full text-white tracking-wider hover:bg-purple-500 transition">
                Settings
              </button>
              </Link>
                </li>
            <li>
              <Link href="/statistics">
                <button onClick={handleClick} className="w-full bg-purple-400 py-2 rounded-full text-white tracking-wider hover:bg-purple-500 transition">
                  Statistics
                </button>
              </Link>
            </li>
            <li>
              <Link href="/info">
              <button className="w-full bg-purple-400 py-2 rounded-full text-white tracking-wider hover:bg-purple-500 transition">
                About us
              </button>
              </Link>
            </li>
            <li>
              <Link href="/help">
              <button className="w-full bg-purple-400 py-2 rounded-full text-white tracking-wider hover:bg-purple-500 transition">
                Help
              </button>
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full bg-red-400 py-2 rounded-full text-white tracking-wider hover:bg-red-500 transition"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>

      <BottomNavigationBar />
    </div>
  );
}