import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../../assets/images/logo-512x512.png')} style={styles.logo} />

      {/* Text */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Welcome to Moodly</Text>
        <Text style={styles.subtitle}>Your personal emotional diary</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => router.push('/register/page')}
        >
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => router.push('/signin/page')}
        >
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DEF5BA',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 128,
    height: 128,
    marginBottom: 24,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
    gap: 12,
  },
  registerButton: {
    backgroundColor: '#E9D5FF',
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  registerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  signInButton: {
    backgroundColor: 'white',
    borderColor: '#E9D5FF',
    borderWidth: 2,
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  signInText: {
    color: '#E9D5FF',
    fontSize: 16,
    fontWeight: '600',
  },
});