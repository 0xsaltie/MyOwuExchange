import { useAuth } from "../context/AuthContext";

export default function TestAuth() {
  const { user } = useAuth();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        Firebase Connected
      </h1>

      <p className="mt-4">
        {user ? user.email : "No user logged in"}
      </p>
    </div>
  );
}