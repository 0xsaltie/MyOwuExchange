export default function ProfileStats({
  profile,
  listings,
}) {
  const stats = [
    {
      title: "Listings",
      value: listings.length,
      icon: "🧵",
      color: "bg-amber-100 text-amber-700",
    },
    {
      title: "Completed Exchanges",
      value: profile.completedExchanges || 0,
      icon: "🤝",
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Reviews",
      value: profile.totalReviews || 0,
      icon: "⭐",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: "Rating",
      value: profile.rating || 0,
      icon: "🏆",
      color: "bg-blue-100 text-blue-700",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-white rounded-2xl shadow-sm p-6 text-center hover:shadow-md transition"
        >
          <div
            className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center text-2xl ${stat.color}`}
          >
            {stat.icon}
          </div>

          <h3 className="mt-4 text-3xl font-bold">
            {stat.value}
          </h3>

          <p className="mt-2 text-gray-500">
            {stat.title}
          </p>
        </div>
      ))}
    </div>
  );
}