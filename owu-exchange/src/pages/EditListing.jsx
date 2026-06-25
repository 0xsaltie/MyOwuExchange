import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../services/firebase";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function EditListing() {
  const { user } = useAuth();

  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
      threadType: "",
      color: "",
      quantity: "",
      unit: "cones",
      listingType: "exchange",
      desiredThread: "",
      price: "",
      status: "available",
    });

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const docRef = doc(db, "listings", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          navigate("/my-listings");
          return;
        }

        const listingData = docSnap.data();

        // Prevent editing another user's listing
        if (listingData.ownerId !== user?.uid) {
          navigate("/my-listings");
          return;
        }

        setFormData({
          threadType: listingData.threadType || "",
          color: listingData.color || "",
          quantity: listingData.quantity || "",
          desiredThread: listingData.desiredThread || "",
          price: listingData.price || "",
          listingType: listingData.listingType || "exchange",
          unit: listingData.unit || "cones",
          status: listingData.status || "available",
        });
      } catch (error) {
        console.error(error);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchListing();
    }
  }, [id, user, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateDoc(doc(db, "listings", id), {
            threadType: formData.threadType,
            color: formData.color,
            quantity: Number(formData.quantity),
            listingType: formData.listingType,
            unit: formData.unit,
            status: formData.status,

            desiredThread:
              formData.listingType === "exchange"
                ? formData.desiredThread
                : null,

            price:
              formData.listingType === "sale"
                ? Number(formData.price)
                : null,
          });
      alert("Listing updated successfully!");

      navigate("/my-listings");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Listing...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8">

        <h1 className="text-3xl font-bold mb-2">
          Edit Listing
        </h1>

        <p className="text-gray-600 mb-8">
          Ṣàtúnṣe Owu tí o ti fi sílẹ̀
        </p>

        <form
          onSubmit={handleUpdate}
          className="space-y-6"
        >
          {/* Thread Type */}
          <div>
            <label className="block mb-2 font-medium">
              Thread Type (Iru Owu)
            </label>

            <input
              type="text"
              name="threadType"
              value={formData.threadType}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          {/* Color */}
          <div>
            <label className="block mb-2 font-medium">
              Color (Àwọ̀)
            </label>

            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block mb-2 font-medium">
              Quantity (Iye)
            </label>

            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
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
         {/* Unit */}
         <div>
              <label className="block mb-2 font-medium">
                Unit
              </label>

              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
              >
                <option value="cones">Cones</option>
                <option value="rolls">Rolls</option>
                <option value="pieces">Pieces</option>
                <option value="kg">Kg</option>
              </select>
            </div>

          {/* Desired Thread */}
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
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>
          )}

          {/* Price */}
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
          {/* Status */}  
                  <div>
          <label className="block mb-2 font-medium">
            Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          >
            <option value="available">
              Available
            </option>

            <option value="unavailable">
              Unavailable
            </option>
          </select>
        </div>
          <button
            type="submit"
            className="w-full bg-amber-700 hover:bg-amber-800 text-white py-3 rounded-lg transition"
          >
            Update Listing
          </button>
        </form>

      </div>
    </div>
  );
}