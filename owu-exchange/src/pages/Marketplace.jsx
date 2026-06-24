import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../services/firebase";
import { useAuth } from "../context/AuthContext";

export default function Marketplace() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  const handleRequestExchange = async (listing) => {
    try {
      if (!user) {
        alert("Please login first");
        return;
      }

      if (user.uid === listing.ownerId) {
        alert("You cannot request your own listing");
        return;
      }

      await addDoc(
       collection(db, "exchangeRequests"),
      {
     listingId: listing.id,

     senderId: user.uid,
     senderEmail: user.email,

     receiverId: listing.ownerId,

     listingType: listing.listingType,

     threadType: listing.threadType,
     color: listing.color,
      quantity: listing.quantity,
     unit: listing.unit,

     desiredThread: listing.desiredThread || null,
     price: listing.price || null,

     status: "pending",

     createdAt: serverTimestamp(),
    }
);

      alert("Exchange request sent successfully!");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const q = query(
          collection(db, "listings"),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setListings(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">
          Loading Marketplace...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100">
      {/* Hero */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold">
            Owu Marketplace
          </h1>

          <p className="text-gray-600 mt-2">
            Browse available threads for exchange or sale
          </p>

          <p className="text-amber-700 mt-2">
            Ọjà Owu fún àwọn alaso-oke
          </p>
        </div>
      </section>

      {/* Listings */}
      <section className="max-w-7xl mx-auto px-6 py-10">

        {listings.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center">
            <h2 className="text-2xl font-semibold">
              No Listings Yet
            </h2>

            <p className="text-gray-500 mt-3">
              Be the first weaver to post an Owu listing.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden"
              >
                {/* Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center">
                  <span className="text-6xl">🧵</span>
                </div>

                {/* Content */}
                <div className="p-6">

                  {/* Badge */}
                  <div className="mb-4">
                    {listing.listingType === "exchange" ? (
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        Exchange • Paṣípààrọ̀
                      </span>
                    ) : (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        Sale • Tita
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold">
                    {listing.threadType}
                  </h3>

                  <div className="mt-4 space-y-2 text-gray-600">

                    <p>
                      <strong>Color:</strong> {listing.color}
                    </p>

                    <p>
                      <strong>Quantity:</strong>{" "}
                      {listing.quantity} {listing.unit}
                    </p>

                    {listing.listingType === "exchange" && (
                      <p>
                        <strong>Needs:</strong>{" "}
                        {listing.desiredThread}
                      </p>
                    )}

                    {listing.listingType === "sale" && (
                      <p>
                        <strong>Price:</strong> ₦
                        {listing.price?.toLocaleString()}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 border-t pt-4">
                  <p className="font-semibold text-lg">
                 👤 {listing.ownerName || "Unknown Weaver"}
                  </p>

                 <p className="text-sm text-gray-500">
                📍 {listing.ownerLocation || "Iseyin"}
                  </p>
                 </div>

                  <button
  onClick={() => handleRequestExchange(listing)}
  className="w-full mt-5 bg-amber-700 text-white py-3 rounded-lg hover:bg-amber-800"
>
  Request Exchange
</button>

                </div>
              </div>
            ))}
          </div>
        )}

      </section>
    </div>
  );
}