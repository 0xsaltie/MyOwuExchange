import { useState } from "react";
import { uploadMultipleImages } from "../services/cloudinary";

export default function MultiImageUpload({
  images,
  setImages,
}) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    if (files.length > 5) {
      alert("Maximum of 5 images allowed.");
      return;
    }

    try {
      setUploading(true);

      const uploaded = await uploadMultipleImages(files);

      setImages(uploaded);
    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">

      <label className="border-2 border-dashed rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer hover:bg-stone-50">

        <div className="text-5xl">
          📷
        </div>

        <p className="font-semibold mt-3">
          Upload up to 5 Images
        </p>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />

      </label>

      {uploading && (
        <p className="text-amber-700">
          Uploading...
        </p>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-3">

          {images.map((image, index) => (
            <div
              key={index}
              className="relative"
            >
              <img
                src={image}
                alt=""
                className="rounded-xl h-32 w-full object-cover"
              />

              {index === 0 && (
                <span className="absolute top-2 left-2 bg-amber-700 text-white text-xs px-2 py-1 rounded">
                  Cover
                </span>
              )}
            </div>
          ))}

        </div>
      )}

    </div>
  );
}