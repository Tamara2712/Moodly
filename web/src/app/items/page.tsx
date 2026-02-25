"use client";

import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { app } from "@/lib/firebase";
import BottomNavigationBar from "@/components/BottomNavigationBar";

interface PurchasedItem {
  id: string;
  name: string;
  type: string;
  coins: number;
  image?: string;
}

export default function MyItemsPage() {
  const [items, setItems] = useState<PurchasedItem[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      const auth = getAuth(app);
      const user = auth.currentUser;
      if (!user) return;

      const db = getFirestore(app);

      // Fetch user's purchased items
      const q = query(collection(db, "purchases"), where("user", "==", user.uid));
      const snapshot = await getDocs(q);

      const loaded: PurchasedItem[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        loaded.push({
          id: data.id,
          name: data.id === "p1" ? "BLUSH" : data.name,
          type: data.type,
          coins: data.coins,
          image: data.image || (data.id === "p1" ? "/images/blushPremium.png" : null),
        });
      });
      setItems(loaded);

      // Fetch selected item
      const selectedSnap = await getDoc(doc(db, "selected", user.uid));
      if (selectedSnap.exists()) {
        const selectedData = selectedSnap.data();
        setSelected(selectedData.itemId);
      }
    };

    fetchItems();
  }, []);

  const handleSelect = async (itemId: string) => {
    const auth = getAuth(app);
    const user = auth.currentUser;
    if (!user) return;

    const db = getFirestore(app);
    await setDoc(doc(db, "selected", user.uid), {
      itemId,
    });

    setSelected(itemId);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-4 pt-6 pb-20">
      <h1 className="text-xl font-bold text-center mb-6 text-purple-500">My Items</h1>

      {items.length === 0 ? (
        <p className="text-center text-gray-500">You haven't purchased anything yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className={`relative bg-pink-100 rounded-xl shadow p-3 flex flex-col items-center text-center transition duration-300 ${
                selected === item.id && item.type === "premium" ? "border-4 border-green-500" : ""
              }`}
            >
              <div className="w-full h-24 bg-purple-100 mb-2 flex items-center justify-center text-xs">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-purple-400">{item.name}</span>
                )}
              </div>
              <h3 className="font-semibold text-sm text-pink-600">{item.name}</h3>
              <p className="text-xs text-purple-600">{item.coins} coins</p>
              <p className="text-xs text-gray-500 mb-2">{item.type}</p>

              <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl">
                {item.type === "premium" ? (
                  <button
                    className="bg-green-500 text-white px-3 py-1 text-xs rounded-full font-medium hover:bg-green-600"
                    onClick={() => handleSelect(item.id)}
                  >
                    Select
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 text-white px-3 py-1 text-xs rounded-full font-medium hover:bg-blue-600"
                    onClick={() => alert(`Go to content for ${item.name}`)}
                  >
                    Go to
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <BottomNavigationBar />
    </div>
  );
}