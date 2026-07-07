import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import SearchFilters from "../components/SearchFilters";
import ListingCard from "../components/ListingCard";
import MarketplaceHeader from "../components/MarketplaceHeader";
import EmptyState from "../components/EmptyState";
import { db } from "../services/firebase";
import { useAuth } from "../context/AuthContext";

export default function Marketplace() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

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
          collection(db, "notifications"),
          {
            userId: listing.ownerId,

            title: "New Exchange Request",

            message: `${user.email} requested your ${listing.threadType} thread.`,

            isRead: false,

            createdAt: serverTimestamp(),
          }
        );    
      await addDoc(collection(db, "exchangeRequests"), {
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
      });

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
          Loading Marketplace......
        </h2>
      </div>
    );
  }

const filteredListings = listings.filter((listing) => {
  const thread = (listing.threadType || "")
    .trim()
    .toLowerCase();

  const color = (listing.color || "")
    .trim()
    .toLowerCase();

  const status = (listing.status || "")
    .trim()
    .toLowerCase();

  const listingType = (listing.listingType || "")
    .trim()
    .toLowerCase();

  return (
    thread.includes(searchTerm.trim().toLowerCase()) &&
    (!selectedColor ||
      color.includes(selectedColor.trim().toLowerCase())) &&
    (!selectedType ||
      listingType === selectedType.toLowerCase()) &&
    (!selectedStatus ||
      status === selectedStatus.toLowerCase())
  );
});
  return (
    <div className="min-h-screen bg-stone-100">
      {/* Hero */}
      <MarketplaceHeader />

      {/* Search Filters */}
      <section className="max-w-7xl mx-auto px-6 py-8">

  <SearchFilters
  listings={listings}
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
  selectedColor={selectedColor}
  setSelectedColor={setSelectedColor}
  selectedType={selectedType}
  setSelectedType={setSelectedType}
  selectedStatus={selectedStatus}
  setSelectedStatus={setSelectedStatus}
/>
  <p className="text-gray-500 mt-4">
    {filteredListings.length} listing(s) found
  </p>

</section>
      
      {/* Listings */}
      <section className="max-w-7xl mx-auto px-6 pb-10">
        {filteredListings.length === 0 ? (
          <EmptyState
            icon="🧵"
            title="No Listings Found"
            message="Try adjusting your search or filters."
            />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredListings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                user={user}
                handleRequestExchange={handleRequestExchange}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}