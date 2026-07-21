import ListingCard from "./ListingCard";

export default function ProfileListings({ listings }) {
  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">
          My Listings
        </h2>

        <span className="bg-amber-100 text-amber-700 px-4 py-2 rounded-full">
          {listings.length} Listing(s)
        </span>
      </div>

      {listings.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
          <div className="text-6xl mb-4">
            🧵
          </div>

          <h3 className="text-2xl font-semibold">
            No Listings Yet
          </h3>

          <p className="text-gray-500 mt-2">
            This weaver hasn't posted any threads.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
            />
          ))}
        </div>
      )}
    </div>
  );
}