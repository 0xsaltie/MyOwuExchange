import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

import { Link } from "react-router-dom";
import { db } from "../services/firebase";
import { useAuth } from "../context/AuthContext";

export default function Chats() {
  const { user } = useAuth();

  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "chats"),
      where("participants", "array-contains", user.uid),
      orderBy("updatedAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setChats(data);
        setLoading(false);
      },
      (error) => {
        console.error(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Chats...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 p-6">
      <div className="max-w-5xl mx-auto">

        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Messages
          </h1>

          <p className="text-gray-600">
            Ìjíròrò àwọn aláso-òkè
          </p>
        </div>

        {chats.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            No conversations yet.
          </div>
        ) : (
          <div className="space-y-4">
            {chats.map((chat) => {
              const otherUserId =
                chat.participants.find(
                  (id) => id !== user.uid
                );

              const otherUserName =
                chat.participantNames?.[
                  otherUserId
                ] || "Weaver";

              return (
                <Link
                  key={chat.id}
                  to={`/chat/${chat.id}`}
                  className="block bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">
                      {otherUserName}
                    </h3>

                    <span className="text-sm text-gray-500">
                      💬
                    </span>
                  </div>

                  <p className="text-gray-600 mt-2">
                    {chat.lastMessage ||
                      "Start chatting"}
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}