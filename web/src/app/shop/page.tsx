"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BottomNavigationBar from "@/components/BottomNavigationBar";
import { FaCoins, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { ChevronLeft } from "lucide-react";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  increment,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { app } from "@/lib/firebase";

interface ShopItem {
  id: string;
  label: string;
  price: number;
  type: string;
  image?: string;
  smallImage?: boolean;
}

export default function Shop() {
  const router = useRouter();
  const [openPremium, setOpenPremium] = useState(true);
  const [openCourses, setOpenCourses] = useState(true);
  const [openEducations, setOpenEducations] = useState(true);
  const [coins, setCoins] = useState<number>(0);
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);

  const auth = getAuth();
  const db = getFirestore(app);

  useEffect(() => {
    const fetchCoinsAndPurchases = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const coinRef = doc(db, "coins", user.uid);
      const coinSnap = await getDoc(coinRef);
      if (coinSnap.exists()) {
        setCoins(coinSnap.data().coins || 0);
      }

      const q = query(collection(db, "purchases"), where("user", "==", user.uid));
      const snapshot = await getDocs(q);
      const bought = snapshot.docs.map((doc) => doc.data().id);
      setPurchasedIds(bought);
    };

    fetchCoinsAndPurchases();
  }, []);

  const handleBuy = async (item: ShopItem) => {
    const user = auth.currentUser;
    if (!user) return;

    const coinRef = doc(db, "coins", user.uid);
    const coinSnap = await getDoc(coinRef);
    const currentCoins = coinSnap.exists() ? coinSnap.data().coins : 0;

    if (currentCoins < item.price) {
      alert("Not enough coins!");
      return;
    }

    await updateDoc(coinRef, {
      coins: increment(-item.price),
    });

    await setDoc(doc(db, "purchases", `${user.uid}_${item.id}`), {
      user: user.uid,
      id: item.id,
      name: item.label,
      type: item.type,
      coins: item.price,
      image: item.image || null,
      timestamp: Date.now(),
    });

    setCoins((prev) => prev - item.price);
    setPurchasedIds((prev) => [...prev, item.id]);
    alert(`You bought ${item.label} for ${item.price} coins!`);
  };

  const renderCards = (items: ShopItem[]) => (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {items.filter((item) => !purchasedIds.includes(item.id)).map((item) => (
        <div
          key={item.id}
          className="relative group bg-pink-100 rounded-xl shadow-md overflow-hidden transition duration-300">
          <div className="w-full h-24 bg-purple-100 flex items-center justify-center text-xs">
            {item.image ? (
              <img
                src={item.image}
                alt={item.label}
                className={`w-full h-full object-cover rounded-lg ${item.smallImage ? 'max-w-[60%] max-h-[60%]' : ''}`}
              />
            ) : (
              <span className="text-purple-400 font-semibold">{item.label}</span>
            )}
          </div>

          <div className="p-2 text-center">
            <h3 className="text-sm font-semibold text-pink-600">{item.label}</h3>
            <div className="flex items-center justify-center gap-1 mt-1 text-purple-600 text-xs font-medium">
              <FaCoins className="text-yellow-400 text-sm" />
              <span>{item.price} coins</span>
            </div>
          </div>

          <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 flex items-center justify-center transition-opacity">
            <button
              className="bg-green-500 text-white px-3 py-1 text-xs rounded-full font-medium shadow hover:bg-green-600 transition"
              onClick={() => handleBuy(item)}
            >
              Buy
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const premiumItems: ShopItem[] = [
    { id: "p1", label: "BLUSH", price: 10, type: "premium", image: "/images/blushPremium.png" },
    { id: "p2", label: "CLOUD", price: 20, type: "premium", image: "/images/cloudPremium.png" },
    { id: "p3", label: "DEVIL", price: 30, type: "premium", image: "/images/devilPremium.png", smallImage: true },
    { id: "p4", label: "ANGEL", price: 40, type: "premium", image: "/images/angelPremium.png" },
    { id: "p5", label: "ANGRY", price: 40, type: "premium", image: "/images/angryPremium.png" },
  ];

  const courseItems: ShopItem[] = [
    { id: "c1", label: "Course 1", price: 50, type: "course" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white relative">
      {/* Dugme za nazad u gornjem levom uglu */}
      <button
        className="absolute top-4 left-4 z-10 text-white"
        onClick={() => router.back()}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <header className="w-full py-5 bg-lime-200 text-white flex justify-center items-center rounded-b-3xl shadow-md">
        <h1 className="text-xl font-bold tracking-wide">Shop</h1>
      </header>

      <main className="flex-grow px-4 pt-4 pb-6">
        <div className="flex items-center justify-between cursor-pointer mb-2" onClick={() => setOpenPremium(!openPremium)}>
          <h2 className="text-lg font-semibold text-pink-500">Premium Items</h2>
          {openPremium ? <FaChevronUp className="text-pink-500" /> : <FaChevronDown className="text-pink-500" />}
        </div>
        {openPremium && renderCards(premiumItems)}

        <div className="flex items-center justify-between cursor-pointer mb-2" onClick={() => setOpenCourses(!openCourses)}>
          <h2 className="text-lg font-semibold text-purple-500">Courses</h2>
          {openCourses ? <FaChevronUp className="text-purple-500" /> : <FaChevronDown className="text-purple-500" />}
        </div>
        {openCourses && renderCards(courseItems)}
      </main>

      <BottomNavigationBar />
    </div>
  );
}