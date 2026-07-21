import { useState } from "react";
import { uploadImage } from "../services/cloudinary";

export default function ImageUpload({
  imageUrl,
  setImageUrl,
}) {
  const [uploading, setUploading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      setUploading(true);

      const url = await uploadImage(file);

      setImageUrl(url);
    } catch (error) {
      console.error(error);
      alert("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">

      {imageUrl ? (
        <div className="relative">
          <img
            src={imageUrl}
            alt="Preview"
            className="w-full h-64 object-cover rounded-xl border"
          />

          <button
            type="button"
            onClick={() => setImageUrl("")}
            className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-lg"
          >
            Remove
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-xl cursor-pointer hover:bg-stone-50">

          <span className="text-5xl">
            📷
          </span>

          <p className="mt-3 font-semibold">
            Click to Upload Image
          </p>

          <p className="text-sm text-gray-500">
            JPG, PNG or WEBP
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

        </label>
      )}

      {uploading && (
        <div className="text-amber-700 font-medium">
          Uploading image...
        </div>
      )}

    </div>
  );
}