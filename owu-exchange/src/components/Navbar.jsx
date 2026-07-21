import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Container from "./Container";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 bg-white border-b z-50">
      <Container>
        <div className="h-16 flex items-center justify-between">

          <Link
            to="/"
            className="text-2xl font-bold text-amber-700"
          >
            OwuExchange
          </Link>

          <nav className="flex gap-6 items-center">
            <Link to="/" className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-orange-600 hover:shadow-xl">
            Home</Link>

            <Link to="/marketplace"
             className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-orange-600 hover:shadow-xl"
            >
              Marketplace
            </Link>

            <Link
              to="/login"
              className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-orange-600 hover:shadow-xl"
            >
              Login
            </Link>

            {user && (
              <Link
                to={`/profile/${user.uid}`}
                className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-orange-600 hover:shadow-xl"
              >
                Profile
              </Link>
            )}    

            <Link
              to="/signup"
              className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-orange-600 hover:shadow-xl"
            >
              Join
            </Link>
          </nav>

        </div>
      </Container>
    </header>
  );
}