import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import heroImage from "../assets/owu 1.png";
import { UserPlus, PackageSearch, Handshake } from "lucide-react";
import { Users, Package, Store, Repeat } from "lucide-react";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div>

              <span className="inline-block rounded-full bg-orange-100 px-4 py-1 text-sm font-medium text-orange-700">
              Supporting the Aso-Oke Weaving Community
              </span>
              <h1 className="text-5xl font-bold leading-tight">
                The Digital Marketplace for Aso-Oke Weavers
              </h1>

              <p className="mt-6 text-lg text-gray-600">
                OwuExchange helps Aso-Oke weavers connect,
                exchange threads, discover suppliers,
                and reduce production delays.
                
              </p>

              <div className="flex gap-4 mt-8">
                <Link
                  to="/marketplace"
                  className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow-lg transition hover:-translate-y-1 hover:bg-orange-600 hover:shadow-xl"
                >
                  Browse Threads
                </Link>

                <Link
                  to="/signup"
                  className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow-lg transition hover:-translate-y-1 hover:bg-orange-600 hover:shadow-xl  "
                >
                  Become a Weaver
                </Link>
              </div>
            </div>

           <div className="group relative h-[400px] overflow-hidden rounded-3xl bg-gradient-to-br from-amber-100 via-orange-100 to-orange-200 shadow-xl">
  <img
    src={heroImage}
    alt="Hero"
    className="absolute inset-0 m-auto h-[90%] w-[90%] object-contain transition-all duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-2"
  />

  {/* Soft Glow */}
  <div className="absolute inset-0 bg-gradient-to-t from-orange-300/10 via-transparent to-white/20"></div>
</div> </div>
        </section>

        {/* How It Works */}
<section className="max-w-7xl mx-auto px-6 py-20">
  <div className="text-center">
    <h2 className="text-4xl font-bold">How OwuExchange Works</h2>
    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
      Join the community in just three simple steps and start exchanging
      Aso-Oke threads with trusted weavers.
    </p>
  </div>

  <div className="mt-16 grid md:grid-cols-3 gap-8 relative">

    {/* Step 1 */}
    <div className="relative bg-white rounded-2xl shadow-md p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-2xl">
        <UserPlus className="h-8 w-8 text-orange-500" />
      </div>

      <span className="absolute top-4 right-4 text-5xl font-bold text-orange-100">
        1
      </span>

      <h3 className="mt-6 text-xl font-semibold">
        Create an Account
      </h3>

      <p className="mt-3 text-gray-600">
        Register as a weaver or supplier and create your profile in a few
        minutes.
      </p>
    </div>

    {/* Step 2 */}
    <div className="relative bg-white rounded-2xl shadow-md p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-2xl">
        <PackageSearch className="h-8 w-8 text-orange-500" />
      </div>

      <span className="absolute top-4 right-4 text-5xl font-bold text-orange-100">
        2
      </span>

      <h3 className="mt-6 text-xl font-semibold">
        List or Browse Threads
      </h3>

      <p className="mt-3 text-gray-600">
        Post available threads or explore listings from other trusted
        weavers.
      </p>
    </div>
<div className="hidden md:block absolute left-[32%] top-1/2 text-4xl text-orange-300">
  →
</div>



<div className="hidden md:block absolute left-[66%] top-1/2 text-4xl text-orange-300">
  →
</div>
    {/* Step 3 */}
    <div className="relative bg-white rounded-2xl shadow-md p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-2xl">
        <Handshake className="h-8 w-8 text-orange-500" />
      </div>
    
      <span className="absolute top-4 right-4 text-5xl font-bold text-orange-100">
        3
      </span>

      <h3 className="mt-6 text-xl font-semibold">
        Exchange Safely
      </h3>

      <p className="mt-3 text-gray-600">
        Connect, negotiate, and complete your thread exchange with
        confidence.
      </p>
    </div>

  </div>
</section>

