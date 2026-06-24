import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../services/firebase";
import { useAuth } from "../context/AuthContext";

export default function Requests() {
  const { user } = useAuth();

  const [incomingRequests, setIncomingRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // Incoming Requests
        const incomingQuery = query(
          collection(db, "exchangeRequests"),
          where("receiverId", "==", user.uid)
        );

        const incomingSnapshot = await getDocs(incomingQuery);

        const incomingData = incomingSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setIncomingRequests(incomingData);

        // Sent Requests
        const sentQuery = query(
          collection(db, "exchangeRequests"),
          where("senderId", "==", user.uid)
        );

        const sentSnapshot = await getDocs(sentQuery);

        const sentData = sentSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setSentRequests(sentData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchRequests();
    }
  }, [user]);

  const updateStatus = async (requestId, status) => {
    try {
      await updateDoc(
        doc(db, "exchangeRequests", requestId),
        {
          status,
        }
      );

      setIncomingRequests((prev) =>
        prev.map((request) =>
          request.id === requestId
            ? { ...request, status }
            : request
        )
      );
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-700";

      case "declined":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Requests...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 p-6">
      <div className="max-w-6xl mx-auto">

        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            Exchange Requests
          </h1>

          <p className="text-gray-600 mt-2">
            Ìbéèrè Paṣípààrọ̀
          </p>
        </div>

        {/* Incoming Requests */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-5">
            📥 Incoming Requests
          </h2>

          {incomingRequests.length === 0 ? (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              No incoming requests.
            </div>
          ) : (
            <div className="space-y-4">
              {incomingRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-white rounded-xl p-6 shadow-sm"
                >
                  <div className="flex flex-col md:flex-row md:justify-between gap-6">

                    <div>
                      <h3 className="font-semibold text-lg">
                        From: {request.senderEmail}
                      </h3>

                      <div className="mt-3 space-y-1 text-sm">

                        <p>
                          <strong>Thread:</strong>{" "}
                          {request.threadType}
                        </p>

                        <p>
                          <strong>Color:</strong>{" "}
                          {request.color}
                        </p>

                        <p>
                          <strong>Quantity:</strong>{" "}
                          {request.quantity} {request.unit}
                        </p>

                        <p>
                          <strong>Listing Type:</strong>{" "}
                          {request.listingType}
                        </p>

                        {request.desiredThread && (
                          <p>
                            <strong>Needs:</strong>{" "}
                            {request.desiredThread}
                          </p>
                        )}

                        {request.price && (
                          <p>
                            <strong>Price:</strong> ₦
                            {request.price.toLocaleString()}
                          </p>
                        )}
                      </div>

                      <span
                        className={`inline-block mt-4 px-3 py-1 rounded-full text-sm ${getStatusColor(
                          request.status
                        )}`}
                      >
                        {request.status}
                      </span>
                    </div>

                    {request.status === "pending" && (
                      <div className="flex gap-3">
                        <button
                          onClick={() =>
                            updateStatus(
                              request.id,
                              "accepted"
                            )
                          }
                          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
                        >
                          Accept
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(
                              request.id,
                              "declined"
                            )
                          }
                          className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
                        >
                          Decline
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Sent Requests */}
        <section>
          <h2 className="text-2xl font-bold mb-5">
            📤 Sent Requests
          </h2>

          {sentRequests.length === 0 ? (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              No sent requests.
            </div>
          ) : (
            <div className="space-y-4">
              {sentRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-white rounded-xl p-6 shadow-sm"
                >
                  <h3 className="font-semibold text-lg">
                    To Listing Owner
                  </h3>

                  <div className="mt-3 space-y-1 text-sm">

                    <p>
                      <strong>Thread:</strong>{" "}
                      {request.threadType}
                    </p>

                    <p>
                      <strong>Color:</strong>{" "}
                      {request.color}
                    </p>

                    <p>
                      <strong>Quantity:</strong>{" "}
                      {request.quantity} {request.unit}
                    </p>

                    <p>
                      <strong>Listing Type:</strong>{" "}
                      {request.listingType}
                    </p>

                  </div>

                  <span
                    className={`inline-block mt-4 px-3 py-1 rounded-full text-sm ${getStatusColor(
                      request.status
                    )}`}
                  >
                    {request.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}