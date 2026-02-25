"use client";

import React, { useEffect, useState } from 'react';
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "@/lib/firebase";
import emailjs from "emailjs-com";
import BottomNavigationBar from '@/components/BottomNavigationBar';
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

const DrMarijaRasicContact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    to_name: 'Dr. Marija Rašić',
  });

  useEffect(() => {
    emailjs.init("IcNINKvWKKHK3I6Qg");
    const fetchUser = async () => {
      const auth = getAuth(app);
      const db = getFirestore(app);
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setFormData((prev) => ({
            ...prev,
            name: userData.firstName || '',
            email: userData.email || '',
          }));
        }
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .send("service_h2gkpos", "template_i2x4duo", {
        from_name: formData.name,
        from_email: formData.email,
        to_name: formData.to_name,
        message: formData.message,
        to_email: "dantvi.apps@gmail.com",
      })
      .then(() => {
        alert("Message sent successfully!");
        setFormData((prev) => ({ ...prev, message: '' }));
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        alert("Sending failed. Please try again.");
      });
  };

  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#fffef9] flex flex-col px-4 pt-4 pb-8 relative">
      {/* Dugme za nazad u gornjem levom uglu */}
      <button
        className="absolute top-4 left-4 text-black z-10"
        onClick={() => router.back()}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Naslov */}
      <div className="bg-[#e5f8c5] rounded-full mx-auto mt-10 mb-8 px-10 py-4 text-center shadow">
        <h1 className="text-3xl font-bold text-white tracking-wide">Dr. Marija Rašić</h1>
      </div>

      {/* About section */}
      <section className="mb-8 max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-semibold text-[#f78da7] mb-4">About the therapist</h2>
        <p className="text-gray-700 leading-relaxed">
          Dr. Marija Rašić is an experienced therapist who has been working with children and adolescents for many years...
        </p>
      </section>

      {/* Form */}
      <section className="max-w-lg mx-auto bg-[#e8d6f8] rounded-3xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-[#c772e1] mb-6 text-center">Contact Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="to_name" className="block text-sm font-semibold text-gray-600 mb-1">
              To:
            </label>
            <input
              type="text"
              id="to_name"
              name="to_name"
              value={formData.to_name}
              readOnly
              className="bg-gray-100 border rounded-full w-full py-2 px-4 text-gray-700"
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-600 mb-1">
              Your Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              readOnly
              className="bg-gray-100 border rounded-full w-full py-2 px-4 text-gray-700"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-600 mb-1">
              Your Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              readOnly
              className="bg-gray-100 border rounded-full w-full py-2 px-4 text-gray-700"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-600 mb-1">
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              required
              className="w-full border rounded-2xl py-2 px-4 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#fbd4df]"
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#e5f8c5] hover:bg-[#d1eeb2] text-[#333] font-bold py-2 px-6 rounded-full transition shadow"
            >
              Send Message
            </button>
          </div>
        </form>
      </section>

      <BottomNavigationBar />
    </div>
  );
};

export default DrMarijaRasicContact;