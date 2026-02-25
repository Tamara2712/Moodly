import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { storage } from '../../firebase';
import BottomNavigationBar from "@/components/BottomNavigationBar";

export default function EditProfilePage() {
  const router = useRouter();

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    photoURL: '',
  });

  const [inputData, setInputData] = useState(userData);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const auth = getAuth();
      const db = getFirestore();
      const user = auth.currentUser;

      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const fullData = {
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            email: data.email || '',
            photoURL: data.photoURL || '',
          };
          setUserData(fullData);
          setInputData(fullData);
          setPreviewImage(fullData.photoURL || null);
        }
      }
    };

    fetchData();
  }, []);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
      base64: false,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setPreviewImage(uri);

      const response = await fetch(uri);
      const blob = await response.blob();
      setImageBlob(blob);
    }
  };

  const handleChange = (field: keyof typeof inputData, value: string) => {
    setInputData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    const auth = getAuth();
    const db = getFirestore();
    const user = auth.currentUser;

    if (user) {
      const docRef = doc(db, 'users', user.uid);

      try {
        let updatedPhotoURL = inputData.photoURL;

        if (imageBlob) {
          const storageRef = ref(storage, `profilePictures/${user.uid}`);
          await uploadBytes(storageRef, imageBlob);
          updatedPhotoURL = await getDownloadURL(storageRef);
        }

        await updateDoc(docRef, {
          firstName: inputData.firstName,
          lastName: inputData.lastName,
          email: inputData.email,
          photoURL: updatedPhotoURL,
        });

        router.push('/profile/page');
      } catch (error) {
        console.error('Update failed:', error);
      }
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backBtn}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>Edit Profile</Text>
        </View>

        {/* Form */}
        <View style={styles.formBox}>
          <TouchableOpacity style={styles.imageBox} onPress={handleImagePick}>
            {previewImage ? (
              <Image source={{ uri: previewImage }} style={styles.image} />
            ) : (
              <Text style={styles.noImageText}>No Image</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={inputData.firstName}
            onChangeText={text => handleChange('firstName', text)}
          />

          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={inputData.lastName}
            onChangeText={text => handleChange('lastName', text)}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={inputData.email}
            onChangeText={text => handleChange('email', text)}
          />

          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveBtnText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNavigationBar /> {/* 👈 Navigacija */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D9F99D',
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  backBtn: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 12,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
  },
  formBox: {
    backgroundColor: '#F3E8FF',
    padding: 20,
    borderRadius: 24,
    marginTop: 24,
    width: '90%',
  },
  imageBox: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#D8B4FE',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    overflow: 'hidden',
  },
  image: {
    width: 130,
    height: 130,
    resizeMode: 'cover',
  },
  noImageText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 12,
    color: '#6B21A8',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  saveBtn: {
    marginTop: 24,
    backgroundColor: '#D9F99D',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});