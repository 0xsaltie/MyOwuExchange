import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../services/firebase";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc,getDoc,collection,query,where,getDocs,limit,orderBy,} from "firebase/firestore";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);

  const [stats, setStats] = useState({
    listings: 0,
    requests: 0,
    successful: 0,
  });

  const [recentListings, setRecentListings] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user?.uid) {
        setLoading(false);
        return;
      }

      try {
        // User Profile
        const userDoc = await getDoc(
          doc(db, "users", user.uid)
        );

        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }

        // My Listings
        const listingsQuery = query(
          collection(db, "listings"),
          where("ownerId", "==", user.uid)
        );

        const listingsSnapshot = await getDocs(
          listingsQuery
        );

        // Incoming Requests
        const requestsQuery = query(
          collection(db, "exchangeRequests"),
          where("receiverId", "==", user.uid)
        );

        const requestsSnapshot = await getDocs(
          requestsQuery
        );

        // Accepted Exchanges
        const successfulQuery = query(
          collection(db, "exchangeRequests"),
          where("receiverId", "==", user.uid),
          where("status", "==", "accepted")
        );

        const successfulSnapshot = await getDocs(
          successfulQuery
        );

        setStats({
          listings: listingsSnapshot.size,
          requests: requestsSnapshot.size,
          successful: successfulSnapshot.size,
        });

        const recentListingsQuery = query(
        collection(db, "listings"),
        where("ownerId", "==", user.uid),
        orderBy("createdAt", "desc"),
        limit(3)
      );

        const recentListingsSnapshot =
        await getDocs(recentListingsQuery);

        const listingsData =
        recentListingsSnapshot.docs.map((doc) => ({
        id: doc.id,
         ...doc.data(),
          }));

          setRecentListings(listingsData);
          } catch (error) {
          console.error(
          "Dashboard Error:",
          error
          );
          } finally {
          
            setLoading(false);
            }
          };

    fetchDashboardData();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-100">
        <h2 className="text-xl font-semibold">
          Loading Dashboard...
        </h2>
      </div>
    );
  }

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

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* Welcome Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold">
            Ẹ káàbọ̀,
            {" "}
            {userData?.fullName || "Weaver"}
          </h2>

          <p className="mt-2 text-gray-600">
            Welcome back,
            {" "}
            {userData?.fullName || "Weaver"}
          </p>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
            {userData?.location && (
              <span>
                📍 {userData.location}
              </span>
            )}

            {userData?.phone && (
              <span>
                📞 {userData.phone}
              </span>
            )}
          </div>

          <p className="mt-4 text-lg">
            <span className="font-semibold">
              Weaver Dashboard
            </span>
            {" "}
            —
            {" "}
            <span className="text-amber-700">
              Pátákó Owu
            </span>
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-gray-500">
              Total Listings
            </p>

            <h3 className="text-4xl font-bold mt-2 text-amber-700">
              {stats.listings}
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Owu Available
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-gray-500">
              Exchange Requests
            </p>

            <h3 className="text-4xl font-bold mt-2 text-blue-700">
              {stats.requests}
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Ìbéèrè Pàṣípààrọ̀
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-gray-500">
              Successful Exchanges
            </p>

            <h3 className="text-4xl font-bold mt-2 text-green-700">
              {stats.successful}
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Àṣeyọrí
            </p>
          </div>

        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="text-xl font-bold mb-6">
            Quick Actions
          </h3>

          <div className="flex flex-wrap gap-4">

            <Link
              to="/add-listing"
              className="px-6 py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition"
            >
              + Add Owu Listing
            </Link>

            <Link
              to="/marketplace"
              className="px-6 py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition"
            >
              Browse Marketplace
            </Link>

            <Link
              to="/my-listings"
              className="px-6 py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition"
            >
              My Listings
            </Link>

            <Link
              to="/requests"
              className="px-6 py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition"
            >
              View Requests
            </Link>

            <Link
                to="/chats"
                className="px-6 py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition"
              >
                Messages
              </Link>

              <Link
                to="/notifications"
                className="px-6 py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition"
              >
                Notifications
              </Link>
                
          </div>
        </div>

        {/* Recent Listings Placeholder */}
        <div className="mt-8 bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="text-xl font-bold mb-4">
            Recent Owu Listings
          </h3>
          {recentListings.length === 0 ? (
        <div className="text-center py-10">
        <div className="text-5xl mb-4">🧵</div>

    <h4 className="font-semibold text-lg">
      No Recent Listings
    </h4>

    <p className="text-gray-500 mt-2">
      Create your first Owu listing to start
      exchanging threads.
    </p>

    <Link
      to="/add-listing"
      className="inline-block mt-4 bg-amber-700 text-white px-5 py-3 rounded-lg"
    >
      Add Listing
    </Link>
  </div>
) : (
  <div className="grid md:grid-cols-3 gap-4">
    {recentListings.map((listing) => (
      <div
        key={listing.id}
        className="border rounded-xl p-5 hover:shadow-md transition"
      >
        <div className="flex justify-between items-start">
          <h4 className="font-bold text-lg">
            {listing.threadType}
          </h4>

          <span
            className={`px-2 py-1 rounded-full text-xs ${
              listing.listingType === "exchange"
                ? "bg-blue-100 text-blue-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {listing.listingType}
          </span>
        </div>

        <p className="mt-3 text-gray-600">
          Color: {listing.color}
        </p>

        <p className="text-gray-600">
          Quantity: {listing.quantity}{" "}
          {listing.unit}
        </p>

        {listing.listingType === "exchange" && (
          <p className="text-gray-600 mt-2">
            Wants: {listing.desiredThread}
          </p>
        )}

        {listing.listingType === "sale" && (
          <p className="font-semibold mt-2">
            ₦{listing.price?.toLocaleString()}
          </p>
        )}

        
      </div>
    ))}
  </div>
)}
          </div>

      </main>
    </div>
  );
}