{/* Statistics */}
<section className="bg-orange-50 py-20">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center">
      <h2 className="text-4xl font-bold">
        Empowering the Weaving Community
      </h2>
      <p className="mt-4 text-gray-600">
        OwuExchange is helping weavers connect, exchange resources, and grow together.
      </p>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-14">

      <div className="bg-white rounded-2xl p-8 shadow-md text-center transition hover:-translate-y-2 hover:shadow-xl">
        <h3 className="text-5xl font-bold text-orange-500">500+</h3>
        <p className="mt-3 text-gray-600 font-medium">
          Registered Weavers
        </p>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-md text-center transition hover:-translate-y-2 hover:shadow-xl">
        <h3 className="text-5xl font-bold text-orange-500">1,200+</h3>
        <p className="mt-3 text-gray-600 font-medium">
          Thread Listings
        </p>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-md text-center transition hover:-translate-y-2 hover:shadow-xl">
        <h3 className="text-5xl font-bold text-orange-500">40+</h3>
        <p className="mt-3 text-gray-600 font-medium">
          Trusted Suppliers
        </p>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-md text-center transition hover:-translate-y-2 hover:shadow-xl">
        <h3 className="text-5xl font-bold text-orange-500">95%</h3>
        <p className="mt-3 text-gray-600 font-medium">
          Successful Exchanges
        </p>
      </div>

    </div>
  </div>
</section>

{/* Testimonials */}
<section className="max-w-7xl mx-auto px-6 py-20">
  <div className="text-center">
    <h2 className="text-4xl font-bold">
      What Our Weavers Say
    </h2>

    <p className="mt-4 text-gray-600">
      Hear from members of the OwuExchange community.
    </p>
  </div>

  <div className="grid lg:grid-cols-3 gap-8 mt-14">

    <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
      <p className="text-gray-600 italic">
        "I found the exact thread colour I needed within two days.
        OwuExchange has made sourcing much easier."
      </p>

      <div className="mt-6">
        <h4 className="font-semibold">
          <UserPlus className="h-8 w-8 text-orange-500" /> Adebayo A.
        </h4>
        <span className="text-sm text-orange-500">
          Aso-Oke Weaver • Iseyin
        </span>
      </div>
    </div>

    <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
      <p className="text-gray-600 italic">
        "Instead of letting unused threads sit in storage,
        I exchange them with other weavers."
      </p>

      <div className="mt-6">
        <h4 className="font-semibold">
          <UserPlus className="h-8 w-8 text-orange-500" /> Kafayat M.
        </h4>
        <span className="text-sm text-orange-500">
          Weaver • Oyo
        </span>
      </div>
    </div>

    <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
      <p className="text-gray-600 italic">
        "The supplier directory helped me find quality thread
        at a better price."
      </p>

      <div className="mt-6">
        <h4 className="font-semibold">
          <UserPlus className="h-8 w-8 text-orange-500" /> Ibrahim S.
        </h4>
        <span className="text-sm text-orange-500">
          Master Weaver • Saki
        </span>
      </div>
    </div>

  </div>
</section>

<section className="max-w-7xl mx-auto px-6 py-20">
  <div className="flex justify-between items-center">
    <div>
      <h2 className="text-4xl font-bold">Featured Threads</h2>
      <p className="text-gray-600 mt-2">
        Discover some of the latest thread listings from our community.
      </p>
    </div>

    <Link
      to="/marketplace"
      className="text-orange-600 font-semibold hover:underline"
    >
      View All →
    </Link>
  </div>

  <div className="grid md:grid-cols-3 gap-8 mt-10">
    {/* Cards go here */}
  </div>
</section>

        {/* Features */}
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-xl">
                🧵 Exchange Threads
              </h3>
              <p className="mt-3 text-gray-600">
                Trade unused Owu with other weavers.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-xl">
                🔍 Find Suppliers
              </h3>
              <p className="mt-3 text-gray-600">
                Discover trusted thread suppliers.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-xl">
                🤝 Connect with Weavers
              </h3>
              <p className="mt-3 text-gray-600">
                Strengthen the weaving community in Iseyin.
              </p>
            </div>

          </div>
        </section>

        {/* Final Call to Action */}
<section className="py-24 bg-gradient-to-r from-orange-500 to-amber-500">
  <div className="max-w-5xl mx-auto px-6 text-center text-white">

    <h2 className="text-4xl md:text-5xl font-bold">
      Join the OwuExchange Community Today
    </h2>

    <p className="mt-6 text-lg text-orange-100 max-w-2xl mx-auto">
      Whether you're looking to exchange Aso-Oke threads, discover trusted
      suppliers, or connect with fellow weavers, OwuExchange is here to help
      your craft thrive.
    </p>

    <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

      <Link
        to="/signup"
        className="rounded-xl bg-white px-8 py-4 font-semibold text-orange-500 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      >
        Become a Weaver
      </Link>

      <Link
        to="/marketplace"
        className="rounded-xl border-2 border-white px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-white hover:text-orange-600"
      >
        Browse Marketplace
      </Link>

    </div>

  </div>
</section>
      </main>

      <Footer />
    </>
  );
}