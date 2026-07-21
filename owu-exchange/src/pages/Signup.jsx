import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

import { auth, db } from "../services/firebase";
import Footer from "../components/Footer";

export default function Signup() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    area: "",
    location: "Iseyin",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        area: formData.area,
        location: formData.location,
        role: "weaver",
        createdAt: serverTimestamp(),
      });

      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <main>
      <div className="min-h-screen bg-stone-100 flex items-center justify-center px-4">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            Join OwuExchange
          </h1>

          <p className="text-gray-600 mt-2">
            Connect with Aso-Oke weavers in Iseyin
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">

          <div>
            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Area (Agbegbe)
            </label>

            <input
              type="text"
              name="area"
              required
              value={formData.area}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
              placeholder="Enter your area"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
              placeholder="08012345678"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-700 text-white py-3 rounded-lg hover:bg-amber-800 transition"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-amber-700 font-semibold"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
    </main>

    <Footer />
    </>
  );
}