"use client";

import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app, storage } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import BottomNavigationBar from "@/components/BottomNavigationBar";

const EditProfilePage: React.FC = () => {
  const router = useRouter();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    photoURL: "",
  });

  const [inputData, setInputData] = useState(userData);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const auth = getAuth(app);
      const db = getFirestore(app);
      const user = auth.currentUser;

      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const fullData = {
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            email: data.email || "",
            photoURL: data.photoURL || "",
          };
          setUserData(fullData);
          setInputData(fullData);
          setPreviewImage(fullData.photoURL || null);
        }
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    const auth = getAuth(app);
    const db = getFirestore(app);
    const user = auth.currentUser;

    if (user) {
      const docRef = doc(db, "users", user.uid);

      try {
        if (selectedFile) {
          const storageRef = ref(storage, `profilePictures/${user.uid}`);
          await uploadBytes(storageRef, selectedFile);
          const downloadURL = await getDownloadURL(storageRef);
          inputData.photoURL = downloadURL;
        }

        await updateDoc(docRef, {
          firstName: inputData.firstName,
          lastName: inputData.lastName,
          email: inputData.email,
          photoURL: inputData.photoURL,
        });

        router.push("/profile");
      } catch (error) {
        console.error("Update failed:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="w-full bg-[#DEF5BA] py-4 px-6 flex items-center">
        <h1 className="text-white text-2xl font-semibold tracking-widest">
          Edit Profile
        </h1>
      </div>

      {/* Form content */}
      <div className="flex-grow flex flex-col items-center px-6 py-8 pb-24">
        <div className="bg-purple-100 rounded-3xl p-6 w-full max-w-md text-center shadow-md">
          {/* Profile Image */}
          <div className="w-32 h-32 mx-auto rounded-full bg-purple-300 mb-4 overflow-hidden shadow-lg flex items-center justify-center">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white font-semibold text-sm">No Image</span>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-4"
          />

          <div className="mb-4 text-left">
            <label className="block text-purple-800 font-semibold mb-1">
              First Name:
            </label>
            <input
              type="text"
              name="firstName"
              value={inputData.firstName}
              onChange={handleChange}
              className="w-full border border-purple-200 px-3 py-2 rounded"
            />
          </div>

          <div className="mb-4 text-left">
            <label className="block text-purple-800 font-semibold mb-1">
              Last Name:
            </label>
            <input
              type="text"
              name="lastName"
              value={inputData.lastName}
              onChange={handleChange}
              className="w-full border border-purple-200 px-3 py-2 rounded"
            />
          </div>

          <div className="mb-6 text-left">
            <label className="block text-purple-800 font-semibold mb-1">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={inputData.email}
              onChange={handleChange}
              className="w-full border border-purple-200 px-3 py-2 rounded"
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-[#DEF5BA] hover:bg-[#DEF5BA] text-white font-bold py-2 px-4 rounded"
          >
            Save Changes
          </button>
        </div>
      </div>

      <BottomNavigationBar />
    </div>
  );
};

export default EditProfilePage;