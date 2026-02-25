import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import { auth, db } from '../../firebase';

export default function RegisterScreen() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    age: '',
    gender: '',
  });

  const handleChange = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleRegister = async () => {
    const { firstName, lastName, email, password, age, gender } = form;

    if (!firstName || !lastName || !email || !password || !age || !gender) {
      Alert.alert('Missing fields', 'Please fill in all fields.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password.trim());
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        firstName,
        lastName,
        email,
        age: Number(age),
        gender,
      });

      Alert.alert('Success', 'Registration successful!');
      router.push('/signin/page');
    } catch (error: any) {
      console.error('Registration error:', error);
      Alert.alert('Registration failed', error.message || 'An error occurred.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Text style={styles.subtitle}>Enter your information to create an account.</Text>

      <TextInput
        placeholder="First Name"
        style={styles.input}
        value={form.firstName}
        onChangeText={text => handleChange('firstName', text)}
      />
      <TextInput
        placeholder="Last Name"
        style={styles.input}
        value={form.lastName}
        onChangeText={text => handleChange('lastName', text)}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        value={form.email}
        onChangeText={text => handleChange('email', text)}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={form.password}
        onChangeText={text => handleChange('password', text)}
      />
      <TextInput
        placeholder="Age"
        style={styles.input}
        keyboardType="numeric"
        value={form.age}
        onChangeText={text => handleChange('age', text)}
      />

      <View style={styles.genderContainer}>
        <Text style={styles.genderLabel}>Gender:</Text>
        <TouchableOpacity
          style={[styles.genderButton, form.gender === 'male' && styles.genderButtonSelected]}
          onPress={() => handleChange('gender', 'male')}
        >
          <Text style={form.gender === 'male' ? styles.genderTextSelected : styles.genderText}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderButton, form.gender === 'female' && styles.genderButtonSelected]}
          onPress={() => handleChange('gender', 'female')}
        >
          <Text style={form.gender === 'female' ? styles.genderTextSelected : styles.genderText}>Female</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
        <Text style={styles.registerBtnText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DEF5BA',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  genderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    flexWrap: 'wrap',
    gap: 8,
  },
  genderLabel: {
    marginRight: 8,
    fontWeight: '500',
  },
  genderButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E9D5FF',
    marginRight: 8,
  },
  genderButtonSelected: {
    backgroundColor: '#E9D5FF',
  },
  genderText: {
    color: '#E9D5FF',
  },
  genderTextSelected: {
    color: '#fff',
  },
  registerBtn: {
    backgroundColor: '#E9D5FF',
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  registerBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
