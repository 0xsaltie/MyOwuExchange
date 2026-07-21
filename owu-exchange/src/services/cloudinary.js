export async function uploadImage(file) {
  const formData = new FormData();

  formData.append("file", file);

  formData.append(
    "upload_preset",
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  );

  const cloudName =
    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Image upload failed.");
  }

  const data = await response.json();

  return data.secure_url;
}

export async function uploadMultipleImages(files) {
  const uploadedImages = [];

  for (const file of files) {
    const imageUrl = await uploadImage(file);
    uploadedImages.push(imageUrl);
  }

  return uploadedImages;
}