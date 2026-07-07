export default function SearchFilters({
  listings,
  searchTerm,
  setSearchTerm,
  selectedColor,
  setSelectedColor,
  selectedType,
  setSelectedType,
  selectedStatus,
  setSelectedStatus,
}) {
  const colors = [
    ...new Set(
      listings
        .map((listing) => listing.color?.trim())
        .filter(Boolean)
    ),
  ].sort();

  const threadTypes = [
    ...new Set(
      listings
        .map((listing) => listing.threadType?.trim())
        .filter(Boolean)
    ),
  ].sort();

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-xl font-bold mb-6">
        Search & Filter
      </h2>

      <div className="grid md:grid-cols-4 gap-4">

        {/* Thread Type */}
        <select
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-lg px-4 py-3"
        >
          <option value="">All Thread Types</option>

          {threadTypes.map((thread) => (
            <option
              key={thread}
              value={thread.toLowerCase()}
            >
              {thread}
            </option>
          ))}
        </select>

        {/* Color */}
        <select
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="border rounded-lg px-4 py-3"
        >
          <option value="">All Colors</option>

          {colors.map((color) => (
            <option
              key={color}
              value={color.toLowerCase()}
            >
              {color}
            </option>
          ))}
        </select>

        {/* Listing Type */}
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="border rounded-lg px-4 py-3"
        >
          <option value="">All Listings</option>
          <option value="exchange">Exchange</option>
          <option value="sale">Sale</option>
        </select>

        {/* Status */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="border rounded-lg px-4 py-3"
        >
          <option value="">All Status</option>
          <option value="available">Available</option>
          <option value="sold">Sold</option>
          <option value="exchanged">Exchanged</option>
        </select>

      </div>
    </div>
  );
}