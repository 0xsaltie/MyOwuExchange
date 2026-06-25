import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../services/firebase";
import { useAuth } from "../context/AuthContext";

export default function Notifications() {
  const { user } = useAuth();

  const [notifications, setNotifications] =
    useState([]);

  const [loading, setLoading] = useState(true);

  const unreadCount = notifications.filter(
  (item) => !item.isRead
).length;

 useEffect(() => {
  if (!user) return;

  const q = query(
    collection(db, "notifications"),
    where("userId", "==", user.uid),
    orderBy("createdAt", "desc")
  );

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setNotifications(data);
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
        Loading Notifications...
      </div>
    );
  }

  const markAsRead = async (id) => {
  try {
    await updateDoc(
      doc(db, "notifications", id),
      {
        isRead: true,
      }
    );
  } catch (error) {
    console.error(error);
  }
};

return (
  <div className="min-h-screen bg-stone-100 p-6">
    <div className="max-w-4xl mx-auto">

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            Notifications
          </h1>

          <p className="text-gray-600">
            Ìkìlọ̀ àti Ìfẹ̀hónúhàn
          </p>
        </div>

        {unreadCount > 0 && (
          <div className="bg-red-600 text-white px-4 py-2 rounded-full">
            {unreadCount} New
          </div>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          No notifications yet.
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() =>
                markAsRead(notification.id)
              }
              className={`p-6 rounded-2xl shadow-sm cursor-pointer transition ${
                notification.isRead
                  ? "bg-white"
                  : "bg-amber-50 border border-amber-300"
              }`}
            >
              <div className="flex items-center justify-between">

                <h3 className="font-bold">
                  {notification.title}
                </h3>

                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    notification.isRead
                      ? "bg-gray-100 text-gray-600"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {notification.isRead
                    ? "Read"
                    : "New"}
                </span>

              </div>

              <p className="text-gray-600 mt-2">
                {notification.message}
              </p>
            </div>
          ))}
        </div>
      )}

    </div>
  </div>
);
}