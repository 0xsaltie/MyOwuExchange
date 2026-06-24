import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Navigation */}
      <nav className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            OwuExchange
          </h1>

          <div className="flex gap-4">
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg border"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="px-4 py-2 rounded-lg bg-black text-white"
            >
              Join Now
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div>
            <h1 className="text-5xl font-bold leading-tight">
              Exchange Aso-Oke Threads Easily in Iseyin
            </h1>

            <p className="mt-6 text-lg text-gray-600">
              OwuExchange helps Aso-Oke weavers connect,
              exchange threads, discover suppliers,
              and reduce production delays.
            </p>

            <div className="flex gap-4 mt-8">
              <Link
                to="/marketplace"
                className="bg-black text-white px-6 py-3 rounded-lg"
              >
                Browse Threads
              </Link>

              <Link
                to="/signup"
                className="border px-6 py-3 rounded-lg"
              >
                Become a Weaver
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-amber-100 to-orange-200 h-[400px] flex items-center justify-center">
            <span className="text-7xl">
              🧵
            </span>
          </div>

        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-xl">
              Exchange Threads
            </h3>
            <p className="mt-3 text-gray-600">
              Trade unused Owu with other weavers.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-xl">
              Find Suppliers
            </h3>
            <p className="mt-3 text-gray-600">
              Discover trusted thread suppliers.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-xl">
              Grow Together
            </h3>
            <p className="mt-3 text-gray-600">
              Strengthen the weaving community in Iseyin.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}