import React from "react";
import { useEffect, useState } from "react";
import { Userplus } from "lucide-react";
import {
  doc,
  getDoc,
} from "firebase/firestore";
import {
  useParams,
  Link,
} from "react-router-dom";

import { db } from "../services/firebase";

export default function ListingDetails() {
  const { id } = useParams();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchListing() {
      try {
        const docRef = doc(db, "listings", id);
        const snap = await getDoc(docRef);

        if (snap.exists()) {
          setListing({
            id: snap.id,
            ...snap.data(),
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchListing();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading Listing...
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Listing not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 p-6">
      <div className="grid lg:grid-cols-2 gap-10">

  <div>

    <img
      src={listing.coverImage}
      alt={listing.threadType}
      className="rounded-2xl w-full h-96 object-cover"
    />

    {listing.images?.length > 1 && (

      <div className="grid grid-cols-4 gap-3 mt-4">

        {listing.images.map((image, index) => (

          <img
            key={index}
            src={image}
            alt=""
            className="rounded-lg h-24 object-cover"
          />

        ))}

      </div>

    )}

  </div>

</div>

<div>

  <h1 className="text-4xl font-bold">
    {listing.threadType}
  </h1>

  <p className="mt-4">
    <strong>Color:</strong> {listing.color}
  </p>

  <p>
    <strong>Quantity:</strong>

    {listing.quantity} {listing.unit}
  </p>

  <p>
    <strong>Status:</strong>

    {listing.status}
  </p>

  {listing.listingType === "sale" && (

    <p className="text-2xl font-bold text-green-700 mt-4">

      ₦{listing.price?.toLocaleString()}

    </p>

  )}

  {listing.listingType === "exchange" && (

    <p className="mt-4">

      <strong>Needs:</strong>

      {listing.desiredThread}

    </p>

  )}

</div>
<div className="mt-8 border-t pt-6">

  <h3 className="font-bold text-xl">

    Weaver Information

  </h3>

  <p className="mt-3">

    <Userplus /> {listing.ownerName}

  </p>

  <p>

    📍 {listing.ownerLocation}

  </p>

</div>
<div className="flex gap-4 mt-8">

  <button className="bg-amber-700 text-white px-6 py-3 rounded-lg">

    Request Exchange

  </button>

  <button className="bg-blue-700 text-white px-6 py-3 rounded-lg">

    Chat Weaver

  </button>

</div>
      <div className="max-w-6xl mx-auto">

        <Link
          to="/marketplace"
          className="text-amber-700 font-semibold"
        >
          ← Back to Marketplace
        </Link>

      </div>
    </div>
  );
}