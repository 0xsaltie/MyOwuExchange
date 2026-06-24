import { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "../services/firebase";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AddListing() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const [formData, setFormData] = useState({
    threadType: "",
    color: "",
    quantity: "",
    unit: "cones",
    listingType: "exchange",
    desiredThread: "",
    price: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!user) return;

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserProfile(userSnap.data());
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userProfile) {
      alert("User profile is still loading.");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "listings"), {
        ownerId: user.uid,
        ownerEmail: user.email,

        ownerName: userProfile.fullName,
        ownerPhone: userProfile.phone,
        ownerLocation: userProfile.location,

        threadType: formData.threadType,
        color: formData.color,
        quantity: Number(formData.quantity),
        unit: formData.unit,

        listingType: formData.listingType,

        desiredThread:
          formData.listingType === "exchange"
            ? formData.desiredThread
            : null,

        price:
          formData.listingType === "sale"
            ? Number(formData.price)
            : null,

        status: "available",

        createdAt: serverTimestamp(),
      });

      alert("Owu listing created successfully!");

      setFormData({
        threadType: "",
        color: "",
        quantity: "",
        unit: "cones",
        listingType: "exchange",
        desiredThread: "",
        price: "",
      });

      navigate("/marketplace");
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8">

        <h1 className="text-3xl font-bold mb-2">
          Add Owu Listing
        </h1>

        <p className="text-gray-600 mb-8">
          Ṣàfikún Owu tuntun fún paṣípààrọ̀ tàbí tita
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block mb-2 font-medium">
              Thread Type (Iru Owu)
            </label>

            <select
              name="threadType"
              value={formData.threadType}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="">Select Type</option>
              <option value="Cotton">Cotton</option>
              <option value="Silk">Silk</option>
              <option value="Metallic">Metallic</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Color (Àwọ̀)
            </label>

            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              required
              placeholder="Blue"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Quantity (Iye)
            </label>

            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Listing Type
            </label>

            <select
              name="listingType"
              value={formData.listingType}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="exchange">
                Exchange (Paṣípààrọ̀)
              </option>

              <option value="sale">
                Sale (Tita)
              </option>
            </select>
          </div>

          {formData.listingType === "exchange" && (
            <div>
              <label className="block mb-2 font-medium">
                Desired Thread
              </label>

              <input
                type="text"
                name="desiredThread"
                value={formData.desiredThread}
                onChange={handleChange}
                placeholder="Red Cotton Thread"
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>
          )}

          {formData.listingType === "sale" && (
            <div>
              <label className="block mb-2 font-medium">
                Price (₦)
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-700 text-white py-3 rounded-lg hover:bg-amber-800 transition"
          >
            {loading ? "Saving..." : "Create Listing"}
          </button>

        </form>
      </div>
    </div>
  );
}