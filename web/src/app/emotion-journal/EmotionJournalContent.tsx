'use client';

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, addDoc, collection, Timestamp } from "firebase/firestore";
import { auth } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BottomNavigationBar from "@/components/BottomNavigationBar";

type Message = {
  type: "bot" | "user";
  text: string;
};

export default function EmotionJournalPage() {
  const searchParams = useSearchParams();
  const [emotion, setEmotion] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<string[]>([]);
  const [responses, setResponses] = useState<string[]>([]);

  useEffect(() => {
    const emotionParam = searchParams.get("emotion");
    if (emotionParam) {
      setEmotion(emotionParam);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchQuestionsAndResponses = async () => {
      if (!emotion) {
        setMessages([{ type: "bot", text: "No emotion selected." }]);
        return;
      }

      try {
        const db = getFirestore();
        const docRef = doc(db, "emotions", emotion);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const loadedQuestions: string[] = data?.questions || [];
          const loadedResponses: string[] = data?.responses || [];

          if (loadedQuestions.length > 0) {
            setQuestions(loadedQuestions);
            setMessages([{ type: "bot", text: loadedQuestions[0] }]);
          } else {
            setMessages([{ type: "bot", text: "Sorry, we couldn't find any questions for this emotion." }]);
          }

          if (loadedResponses.length > 0) {
            setResponses(loadedResponses);
          }
        } else {
          setMessages([{ type: "bot", text: "Emotion not found in the database." }]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessages([{ type: "bot", text: "Error loading data. Please try again later." }]);
      }
    };

    if (emotion) {
      fetchQuestionsAndResponses();
    }
  }, [emotion]);

  const handleSubmit = async () => {
    if (!input.trim() || !emotion) return;

    try {
      const user = auth.currentUser;
      if (!user) return;

      const db = getFirestore();
      await addDoc(collection(db, "journal"), {
        user: user.uid,
        emotion,
        message: input.trim(),
        createdAt: Timestamp.now(),
      });

      const newMessages: Message[] = [
        ...messages,
        { type: "user", text: input.trim() },
      ];

      let nextQuestionIndex = questionIndex + 1;
      let botResponse = "";

      if (nextQuestionIndex < questions.length) {
        botResponse = questions[nextQuestionIndex];
      } else {
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        botResponse = randomResponse || "Hvala na odgovoru!";
        nextQuestionIndex = 0;
      }

      newMessages.push({ type: "bot", text: botResponse });
      setQuestionIndex(nextQuestionIndex);
      setMessages(newMessages);
      setInput("");
    } catch (error) {
      console.error("Error saving journal entry:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <h1 className="text-xl font-semibold text-center mt-6 mb-4">
        How are you feeling: <span className="text-pink-500">{emotion}</span>
      </h1>

      <div className="flex flex-col gap-3 px-4 mb-20">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg max-w-[75%] ${
              m.type === "bot"
                ? "bg-lime-100 self-start text-black"
                : "bg-blue-100 self-end text-black"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className="fixed bottom-14 w-full px-4 flex gap-2">
        <Input
          placeholder="Your answer..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={handleSubmit}>Send</Button>
      </div>

      <BottomNavigationBar />
    </div>
  );
}