export default function EmptyState({
  title,
  message,
  icon = "📭",
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
      <div className="text-6xl mb-4">
        {icon}
      </div>

      <h2 className="text-2xl font-bold text-stone-800">
        {title}
      </h2>

      <p className="mt-3 text-gray-500">
        {message}
      </p>
    </div>
  );
}