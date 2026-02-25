import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { auth, db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import emailjs from '@emailjs/browser';
import BottomNavigationBar from "@/components/BottomNavigationBar";

export default function MarijaContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    to_name: 'Dr. Marija Rašić',
  });

  useEffect(() => {
    emailjs.init('IcNINKvWKKHK3I6Qg');

    const fetchUser = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
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

  const handleSubmit = () => {
    if (!formData.message) {
      Alert.alert('Please enter a message.');
      return;
    }

    emailjs
      .send('service_h2gkpos', 'template_i2x4duo', {
        from_name: formData.name,
        from_email: formData.email,
        to_name: formData.to_name,
        message: formData.message,
        to_email: 'dantvi.apps@gmail.com',
      })
      .then(() => {
        Alert.alert('Message sent successfully!');
        setFormData((prev) => ({ ...prev, message: '' }));
      })
      .catch((error) => {
        console.error('Error sending message:', error);
        Alert.alert('Sending failed. Please try again.');
      });
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Dr. Marija Rašić</Text>
        </View>

        <View style={styles.about}>
          <Text style={styles.aboutTitle}>About the therapist</Text>
          <Text style={styles.aboutText}>
            Dr. Marija Rašić is an experienced therapist who has been working with children and adolescents for many years...
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.formTitle}>Contact Form</Text>

          <Text style={styles.label}>To:</Text>
          <TextInput
            value={formData.to_name}
            editable={false}
            style={styles.inputDisabled}
          />

          <Text style={styles.label}>Your Name:</Text>
          <TextInput
            value={formData.name}
            editable={false}
            style={styles.inputDisabled}
          />

          <Text style={styles.label}>Your Email:</Text>
          <TextInput
            value={formData.email}
            editable={false}
            style={styles.inputDisabled}
          />

          <Text style={styles.label}>Message:</Text>
          <TextInput
            value={formData.message}
            onChangeText={(text) => setFormData((prev) => ({ ...prev, message: text }))}
            multiline
            numberOfLines={4}
            style={styles.textarea}
            placeholder="Write your message here..."
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Send Message</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNavigationBar />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fffef9',
    padding: 20,
    paddingBottom: 100, // ← dodat prostor za navigaciju
  },
  header: {
    backgroundColor: '#e5f8c5',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 1,
  },
  about: {
    marginBottom: 24,
    alignItems: 'center',
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f78da7',
    marginBottom: 8,
  },
  aboutText: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  form: {
    backgroundColor: '#e8d6f8',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#c772e1',
    textAlign: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
    marginBottom: 4,
  },
  inputDisabled: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 9999,
    color: '#6B7280',
    marginBottom: 12,
  },
  textarea: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 16,
    color: '#111827',
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#fbd4df',
  },
  button: {
    backgroundColor: '#e5f8c5',
    paddingVertical: 12,
    borderRadius: 9999,
    alignItems: 'center',
  },
  buttonText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 16,
  },
});