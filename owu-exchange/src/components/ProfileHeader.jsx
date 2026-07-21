import { Link } from "react-router-dom";

export default function ProfileHeader({ profile }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-8">
      <div className="flex flex-col md:flex-row items-center gap-8">

        {/* Profile Picture */}
        <div className="flex-shrink-0">
          {profile.photoURL ? (
            <img
              src={profile.photoURL}
              alt={profile.fullName}
              className="w-36 h-36 rounded-full object-cover border-4 border-amber-600"
            />
          ) : (
            <div className="w-36 h-36 rounded-full bg-amber-100 flex items-center justify-center text-5xl border-4 border-amber-600">
              👤
            </div>
          )}
        </div>

        {/* User Information */}
        <div className="flex-1">

          <h1 className="text-4xl font-bold">
            {profile.fullName}
          </h1>

          <p className="text-gray-500 mt-1">
            {profile.email}
          </p>

          <p className="mt-4 text-lg">
            📍 {profile.location || "Location not provided"}
          </p>

          <p className="mt-2 text-gray-600">
            {profile.bio || "No bio added yet."}
          </p>

            <Link
            to="/edit-profile"
            className="inline-block mt-6 bg-amber-700 text-white px-5 py-3 rounded-lg hover:bg-amber-800"
            >
            Edit Profile
            </Link>
          {/* Rating */}
          <div className="mt-6 flex items-center gap-3">

            <span className="text-yellow-500 text-2xl">
              ⭐
            </span>

            <span className="text-lg font-semibold">
              {profile.rating ?? "0.0"}
            </span>

            <span className="text-gray-500">
              ({profile.totalReviews || 0} Reviews)
            </span>

          </div>

        </div>

      </div>
    </div>
  );
}