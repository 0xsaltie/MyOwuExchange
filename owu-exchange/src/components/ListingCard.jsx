export default function ListingCard({
  listing,
  user,
  handleRequestExchange,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden">
      {/* Image */}
      <div className="h-48 bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center">
        <span className="text-6xl">🧵</span>
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
          <p className="font-semibold text-lg">
            👤 {listing.ownerName || "Unknown Weaver"}
          </p>

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
  );
}