import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../services/firebase";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userRef = doc(db, "users", user.uid);

        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setProfile(userSnap.data());
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8">

        <div className="text-center">

          <div className="w-24 h-24 mx-auto rounded-full bg-amber-700 text-white flex items-center justify-center text-3xl font-bold">
            {profile.fullName?.charAt(0)}
          </div>

          <h1 className="text-3xl font-bold mt-4">
            {profile.fullName}
          </h1>

          <p className="text-gray-500">
            Weaver • Aláso-oke Enthusiast
          </p>

        </div>

        <div className="mt-10 space-y-5">

          <div className="border rounded-xl p-4">
            <p className="text-gray-500 text-sm">
              Email
            </p>

            <p className="font-medium">
              {profile.email}
            </p>
          </div>

          <div className="border rounded-xl p-4">
            <p className="text-gray-500 text-sm">
              Phone Number
            </p>

            <p className="font-medium">
              {profile.phone}
            </p>
          </div>

          <div className="border rounded-xl p-4">
            <p className="text-gray-500 text-sm">
              Location
            </p>

            <p className="font-medium">
              📍 {profile.location}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}