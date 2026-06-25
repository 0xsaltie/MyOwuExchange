import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";

import { useParams } from "react-router-dom";
import { db } from "../services/firebase";
import { useAuth } from "../context/AuthContext";

export default function ChatRoom() {
  const { id } = useParams();
  const { user } = useAuth();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "chats", id, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMessages(data);
        setLoading(false);
      },
      (error) => {
        console.error(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [id]);

  const handleSend = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    try {
      const messageText = message;

      await addDoc(
        collection(db, "chats", id, "messages"),
        {
          text: messageText,
          senderId: user.uid,
          senderEmail: user.email,
          createdAt: serverTimestamp(),
        }
      );

      await updateDoc(
        doc(db, "chats", id),
        {
          lastMessage: messageText,
          updatedAt: serverTimestamp(),
        }
      );

      setMessage("");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Chat...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b p-4 shadow-sm">
        <h1 className="text-xl font-bold">
          OwuExchange Chat
        </h1>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-3">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              Start the conversation 👋
            </div>
          ) : (
            messages.map((msg) => {
              const mine = msg.senderId === user.uid;

              return (
                <div
                  key={msg.id}
                  className={`flex ${
                    mine
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl ${
                      mine
                        ? "bg-amber-700 text-white"
                        : "bg-white"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="bg-white border-t p-4"
      >
        <div className="max-w-4xl mx-auto flex gap-3">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            className="flex-1 border rounded-lg px-4 py-3"
          />

          <button
            type="submit"
            className="bg-amber-700 text-white px-6 rounded-lg"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}