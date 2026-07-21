import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "../context/AuthContext";

export default function EditProfile() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    location: "",
    bio: "",
    phone: "",
    businessName: "",
    photoURL: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const snap = await getDoc(doc(db, "users", user.uid));

        if (snap.exists()) {
          setForm({
            fullName: snap.data().fullName || "",
            location: snap.data().location || "",
            bio: snap.data().bio || "",
            phone: snap.data().phone || "",
            businessName: snap.data().businessName || "",
            photoURL: snap.data().photoURL || "",
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await updateDoc(doc(db, "users", user.uid), {
        ...form,
      });

      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8">

        <h1 className="text-3xl font-bold mb-8">
          Edit Profile
        </h1>

        <form
          onSubmit={handleSave}
          className="space-y-6"
        >

          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border rounded-lg p-3"
          />

          <input
            name="businessName"
            value={form.businessName}
            onChange={handleChange}
            placeholder="Business Name"
            className="w-full border rounded-lg p-3"
          />

          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full border rounded-lg p-3"
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full border rounded-lg p-3"
          />

          <input
            name="photoURL"
            value={form.photoURL}
            onChange={handleChange}
            placeholder="Profile Image URL"
            className="w-full border rounded-lg p-3"
          />

          <textarea
            rows="5"
            name="bio"
            value={form.bio}
            onChange={handleChange}
            placeholder="Tell other weavers about yourself..."
            className="w-full border rounded-lg p-3"
          />

          <button
            type="submit"
            disabled={saving}
            className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-lg"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

        </form>

      </div>
    </div>
  );
}