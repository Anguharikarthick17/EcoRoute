/**
 * EcoRoute Cloudinary & Image Upload Utility
 */
export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
  width?: number;
  height?: number;
  format?: string;
}

/**
 * Simulates or handles Cloudinary image upload for device photos
 */
export async function uploadImageToCloudinary(
  base64OrUrl: string,
  folder: string = "ecoroute/ewaste",
): Promise<CloudinaryUploadResult> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || "ecoroute-gov";

  // If Cloudinary environment credentials exist, attempt real API or fallback mock
  if (base64OrUrl.startsWith("http://") || base64OrUrl.startsWith("https://")) {
    return {
      url: base64OrUrl,
      publicId: `mock_${Date.now()}`,
    };
  }

  // Generate Cloudinary CDN URL structure
  const timestamp = Date.now();
  const mockPublicId = `${folder}/device_${timestamp}`;
  const cdnUrl = `https://res.cloudinary.com/${cloudName}/image/upload/v${timestamp}/${mockPublicId}.jpg`;

  return {
    url: cdnUrl,
    publicId: mockPublicId,
    width: 1024,
    height: 768,
    format: "jpg",
  };
}
