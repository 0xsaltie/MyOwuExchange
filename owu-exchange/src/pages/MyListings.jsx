import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../services/firebase";
import { useAuth } from "../context/AuthContext";

export default function MyListings() {
  const { user } = useAuth();

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const q = query(
          collection(db, "listings"),
          where("ownerId", "==", user.uid)
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

    if (user) {
      fetchListings();
    }
  }, [user]);

  const handleDelete = async (listingId) => {
    const confirmed = window.confirm(
      "Delete this listing?"
    );

    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "listings", listingId));

      setListings((prev) =>
        prev.filter((item) => item.id !== listingId)
      );

      alert("Listing deleted.");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 p-6">
      <div className="max-w-6xl mx-auto">

        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            My Listings
          </h1>

          <p className="text-gray-600 mt-2">
            Owu Tí Mo Fì Sílẹ̀
          </p>
        </div>

        {listings.length === 0 ? (
          <div className="text-center py-10">
                  <div className="text-5xl mb-4">🧵</div>

                  <h3 className="text-xl font-bold">
                    No Listings Yet
                  </h3>

                  <p className="text-gray-500 mt-2">
                    Create your first Owu listing.
                  </p>

                  <Link
                    to="/add-listing"
                    className="inline-block mt-4 bg-amber-700 text-white px-5 py-3 rounded-lg"
                  >
                    Add Listing
                  </Link>
                </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {listings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-2xl shadow-sm p-6"
              >
                <h2 className="text-xl font-bold">
                  {listing.threadType}
                </h2>

                <div className="mt-4 space-y-2">

                  <p>
                    <strong>Color:</strong>{" "}
                    {listing.color}
                  </p>

                  <p>
                    <strong>Quantity:</strong>{" "}
                    {listing.quantity} {listing.unit}
                  </p>

                   <div>
                      <span
                       className={`px-3 py-1 rounded-full text-sm ${
                          listing.status === "available"
                          ? "bg-green-100 text-green-700"
                            : listing.status === "sold"
                            ? "bg-blue-100 text-blue-700"
                            : listing.status === "exchanged"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-gray-100 text-gray-700"
}`}
                >
                     {listing.status}
                   </span>
                  </div>

                  <p>
                    <strong>Type:</strong>{" "}
                    {listing.listingType}
                  </p>

                </div>
                      {listing.listingType === "exchange" && (
                     <p>
                        <strong>Needs:</strong> {listing.desiredThread}
                    </p>
                    )}

                      {listing.listingType === "sale" && (
                      <p>
                    <strong>Price:</strong> ₦
                      {listing.price?.toLocaleString()}
                      </p>
                          )}
                <div className="mt-6 flex gap-3">

                  <Link
                   to={`/edit-listing/${listing.id}`}
                   className="flex-1 text-center border border-amber-700 text-amber-700 py-2 rounded-lg"
        >
                   Edit
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(listing.id)
                    }
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}