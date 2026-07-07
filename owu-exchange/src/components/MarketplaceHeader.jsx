export default function MarketplaceHeader() {
  return (
    <section className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900">
          Owu Marketplace
        </h1>

        <p className="mt-3 text-lg text-gray-600">
          Browse available threads for exchange or sale.
        </p>

        <p className="mt-2 text-amber-700 font-medium">
          Ọjà Owu fún àwọn aláṣọ òkè
        </p>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-amber-50 rounded-xl p-4 text-center">
            <h3 className="text-2xl font-bold text-amber-700">🧵</h3>
            <p className="mt-2 font-semibold">Quality Threads</p>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <h3 className="text-2xl font-bold text-blue-700">🤝</h3>
            <p className="mt-2 font-semibold">Safe Exchange</p>
          </div>

          <div className="bg-green-50 rounded-xl p-4 text-center">
            <h3 className="text-2xl font-bold text-green-700">💰</h3>
            <p className="mt-2 font-semibold">Buy & Sell</p>
          </div>

          <div className="bg-purple-50 rounded-xl p-4 text-center">
            <h3 className="text-2xl font-bold text-purple-700">🇳🇬</h3>
            <p className="mt-2 font-semibold">Made for Weavers</p>
          </div>
        </div>
      </div>
    </section>
  );
}