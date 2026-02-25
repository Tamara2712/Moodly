"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { User, Home, MoreHorizontal } from 'lucide-react';
import { auth } from "@/lib/firebase";
import { useRouter } from 'next/navigation';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const BottomNavigationBar = () => {
  const [userGender, setUserGender] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/signin");
        return;
      }

      const db = getFirestore();
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        setUserGender(userData.gender);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading || !userGender) return null;

  const homeHref =
    userGender === "female" ? "/home/female" :
    userGender === "male" ? "/home/male" : "/";

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-border py-3 px-8 flex items-center justify-between">
      <Link href="/profile">
        <User className="w-6 h-6 text-[#502B06]" />
      </Link>
      <Link href={homeHref}>
        <Home className="w-6 h-6 text-[#502B06]" />
      </Link>
      <Link href="/settings">
        <MoreHorizontal className="w-6 h-6 text-[#502B06]" />
      </Link>
    </footer>
  );
};

export default BottomNavigationBar;