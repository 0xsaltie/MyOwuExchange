import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { db } from "../services/firebase";
import ProfileHeader from "../components/ProfileHeader";
import ProfileStats from "../components/ProfileStats";
import ProfileListings from "../components/ProfileListings";

export default function Profile() {
  const { id } = useParams();

  const [profile, setProfile] = useState(null);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Fetch user profile
        const userRef = doc(db, "users", id);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setProfile({
            id: userSnap.id,
            ...userSnap.data(),
          });
        }

        // Fetch user's listings
        const listingsQuery = query(
          collection(db, "listings"),
          where("ownerId", "==", id)
        );

        const listingsSnapshot = await getDocs(listingsQuery);

        const listingsData = listingsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setListings(listingsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        User not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 py-8">
      <div className="max-w-6xl mx-auto px-6">

        <ProfileHeader profile={profile} />

        <div className="mt-8">
          <ProfileStats
            profile={profile}
            listings={listings}
          />
        </div>

        <div className="mt-10">
          <ProfileListings
            listings={listings}
          />
        </div>

      </div>
    </div>
  );
}