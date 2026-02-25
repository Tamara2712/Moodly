import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getFirestore, doc, getDoc, addDoc, collection, Timestamp } from 'firebase/firestore';
import { auth } from '../../firebase';
import BottomNavigationBar from "../../components/BottomNavigationBar";

type Message = {
  type: 'bot' | 'user';
  text: string;
};

export default function EmotionJournalScreen() {
  const { emotion } = useLocalSearchParams<{ emotion: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<string[]>([]);
  const [responses, setResponses] = useState<string[]>([]);

  useEffect(() => {
    const fetchQuestionsAndResponses = async () => {
      if (!emotion) {
        setMessages([{ type: 'bot', text: 'No emotion selected.' }]);
        return;
      }

      try {
        const db = getFirestore();
        const docRef = doc(db, 'emotions', String(emotion));
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const loadedQuestions: string[] = data?.questions || [];
          const loadedResponses: string[] = data?.responses || [];

          if (loadedQuestions.length > 0) {
            setQuestions(loadedQuestions);
            setMessages([{ type: 'bot', text: loadedQuestions[0] }]);
          } else {
            setMessages([{ type: 'bot', text: 'No questions found.' }]);
          }

          if (loadedResponses.length > 0) {
            setResponses(loadedResponses);
          }
        } else {
          setMessages([{ type: 'bot', text: 'Emotion not found in database.' }]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessages([{ type: 'bot', text: 'Error loading data. Try again later.' }]);
      }
    };

    fetchQuestionsAndResponses();
  }, [emotion]);

  const handleSubmit = async () => {
    if (!input.trim() || !emotion) return;

    try {
      const user = auth.currentUser;
      if (!user) return;

      const db = getFirestore();
      await addDoc(collection(db, 'journal'), {
        user: user.uid,
        emotion,
        message: input.trim(),
        createdAt: Timestamp.now(),
      });

      const newMessages: Message[] = [
        ...messages,
        { type: 'user', text: input.trim() },
      ];

      let nextQuestionIndex = questionIndex + 1;
      let botResponse = '';

      if (nextQuestionIndex < questions.length) {
        botResponse = questions[nextQuestionIndex];
      } else {
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        botResponse = randomResponse || 'Thanks for your answer!';
        nextQuestionIndex = 0;
      }

      newMessages.push({ type: 'bot', text: botResponse });
      setQuestionIndex(nextQuestionIndex);

      setMessages(newMessages);
      setInput('');
    } catch (error) {
      console.error('Error saving journal entry:', error);
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
      >
        <Text style={styles.title}>
          How are you feeling: <Text style={styles.emotion}>{emotion}</Text>
        </Text>

        <ScrollView contentContainerStyle={styles.chatContainer}>
          {messages.map((m, i) => (
            <View
              key={i}
              style={[
                styles.message,
                m.type === 'bot' ? styles.bot : styles.user,
              ]}
            >
              <Text style={styles.messageText}>{m.text}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputRow}>
          <TextInput
            placeholder="Your answer..."
            style={styles.input}
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={handleSubmit}>
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <BottomNavigationBar />
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 24,
    fontWeight: 'bold',
  },
  emotion: {
    color: '#F472B6',
  },
  chatContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  message: {
    maxWidth: '75%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
  },
  bot: {
    backgroundColor: '#D9F99D',
    alignSelf: 'flex-start',
  },
  user: {
    backgroundColor: '#BFDBFE',
    alignSelf: 'flex-end',
  },
  messageText: {
    color: '#111',
  },
  inputRow: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  input: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 8,
  },
  sendBtn: {
    backgroundColor: '#E9D5FF',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    justifyContent: 'center',
  },
  sendText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});