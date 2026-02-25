import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { auth, db } from '../../firebase';
import { getDocs, collection, doc, getDoc, setDoc, increment } from 'firebase/firestore';
import BottomNavigationBar from "@/components/BottomNavigationBar";

interface Question {
  question: string;
  correctAnswer: string;
  wrongAnswer: string[];
}

export default function QuizPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alreadyCompleted, setAlreadyCompleted] = useState(false);

  useEffect(() => {
    const init = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const currentQuizSnap = await getDoc(doc(db, 'settings', 'currentQuiz'));
      if (!currentQuizSnap.exists()) return;

      const selectedQuizId = currentQuizSnap.data().id;
      const resultDocId = `${user.uid}_${selectedQuizId}`;
      const resultSnap = await getDoc(doc(db, 'quizResults', resultDocId));

      if (resultSnap.exists()) {
        setFinished(true);
        setAlreadyCompleted(true);
        setScore(resultSnap.data().score);
        setLoading(false);
        return;
      }

      const questionSnap = await getDocs(collection(db, `quizzes/${selectedQuizId}/questions`));
      const loaded: Question[] = [];
      questionSnap.forEach((doc) => {
        const data = doc.data();
        loaded.push({
          question: data.question,
          correctAnswer: data.correctAnswer,
          wrongAnswer: data.wrongAnswer || [],
        });
      });

      setQuestions(loaded);
      setLoading(false);
    };

    init();
  }, []);

  const handleNext = () => {
    if (!selected) return;
    const current = questions[currentIndex];
    if (selected === current.correctAnswer) {
      setScore((prev) => prev + 1);
    }

    setSelected(null);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setFinished(true);
      saveScore();
    }
  };

  const saveScore = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const currentQuizSnap = await getDoc(doc(db, 'settings', 'currentQuiz'));
    if (!currentQuizSnap.exists()) return;

    const selectedQuizId = currentQuizSnap.data().id;
    const resultDocId = `${user.uid}_${selectedQuizId}`;

    await setDoc(doc(db, 'quizResults', resultDocId), {
      user: user.uid,
      quizId: selectedQuizId,
      score: score,
    });

    const coinRef = doc(db, 'coins', user.uid);
    await setDoc(
      coinRef,
      {
        user: user.uid,
        coins: increment(score),
      },
      { merge: true }
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#8B5CF6" />
        <Text style={{ marginTop: 12 }}>Loading quiz...</Text>
        <BottomNavigationBar /> {/* ✅ Navigacija i u loading view-u */}
      </View>
    );
  }

  if (finished) {
    return (
      <View style={styles.container}>
        <Text style={styles.resultText}>
          {alreadyCompleted
            ? `You already completed this quiz. Your score was: ${score}`
            : `Quiz finished! Your score: ${score}/${questions.length}`}
        </Text>
        <BottomNavigationBar /> {/* ✅ Navigacija i u result view-u */}
      </View>
    );
  }

  const currentQuestion = questions[currentIndex];
  const allAnswers = [...currentQuestion.wrongAnswer, currentQuestion.correctAnswer].sort();

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>QUIZ TIME</Text>
        <View style={styles.quizBox}>
          <Text style={styles.question}>{currentQuestion.question}</Text>

          {allAnswers.map((answer, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.answerButton,
                selected === answer && styles.answerSelected,
              ]}
              onPress={() => setSelected(answer)}
            >
              <Text style={styles.answerText}>
                {String.fromCharCode(65 + i)}. {answer}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentIndex + 1 === questions.length ? 'Finish' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomNavigationBar /> {/* ✅ Navigacija dodata ispod ScrollView-a */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F3E8FF',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: '#10B981',
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 20,
  },
  quizBox: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    borderWidth: 4,
    borderColor: '#D1FAE5',
  },
  question: {
    fontSize: 16,
    backgroundColor: '#D1FAE5',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    textAlign: 'center',
    color: '#111',
  },
  answerButton: {
    backgroundColor: '#D9F99D',
    padding: 14,
    borderRadius: 24,
    marginBottom: 12,
  },
  answerSelected: {
    backgroundColor: '#BBF7D0',
  },
  answerText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111',
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: '#A78BFA',
    paddingVertical: 14,
    borderRadius: 24,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  resultText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#10B981',
    fontWeight: 'bold',
  },
});