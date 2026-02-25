"use client";

import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "@/lib/firebase";
import BottomNavigationBar from "@/components/BottomNavigationBar";
import { useRouter } from "next/navigation";

const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    photoURL: "",
  });
  const [frameURL, setFrameURL] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(app);
    const db = getFirestore(app);

    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser) {
        router.push("/signin");
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            email: data.email || "",
            photoURL: data.photoURL || "",
          });
        }

        const selectedDoc = await getDoc(doc(db, "selected", currentUser.uid));
        if (selectedDoc.exists()) {
          const selected = selectedDoc.data();
          if (selected.itemId === "p1") {
            setFrameURL("/images/blushPremium.png");
          }
        }
      } catch (error) {
        console.error("Greška pri učitavanju korisničkih podataka:", error);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleEditClick = () => {
    router.push("/edit-profile");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      {/* Header */}
      <div className="w-full py-4 px-6 flex items-center text-center" style={{ backgroundColor: '#DEF5BA' }}>
        <h1 className="text-white text-2xl font-semibold tracking-widest">Profile</h1>
      </div>

      {/* Card */}
      <div className="bg-purple-100 rounded-3xl mt-8 p-6 w-[85%] max-w-md text-center shadow-md">
        <div className="relative w-32 h-32 mx-auto mb-6">
          <div className="w-full h-full rounded-full bg-purple-300 overflow-hidden shadow-lg flex items-center justify-center">
            {userData.photoURL ? (
              <img
                src={userData.photoURL}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white font-semibold text-sm">No Image</span>
            )}
          </div>
          {frameURL && (
            <img
              src={frameURL}
              alt="Selected Frame"
              className="absolute inset-0 w-full h-full object-cover rounded-full pointer-events-none"
            />
          )}
        </div>

        <h2 className="text-xl font-semibold text-white tracking-wider mb-2">
          {userData.firstName} {userData.lastName}
        </h2>
        <p className="text-white mb-4 tracking-wider">{userData.email}</p>

        <div className="flex flex-col space-y-4">
          <button
            onClick={handleEditClick}
            className=" text-white font-semibold text-lg py-2 px-6 rounded-md" style={{ backgroundColor: '#DEF5BA' }}
          >
            Edit
          </button>

          <button
            onClick={() => router.push("/items")}
            className="bg-pink-300 text-white font-semibold text-lg py-2 px-6 rounded-md"
          >
            My Items
          </button>
        </div>
      </div>

      <BottomNavigationBar />
    </div>
  );
};

export default ProfilePage;