import { Link } from "react-router-dom";
import Container from "./Container";

export default function Navbar() {
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
            <Link to="/">Home</Link>

            <Link to="/marketplace">
              Marketplace
            </Link>

            <Link
              to="/login"
              className="px-4 py-2 border rounded-lg"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="px-4 py-2 rounded-lg bg-black text-white"
            >
              Join
            </Link>
          </nav>

        </div>
      </Container>
    </header>
  );
}