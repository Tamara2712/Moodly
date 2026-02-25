"use client";

import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  increment,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "@/lib/firebase";
import BottomNavigationBar from "@/components/BottomNavigationBar"; // ← dodato

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

  const db = getFirestore(app);
  const auth = getAuth();

  useEffect(() => {
    const init = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const currentQuizSnap = await getDoc(doc(db, "settings", "currentQuiz"));
      if (!currentQuizSnap.exists()) return;

      const selectedQuizId = currentQuizSnap.data().id;
      const resultDocId = `${user.uid}_${selectedQuizId}`;
      const resultSnap = await getDoc(doc(db, "quizResults", resultDocId));

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
      setCurrentIndex(currentIndex + 1);
    } else {
      setFinished(true);
      saveScore();
    }
  };

  const saveScore = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const currentQuizSnap = await getDoc(doc(db, "settings", "currentQuiz"));
    if (!currentQuizSnap.exists()) return;

    const selectedQuizId = currentQuizSnap.data().id;
    const resultDocId = `${user.uid}_${selectedQuizId}`;

    await setDoc(doc(db, "quizResults", resultDocId), {
      user: user.uid,
      quizId: selectedQuizId,
      score: score,
    });

    const coinRef = doc(db, "coins", user.uid);
    await setDoc(
      coinRef,
      {
        user: user.uid,
        coins: increment(score),
      },
      { merge: true }
    );
  };

  return (
    <div className="min-h-screen bg-purple-100 flex flex-col justify-between">
      <div className="flex-grow flex flex-col items-center p-6">
        {loading ? (
          <div className="text-center mt-20 text-lg">Loading quiz...</div>
        ) : finished ? (
          <div className="text-center mt-20 text-xl font-semibold text-green-600">
            {alreadyCompleted ? (
              <>You already completed this quiz. Your score was: {score}</>
            ) : (
              <>Quiz finished! Your score: {score}/{questions.length}</>
            )}
          </div>
        ) : (
          <>
            <h1 className="text-4xl font-extrabold text-green-600 mb-6 tracking-wide">QUIZ TIME</h1>

            <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-lg border-4 border-green-100 relative">
              <h2 className="text-lg font-medium bg-green-100 p-4 rounded-xl text-center mb-6 text-black shadow-inner">
                {questions[currentIndex].question}
              </h2>

              <form className="space-y-4">
                {[...questions[currentIndex].wrongAnswer, questions[currentIndex].correctAnswer]
                  .sort()
                  .map((answer, i) => (
                    <label
                      key={i}
                      className={`block rounded-full px-6 py-3 cursor-pointer text-left text-black text-md font-medium 
                        ${selected === answer ? "bg-green-200" : "bg-green-100"} 
                        hover:bg-green-200 transition duration-200`}
                    >
                      <input
                        type="radio"
                        name="answer"
                        value={answer}
                        checked={selected === answer}
                        onChange={() => setSelected(answer)}
                        className="hidden"
                      />
                      <span className="inline-block w-6 h-6 text-center rounded-full bg-purple-200 mr-3 font-bold text-black">
                        {String.fromCharCode(65 + i)}
                      </span>
                      {answer}
                    </label>
                  ))}
              </form>

              <button
                onClick={handleNext}
                className="mt-6 w-full bg-purple-400 hover:bg-purple-500 text-white font-bold py-3 px-4 rounded-full"
              >
                {currentIndex + 1 === questions.length ? "Finish" : "Next"}
              </button>
            </div>
          </>
        )}
      </div>

      <BottomNavigationBar />
    </div>
  );
}