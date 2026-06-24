import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.uid) return;

      try {
        const userDoc = await getDoc(
          doc(db, "users", user.uid)
        );

        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-amber-700">
              OwuExchange
            </h1>

            <p className="text-sm text-gray-500">
              Aso-Oke Thread Exchange Platform
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Welcome Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold">
            Ẹ káàbọ̀, {userData?.fullName || "Weaver"}
          </h2>

          <p className="mt-2 text-gray-600">
            Welcome back, {userData?.fullName || "Weaver"}
          </p>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
            {userData?.location && (
              <span>📍 {userData.location}</span>
            )}

            {userData?.phone && (
              <span>📞 {userData.phone}</span>
            )}
          </div>

          <p className="mt-4 text-lg">
            <span className="font-semibold">
              Weaver Dashboard
            </span>{" "}
            — <span className="text-amber-700">Pátákó Owu</span>
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-gray-500">
              Total Listings
            </p>

            <h3 className="text-4xl font-bold mt-2">
              0
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Owu Available
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-gray-500">
              Exchange Requests
            </p>

            <h3 className="text-4xl font-bold mt-2">
              0
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Ìbéèrè Pàṣípààrọ̀
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-gray-500">
              Successful Exchanges
            </p>

            <h3 className="text-4xl font-bold mt-2">
              0
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Àṣeyọrí
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="text-xl font-bold mb-6">
            Quick Actions
          </h3>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/add-listing"
              className="px-6 py-3 bg-amber-700 text-white rounded-lg"
            >
              + Add Owu Listing
            </Link>

            <Link className="px-6 py-3 border rounded-lg hover:bg-gray-50 transition"
              to="/marketplace"
            >
              Browse Marketplace
            </Link>

            <Link className="px-6 py-3 border rounded-lg"
              to="/my-listings"
            >
              My Listings
            </Link>

            <Link className="px-6 py-3 border rounded-lg hover:bg-gray-50 transition"
              to="/requests"
             className="px-6 py-3 border rounded-lg"
            >
                View Requests
            </Link>

          </div>
        </div>

        {/* Recent Listings */}
        <div className="mt-8 bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="text-xl font-bold mb-4">
            Recent Owu Listings
          </h3>

          <div className="text-gray-500">
            No listings available yet.
          </div>
        </div>
      </main>
    </div>
  );
}