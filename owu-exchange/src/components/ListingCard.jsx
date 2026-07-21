import { Link } from "react-router-dom";

export default function ListingCard({
  listing,
  user,
  handleRequestExchange,
}) {
  return (
    <Link to={`/listingdetails/${listing.id}`}>
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden">
        {/* Image */}
        <div className="h-48 overflow-hidden">
          {listing.coverImage ? (
            <img
                src={listing.coverImage}
                alt={listing.threadType}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="h-full bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center">
                <span className="text-6xl">🧵</span>
              </div>
            )}
          </div>

      {/* Content */}
      <div className="p-6">
        {/* Listing Type */}
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

        {/* Thread */}
        <h2 className="text-xl font-bold">
          {listing.threadType}
        </h2>

        {/* Details */}
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
              <strong>Price:</strong>{" "}
              ₦{listing.price?.toLocaleString()}
            </p>
          )}
        </div>

        {/* Status */}
        <div className="mt-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              listing.status === "available"
                ? "bg-green-100 text-green-700"
                : listing.status === "sold"
                ? "bg-red-100 text-red-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {listing.status}
          </span>
        </div>

        {/* Owner */}
        <div className="mt-6 border-t pt-4">
          <Link
              to={`/profile/${listing.ownerId}`}
              className="font-semibold text-lg hover:text-amber-700"
            >
              <Userplus /> {listing.ownerName || "Unknown Weaver"}
            </Link>

          <p className="text-sm text-gray-500">
            📍 {listing.ownerLocation || "Iseyin"}
          </p>
        </div>

        {/* Button */}
        <button
          onClick={() => handleRequestExchange(listing)}
          disabled={listing.ownerId === user?.uid}
          className={`w-full mt-5 py-3 rounded-lg text-white transition ${
            listing.ownerId === user?.uid
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-amber-700 hover:bg-amber-800"
          }`}
        >
          {listing.ownerId === user?.uid
            ? "Your Listing"
            : listing.listingType === "exchange"
            ? "Request Exchange"
            : "Buy Now"}
        </button>
      </div>
    </div>
    </Link>
  );
}